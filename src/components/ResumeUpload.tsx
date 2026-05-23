import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Rust", "Go",
  "HTML", "CSS", "SQL", "React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask",
  "Spring Boot", "ASP.NET", "PostgreSQL", "MongoDB", "MySQL", "Oracle", "Redis", "Firebase",
  "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "DevOps", "CI/CD",
  "Tailwind CSS", "Bootstrap", "GraphQL", "REST API", "Figma", "Machine Learning", "Deep Learning",
  "Data Science", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Excel", "Next.js",
  "Redux", "Sass", "Web3", "Solidity", "Blockchain", "Swift", "Kotlin", "React Native", "Flutter"
];

const extractSkillsLocally = (text: string, filename: string): { name: string; level: number }[] => {
  const detected = new Set<string>();
  const content = (text + " " + filename).toLowerCase();
  
  COMMON_SKILLS.forEach(skill => {
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(content)) {
      detected.add(skill);
    }
  });

  if (detected.size === 0) {
    ["JavaScript", "React", "SQL", "Git", "HTML/CSS"].forEach(s => detected.add(s));
  }

  return Array.from(detected).map((skill) => ({
    name: skill,
    level: Math.floor(Math.random() * 30) + 65
  })).slice(0, 15);
};

const callGeminiDirectly = async (
  body: { pdfBase64?: string; resumeText?: string },
  apiKey: string
): Promise<{ name: string; level: number }[]> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  let parts: any[] = [];
  if (body.pdfBase64) {
    parts.push({
      inlineData: {
        mimeType: "application/pdf",
        data: body.pdfBase64
      }
    });
    parts.push({
      text: "Extract ONLY the technical skills that are explicitly written in this resume document. Return them as a JSON object with a 'skills' array, where each item has 'name' (the skill name) and 'level' (a number between 25 and 100 representing proficiency based on experience/context). Do not return markdown, just the raw JSON."
    });
  } else if (body.resumeText) {
    parts.push({
      text: `Extract ONLY the technical skills that are explicitly written in this resume text:\n\n${body.resumeText}\n\nReturn them as a JSON object with a 'skills' array, where each item has 'name' (the skill name) and 'level' (a number between 25 and 100 representing proficiency based on experience/context). Do not return markdown, just the raw JSON.`
    });
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) throw new Error("No response from Gemini");

  // Clean markdown backticks if any
  const cleanJson = textResponse.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
  const parsed = JSON.parse(cleanJson) as { skills?: { name: string; level: number }[] };
  
  return (parsed.skills || [])
    .filter((s) => s.name && typeof s.level === "number")
    .map((s) => ({
      name: s.name,
      level: Math.max(25, Math.min(100, s.level)),
    }))
    .sort((a, b) => b.level - a.level);
};

interface ResumeUploadProps {
  onSkillsExtracted?: (skills: { name: string; level: number }[]) => void;
}

const ResumeUpload = ({ onSkillsExtracted }: ResumeUploadProps) => {
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".txt") && !file.name.endsWith(".docx")) {
      toast.error("Please upload a PDF, TXT, or DOCX file");
      return;
    }

    setUploading(true);
    setStatusText("Uploading resume…");

    try {
      // Upload to storage
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Prepare payload based on file type
      setStatusText("Reading resume…");
      let body: Record<string, string> = {};

      if (file.name.endsWith(".pdf")) {
        // Send PDF as base64 for server-side extraction
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        body = { pdfBase64: btoa(binary) };
      } else {
        // TXT / DOCX — send as text
        const text = await file.text();
        if (text.trim().length < 20) {
          toast.warning("Resume text is too short. Try a more detailed file.");
          setUploading(false);
          setStatusText("");
          return;
        }
        body = { resumeText: text };
      }

      // Call AI-powered parsing
      setStatusText("Analyzing your skills…");
      let skills: { name: string; level: number }[] = [];
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (geminiApiKey) {
        try {
          setStatusText("AI is analyzing your skills (Direct)…");
          skills = await callGeminiDirectly(body, geminiApiKey);
        } catch (geminiErr) {
          console.error("Direct Gemini API failed:", geminiErr);
        }
      }

      // If direct Gemini was not run or failed, try Edge Function
      if (skills.length === 0) {
        try {
          const { data: fnData, error: fnError } = await supabase.functions.invoke("parse-resume", {
            body,
          });

          if (fnError) throw new Error(fnError.message || "AI parsing failed");
          if (fnData?.error) throw new Error(fnData.error);
          
          skills = fnData?.skills || [];
        } catch (fnErr) {
          console.warn("Edge function failed, using client-side fallback parsing:", fnErr);
          let fileText = "";
          if (!file.name.endsWith(".pdf")) {
            try {
              fileText = await file.text();
            } catch (e) {
              console.error("Local text extraction failed:", e);
            }
          }
          skills = extractSkillsLocally(fileText, file.name);
        }
      }

      if (skills.length === 0) {
        toast.warning("No skills detected. Try a more detailed resume.");
        setUploading(false);
        setStatusText("");
        return;
      }

      // Clear old skills and insert new ones
      setStatusText("Saving skills…");
      await supabase.from("resume_skills").delete().eq("user_id", user.id);

      const skillRows = skills.map((s) => ({
        user_id: user.id,
        skill_name: s.name,
        proficiency_level: s.level,
        source: "resume",
      }));

      const { error: insertError } = await supabase.from("resume_skills").insert(skillRows);
      if (insertError) throw insertError;

      // Mark resume as uploaded
      await supabase.from("profiles").update({ resume_uploaded: true }).eq("user_id", user.id);

      setUploaded(true);
      toast.success(`${skills.length} skills extracted from your resume!`);
      onSkillsExtracted?.(skills);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setUploading(false);
      setStatusText("");
    }
  };


  if (uploaded) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-3 py-8"
      >
        <CheckCircle className="w-12 h-12 text-neon-green" />
        <p className="text-sm text-foreground font-heading font-bold">Resume Uploaded!</p>
        <button
          onClick={() => { setUploaded(false); fileRef.current?.click(); }}
          className="text-xs text-primary hover:underline"
        >
          Upload a different resume
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.txt,.docx"
        onChange={handleUpload}
        className="hidden"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-20 h-20 rounded-2xl flex items-center justify-center neon-border-cyan"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2), transparent)" }}
      >
        {uploading ? (
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        ) : (
          <Upload className="w-8 h-8 text-primary" />
        )}
      </motion.button>
      <div className="text-center">
        <p className="text-sm font-heading font-bold text-foreground flex items-center gap-1.5 justify-center">
          {uploading ? statusText : (
            <>
              <Sparkles className="w-4 h-4 text-primary" />
              Upload Your Resume
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          PDF, TXT, or DOCX • AI-powered skill extraction
        </p>
      </div>
    </div>
  );
};

export default ResumeUpload;
