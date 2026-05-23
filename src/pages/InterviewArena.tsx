import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import InterviewReady from "@/components/interview/InterviewReady";
import InterviewHUD from "@/components/interview/InterviewHUD";
import InterviewResults from "@/components/interview/InterviewResults";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBattlePass } from "@/hooks/useBattlePass";
import { useInterviewAI } from "@/hooks/useInterviewAI";
import { useInterviewScoring, type InterviewScores } from "@/hooks/useInterviewScoring";
import { generateResumeQuestions, generateGeneralQuestions } from "@/data/interviewQuestions";
import { Building2, Code2 } from "lucide-react";

const InterviewArena = () => {
  const { user } = useAuth();
  const { awardXP } = useBattlePass();
  const { scoreInterview } = useInterviewScoring();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [liveScores, setLiveScores] = useState({ confidence: 0, content: 0, flow: 0 });
  const [finalScores, setFinalScores] = useState<InterviewScores | null>(null);
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [phase, setPhase] = useState<"choose" | "ready" | "interview" | "complete">("choose");
  const [interviewType, setInterviewType] = useState<"company" | "general">("company");
  const [selectedCompany, setSelectedCompany] = useState("TCS");
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);

  // Build questions based on chosen mode
  const questions = interviewType === "general"
    ? generateGeneralQuestions(resumeSkills)
    : generateResumeQuestions(resumeSkills, selectedCompany);

  // Fetch user's company + resume skills
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [companyRes, skillsRes] = await Promise.all([
        supabase.from("company_selection").select("company_name").eq("user_id", user.id).limit(1),
        supabase.from("resume_skills").select("skill_name").eq("user_id", user.id),
      ]);
      if (companyRes.data?.[0]) setSelectedCompany(companyRes.data[0].company_name);
      if (skillsRes.data) setResumeSkills(skillsRes.data.map((s) => s.skill_name));
    };
    fetchData();
  }, [user]);

  const handleInterviewComplete = useCallback(
    (answers: string[]) => {
      const scored = scoreInterview(questions, answers, resumeSkills);
      setFinalScores(scored);
      setLiveScores({
        confidence: scored.confidence,
        content: scored.content,
        flow: scored.structure,
      });
      setPhase("complete");
    },
    [questions, resumeSkills, scoreInterview]
  );

  const {
    currentQuestion, isSpeaking, isListening, transcript, answers,
    startInterview, submitAnswer, completeNow, startListening, stopListening, setTranscript,
  } = useInterviewAI({ questions, onInterviewComplete: handleInterviewComplete });

  // Camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setCameraOn(true);
      setCameraError(null);
    } catch (err) {
      const msgs: Record<string, string> = {
        NotAllowedError: "Camera access denied. Enable in browser settings.",
        NotFoundError: "No camera found.",
        NotReadableError: "Camera in use by another app.",
      };
      const name = err instanceof Error ? err.name : "";
      setCameraError(msgs[name] || "Could not access camera.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }, []);

  const toggleMic = useCallback(() => {
    if (isListening) { stopListening(); setMicOn(false); }
    else { startListening(); setMicOn(true); }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    return () => { stopCamera(); stopListening(); speechSynthesis.cancel(); };
  }, [stopCamera, stopListening]);

  const handleStart = () => {
    setPhase("interview");
    setSaved(false);
    setFinalScores(null);
    setLiveScores({ confidence: 0, content: 0, flow: 0 });
    startInterview();
  };

  const handleSend = () => {
    const text = input || transcript;
    if (!text.trim()) return;
    const words = text.trim().split(/\s+/).length;
    setLiveScores((prev) => ({
      confidence: Math.min(100, prev.confidence + Math.min(15, Math.max(5, words))),
      content: Math.min(100, prev.content + Math.floor(Math.random() * 10) + 5),
      flow: Math.min(100, prev.flow + Math.floor(Math.random() * 12) + 6),
    }));
    submitAnswer(text);
    setInput("");
  };

  const saveResults = async () => {
    if (!user || !finalScores) return;
    const xp = await awardXP("mock", finalScores.overall, 100);
    const { error } = await supabase.from("mock_results").insert({
      user_id: user.id,
      confidence: finalScores.confidence,
      posture: finalScores.content,
      flow: finalScores.structure,
      overall: finalScores.overall,
      questions_answered: answers.length,
      duration_seconds: 300,
    });
    if (error) toast.error("Failed to save results");
    else { toast.success(`Interview saved! +${xp} XP earned!`); setSaved(true); }
  };

  const companyOptions = ["TCS", "Google", "Amazon", "Infosys", "Microsoft", "Wipro", "Flipkart"];

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text-aurora mb-2">AI INTERVIEW ARENA</h1>
            <p className="text-muted-foreground">
              {resumeSkills.length > 0
                ? `Resume-based • ${resumeSkills.slice(0, 4).join(", ")}${resumeSkills.length > 4 ? "..." : ""} • ${questions.length} questions`
                : "Upload your resume for personalized questions"}
            </p>
          </div>
        </motion.div>

        {phase === "choose" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Choose your interview type</h2>
              <p className="text-sm text-muted-foreground">Both interviews use your resume — pick the focus you want today.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => { setInterviewType("company"); setPhase("ready"); }}
                className="p-6 rounded-2xl glass-card neon-border-cyan text-left hover:scale-[1.02] transition-transform group"
              >
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">Target Company Mock</h3>
                <p className="text-xs text-muted-foreground mb-4">Company-specific style + your resume skills + behavioral. Best when you have a target in mind.</p>
                <span className="text-xs font-display text-primary">Continue →</span>
              </button>
              <button
                onClick={() => { setInterviewType("general"); setPhase("ready"); }}
                className="p-6 rounded-2xl glass-card text-left hover:scale-[1.02] hover:neon-border-cyan transition-all group"
              >
                <Code2 className="w-8 h-8 text-neon-magenta mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">General Tech Interview</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {resumeSkills.length > 0
                    ? `Pure resume-driven (${resumeSkills.slice(0, 3).join(", ")}${resumeSkills.length > 3 ? "..." : ""}). No company bias.`
                    : "Upload a resume first for fully personalized questions."}
                </p>
                <span className="text-xs font-display text-neon-magenta">Continue →</span>
              </button>
            </div>
          </motion.div>
        )}

        {phase === "ready" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setPhase("choose")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Change interview type</button>
              <span className="text-xs px-3 py-1 rounded-full glass-card text-primary font-display">
                {interviewType === "general" ? "General Tech" : "Company Mock"}
              </span>
            </div>
            {interviewType === "company" && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {companyOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCompany(c)}
                    className={`px-4 py-2 rounded-full text-xs font-display transition-all ${selectedCompany === c ? "neon-border-cyan text-foreground bg-primary/20" : "glass-card text-muted-foreground hover:text-foreground"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <InterviewReady
              company={interviewType === "general" ? "General Tech" : selectedCompany}
              cameraOn={cameraOn}
              micOn={micOn}
              cameraError={cameraError}
              videoRef={videoRef}
              onToggleCamera={cameraOn ? stopCamera : startCamera}
              onToggleMic={toggleMic}
              onStart={handleStart}
            />
          </>
        )}

        {phase === "interview" && (
          <InterviewHUD
            company={interviewType === "general" ? "General Tech" : selectedCompany}
            cameraOn={cameraOn}
            videoRef={videoRef}
            isSpeaking={isSpeaking}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion]}
            transcript={transcript}
            isListening={isListening}
            scores={liveScores}
            input={input}
            answersCount={answers.length}
            onInputChange={setInput}
            onSend={handleSend}
            onToggleMic={toggleMic}
            onStartCamera={startCamera}
            onComplete={() => completeNow()}
          />
        )}

        {phase === "complete" && finalScores && (
          <InterviewResults
            scores={finalScores}
            company={interviewType === "general" ? "General Tech" : selectedCompany}
            totalQuestions={questions.length}
            answeredCount={answers.length}
            onSave={saveResults}
            saved={saved}
            onRetry={handleStart}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewArena;
