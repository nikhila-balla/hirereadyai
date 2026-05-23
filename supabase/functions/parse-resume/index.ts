import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a precise resume skill extractor. Your job is to extract ONLY technical skills that are EXPLICITLY written in the resume provided.

STRICT RULES:
1. ONLY extract skills that appear as actual words/phrases in the resume
2. DO NOT infer, guess, or assume any skills that are not explicitly mentioned
3. DO NOT add common skills just because they seem likely
4. If the resume is garbled, empty, or unreadable, return an empty skills array
5. Match the exact skill names used in the resume (e.g., if resume says "ReactJS" use "ReactJS", if it says "React.js" use "React.js")
6. For proficiency levels, use these guidelines based on context in the resume:
   - 85-100: Listed as expert/advanced, 4+ years experience, led projects with this skill
   - 65-84: Listed as proficient/intermediate, 2-4 years, used in multiple projects
   - 45-64: Listed as familiar/basic, <2 years, used in 1-2 projects
   - 25-44: Only mentioned briefly, listed under "exposure to" or "familiar with"
7. Return maximum 20 skills, prioritized by how prominently they appear
8. Include: programming languages, frameworks, libraries, databases, cloud platforms, DevOps tools, methodologies
9. Exclude: soft skills (communication, teamwork), job titles, company names, degrees`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "extract_skills",
      description: "Extract technical skills with proficiency levels that are explicitly mentioned in the resume",
      parameters: {
        type: "object",
        properties: {
          skills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", description: "Exact skill name as written in the resume" },
                level: {
                  type: "integer",
                  description: "Proficiency level 25-100 based on context clues",
                  minimum: 25,
                  maximum: 100,
                },
              },
              required: ["name", "level"],
              additionalProperties: false,
            },
          },
        },
        required: ["skills"],
        additionalProperties: false,
      },
    },
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, pdfBase64 } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build messages array depending on input type
    const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];

    if (pdfBase64) {
      // Send PDF directly to Gemini as inline document data
      userContent.push({
        type: "image_url",
        image_url: {
          url: `data:application/pdf;base64,${pdfBase64}`,
        },
      });
      userContent.push({
        type: "text",
        text: "Extract ONLY the technical skills that are explicitly written in this resume document.",
      });
    } else if (resumeText && resumeText.trim().length >= 20) {
      userContent.push({
        type: "text",
        text: `Extract ONLY skills that are explicitly written in this resume:\n\n---\n${resumeText.slice(0, 10000)}\n---`,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Resume content is too short or missing." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending to AI gateway, input type:", pdfBase64 ? "PDF binary" : "text");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        tools: TOOLS,
        tool_choice: { type: "function", function: { name: "extract_skills" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI processing failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parsed = JSON.parse(toolCall.function.arguments) as { skills?: { name: string; level: number }[] };
    const skills = (parsed.skills || [])
      .filter((s) => s.name && typeof s.level === "number")
      .map((s) => ({
        name: s.name,
        level: Math.max(25, Math.min(100, s.level)),
      }))
      .sort((a, b) => b.level - a.level);

    console.log("Extracted skills:", JSON.stringify(skills));

    return new Response(JSON.stringify({ skills }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-resume error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
