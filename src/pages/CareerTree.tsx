import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Lock, Download, Trophy, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const REQUIRED_COMPLETIONS = 1;

type Track = "web" | "data" | "mobile" | "backend" | "general";

const TRACKS: { id: Track; label: string; emoji: string; keywords: string[] }[] = [
  { id: "web", label: "Web Development", emoji: "🌐", keywords: ["react", "javascript", "typescript", "html", "css", "next", "vue", "angular", "tailwind", "redux"] },
  { id: "data", label: "Data Science / ML", emoji: "🧠", keywords: ["python", "machine learning", "tensorflow", "pytorch", "pandas", "numpy", "data", "ml", "ai"] },
  { id: "mobile", label: "Mobile Dev", emoji: "📱", keywords: ["android", "ios", "kotlin", "swift", "flutter", "react native"] },
  { id: "backend", label: "Backend / Cloud", emoji: "⚙️", keywords: ["node", "express", "java", "spring", "go", "rust", "aws", "docker", "kubernetes", "mongodb", "postgres", "sql"] },
  { id: "general", label: "General SDE", emoji: "💼", keywords: [] },
];

const ROADMAPS: Record<Track, { task: string; xp: number }[]> = {
  web: [
    { task: "Resume Analysis & Web Skill Mapping", xp: 100 },
    { task: "JavaScript Fundamentals & ES6+ Deep Dive", xp: 150 },
    { task: "React Hooks & Component Patterns", xp: 175 },
    { task: "DSA — Arrays & Strings (JS)", xp: 150 },
    { task: "CSS Layouts: Flexbox + Grid Mastery", xp: 125 },
    { task: "Mock HR Interview #1", xp: 175 },
    { task: "REST API Design & Fetch Patterns", xp: 175 },
    { task: "State Management — Redux / Zustand", xp: 200 },
    { task: "DSA — Hashing & Two Pointers", xp: 175 },
    { task: "Mock Frontend Technical Interview", xp: 300 },
    { task: "Web Performance — Lighthouse, Lazy Load", xp: 175 },
    { task: "Auth: JWT, Sessions, OAuth Flows", xp: 200 },
    { task: "DSA — Trees & Recursion", xp: 200 },
    { task: "Build a Portfolio Project Walkthrough", xp: 250 },
    { task: "Mock System Design — URL Shortener (Frontend lens)", xp: 300 },
    { task: "TypeScript Generics & Advanced Types", xp: 200 },
    { task: "Testing: Jest + React Testing Library", xp: 175 },
    { task: "Mock Behavioral Round", xp: 200 },
    { task: "Database Basics for Frontend Devs", xp: 175 },
    { task: "DSA — Dynamic Programming Intro", xp: 250 },
    { task: "Mock Full Frontend Interview", xp: 350 },
    { task: "Accessibility (a11y) & Semantic HTML", xp: 150 },
    { task: "GraphQL vs REST — When & Why", xp: 175 },
    { task: "Mock Coding Round (Live)", xp: 300 },
    { task: "Resume & GitHub Polish", xp: 150 },
    { task: "Company-Specific Frontend Prep", xp: 200 },
    { task: "Mock Technical Interview #2", xp: 350 },
    { task: "Negotiation & Offer Strategy", xp: 150 },
    { task: "Final Mock Marathon — Frontend", xp: 400 },
    { task: "Comprehensive Review & Cheatsheet", xp: 500 },
  ],
  data: [
    { task: "Resume Analysis & Data Skill Mapping", xp: 100 },
    { task: "Python Refresher — Pandas & NumPy", xp: 150 },
    { task: "Statistics Fundamentals for ML", xp: 175 },
    { task: "Data Cleaning & EDA Workflow", xp: 175 },
    { task: "DSA — Arrays & Hashing (Python)", xp: 150 },
    { task: "Mock HR Interview #1", xp: 175 },
    { task: "Supervised Learning — Regression & Classification", xp: 225 },
    { task: "SQL for Analysts: Joins, Window Funcs", xp: 200 },
    { task: "DSA — Recursion & Sorting", xp: 175 },
    { task: "Mock ML Concepts Interview", xp: 300 },
    { task: "Unsupervised Learning & Clustering", xp: 200 },
    { task: "Feature Engineering Patterns", xp: 200 },
    { task: "Deep Learning Basics (NN, Backprop)", xp: 250 },
    { task: "Build & Present an ML Project", xp: 250 },
    { task: "Mock Case Study — Business Problem", xp: 300 },
    { task: "Model Evaluation & Bias-Variance", xp: 200 },
    { task: "MLOps Basics — Deployment & Monitoring", xp: 225 },
    { task: "Mock Behavioral Round", xp: 175 },
    { task: "A/B Testing & Experiment Design", xp: 200 },
    { task: "DSA — Trees & DP", xp: 250 },
    { task: "Mock Full Data Interview", xp: 350 },
    { task: "NLP / CV Track (pick one)", xp: 225 },
    { task: "Big Data — Spark Basics", xp: 200 },
    { task: "Mock SQL + Coding Round", xp: 300 },
    { task: "Resume & Kaggle/Portfolio Polish", xp: 150 },
    { task: "Company-Specific Data Prep", xp: 200 },
    { task: "Mock Technical Interview #2", xp: 350 },
    { task: "Negotiation & Offer Strategy", xp: 150 },
    { task: "Final Mock Marathon — Data", xp: 400 },
    { task: "Comprehensive Review & Cheatsheet", xp: 500 },
  ],
  mobile: [
    { task: "Resume Analysis & Mobile Skill Mapping", xp: 100 },
    { task: "Platform Fundamentals (Lifecycle, UI)", xp: 150 },
    { task: "State Management on Mobile", xp: 175 },
    { task: "DSA — Arrays & Strings", xp: 150 },
    { task: "Networking & Offline-First Patterns", xp: 200 },
    { task: "Mock HR Interview #1", xp: 175 },
    { task: "UI/UX & Animations Deep Dive", xp: 175 },
    { task: "Local Storage & Persistence", xp: 175 },
    { task: "DSA — Hashing & Recursion", xp: 175 },
    { task: "Mock Mobile Technical Interview", xp: 300 },
    { task: "Push Notifications & Background Tasks", xp: 200 },
    { task: "Auth & Secure Storage", xp: 200 },
    { task: "DSA — Trees & Graphs", xp: 200 },
    { task: "App Performance & Profiling", xp: 200 },
    { task: "Mock System Design — Chat App", xp: 300 },
    { task: "Native Modules / Platform Channels", xp: 225 },
    { task: "Testing on Mobile", xp: 175 },
    { task: "Mock Behavioral Round", xp: 175 },
    { task: "App Store Release & CI/CD", xp: 200 },
    { task: "DSA — Dynamic Programming Intro", xp: 250 },
    { task: "Mock Full Mobile Interview", xp: 350 },
    { task: "Accessibility on Mobile", xp: 150 },
    { task: "Cross-Platform Tradeoffs", xp: 175 },
    { task: "Mock Coding Round", xp: 300 },
    { task: "Portfolio: Publish a Demo App", xp: 250 },
    { task: "Company-Specific Mobile Prep", xp: 200 },
    { task: "Mock Technical Interview #2", xp: 350 },
    { task: "Negotiation & Offer Strategy", xp: 150 },
    { task: "Final Mock Marathon — Mobile", xp: 400 },
    { task: "Comprehensive Review & Cheatsheet", xp: 500 },
  ],
  backend: [
    { task: "Resume Analysis & Backend Skill Mapping", xp: 100 },
    { task: "OOP & Language Deep Dive", xp: 150 },
    { task: "DSA — Arrays, Strings, Hashing", xp: 175 },
    { task: "REST API Design Best Practices", xp: 200 },
    { task: "Databases — SQL Joins & Indexes", xp: 200 },
    { task: "Mock HR Interview #1", xp: 175 },
    { task: "DSA — Linked Lists & Stacks", xp: 175 },
    { task: "Caching Strategies (Redis)", xp: 200 },
    { task: "Auth: JWT, OAuth, Sessions", xp: 200 },
    { task: "Mock Backend Technical Interview", xp: 300 },
    { task: "Message Queues & Async Workers", xp: 225 },
    { task: "DSA — Trees & Graphs", xp: 225 },
    { task: "Microservices vs Monolith Tradeoffs", xp: 225 },
    { task: "Build & Document an API Project", xp: 250 },
    { task: "Mock System Design — URL Shortener", xp: 300 },
    { task: "Database Sharding & Replication", xp: 250 },
    { task: "Docker + Kubernetes Basics", xp: 225 },
    { task: "Mock Behavioral Round", xp: 175 },
    { task: "Observability — Logs, Metrics, Traces", xp: 200 },
    { task: "DSA — Dynamic Programming", xp: 250 },
    { task: "Mock Full Backend Interview", xp: 350 },
    { task: "Security: OWASP Top 10", xp: 200 },
    { task: "Cloud Fundamentals (AWS/GCP)", xp: 225 },
    { task: "Mock Coding Round", xp: 300 },
    { task: "Resume & GitHub Polish", xp: 150 },
    { task: "Company-Specific Backend Prep", xp: 200 },
    { task: "Mock Technical Interview #2", xp: 350 },
    { task: "Negotiation & Offer Strategy", xp: 150 },
    { task: "Final Mock Marathon — Backend", xp: 400 },
    { task: "Comprehensive Review & Cheatsheet", xp: 500 },
  ],
  general: [
    { task: "Resume Analysis & Skill Mapping", xp: 100 },
    { task: "DSA Fundamentals — Arrays & Strings", xp: 150 },
    { task: "DSA — Linked Lists & Stacks", xp: 150 },
    { task: "System Design Basics — Load Balancers", xp: 200 },
    { task: "Mock HR Interview #1", xp: 175 },
    { task: "DSA — Trees & Graphs", xp: 200 },
    { task: "Company Research Deep Dive", xp: 100 },
    { task: "DSA — Dynamic Programming Intro", xp: 250 },
    { task: "System Design — Database Sharding", xp: 200 },
    { task: "Mock Technical Interview #1", xp: 300 },
    { task: "DSA — Advanced DP Patterns", xp: 250 },
    { task: "Behavioral Interview Prep", xp: 175 },
    { task: "System Design — Microservices", xp: 200 },
    { task: "DSA — Greedy Algorithms", xp: 150 },
    { task: "Mock Full Interview — Company Style", xp: 350 },
    { task: "SQL & Database Optimization", xp: 200 },
    { task: "OOP Design Patterns", xp: 200 },
    { task: "Mock Technical Interview #2", xp: 300 },
    { task: "System Design — Distributed Systems", xp: 250 },
    { task: "Behavioral STAR Method Practice", xp: 175 },
    { task: "Mock HR Interview #2", xp: 200 },
    { task: "DSA — Graph Algorithms Advanced", xp: 250 },
    { task: "API Design & REST Best Practices", xp: 175 },
    { task: "Mock Coding Round", xp: 300 },
    { task: "Resume & Portfolio Refinement", xp: 150 },
    { task: "Company-Specific Prep", xp: 200 },
    { task: "Mock Technical Interview #3", xp: 350 },
    { task: "Negotiation & Soft Skills", xp: 150 },
    { task: "Full Mock Interview Marathon", xp: 400 },
    { task: "Final Comprehensive Review", xp: 500 },
  ],
};

function detectTrack(skills: string[]): Track {
  if (skills.length === 0) return "general";
  const lower = skills.map((s) => s.toLowerCase());
  const scores: Record<Track, number> = { web: 0, data: 0, mobile: 0, backend: 0, general: 0 };
  for (const t of TRACKS) {
    for (const kw of t.keywords) {
      if (lower.some((s) => s.includes(kw))) scores[t.id] += 1;
    }
  }
  let best: Track = "general";
  let max = 0;
  (Object.keys(scores) as Track[]).forEach((k) => {
    if (scores[k] > max) { max = scores[k]; best = k; }
  });
  return max === 0 ? "general" : best;
}

const TRACK_KEY = "career_track_pref";

const CareerTree = () => {
  const { user } = useAuth();
  const [completions, setCompletions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [track, setTrack] = useState<Track>("general");

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [pr, mr, sk] = await Promise.all([
        supabase.from("practice_results").select("id", { count: "exact" }).eq("user_id", user.id),
        supabase.from("mock_results").select("id", { count: "exact" }).eq("user_id", user.id),
        supabase.from("resume_skills").select("skill_name").eq("user_id", user.id),
      ]);
      setCompletions((pr.count || 0) + (mr.count || 0));
      const skillNames = (sk.data || []).map((s) => s.skill_name);
      setSkills(skillNames);
      const saved = (typeof window !== "undefined" ? localStorage.getItem(TRACK_KEY) : null) as Track | null;
      setTrack(saved || detectTrack(skillNames));
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  const unlocked = completions >= REQUIRED_COMPLETIONS;
  const roadmapDays = useMemo(
    () => ROADMAPS[track].map((r, i) => ({ day: i + 1, ...r })),
    [track]
  );

  const chooseTrack = (t: Track) => {
    setTrack(t);
    try { localStorage.setItem(TRACK_KEY, t); } catch {
      // Ignore storage errors in private browsing
    }
  };

  const generatePDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`HireReady AI - 30-Day ${TRACKS.find((x) => x.id === track)?.label} Roadmap`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated for: ${user?.email}`, 20, 35);
    doc.setFontSize(10);
    let y = 50;
    roadmapDays.forEach((d) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`Day ${d.day}: ${d.task} (+${d.xp} XP)`, 20, y);
      y += 8;
    });
    doc.save("HireReady_30Day_Roadmap.pdf");
  };

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text-cyber mb-2">CAREER TREE</h1>
            <p className="text-muted-foreground">Personalised 30-day roadmap based on your resume & target track</p>
          </div>
          {unlocked && (
            <button onClick={generatePDF} className="px-4 py-2 rounded-xl glass-card neon-border-cyan flex items-center gap-2 text-sm font-display text-primary hover:scale-105 transition-transform">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          )}
        </motion.div>

        {!loading && (
          <GlassCard hover={false} delay={0.05} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                {skills.length > 0
                  ? `Detected from your resume (${skills.slice(0, 4).join(", ")}${skills.length > 4 ? "..." : ""}). Pick a track to personalise:`
                  : "Pick what you're preparing for — your roadmap will adapt:"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => chooseTrack(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display transition-all ${track === t.id ? "neon-border-cyan text-foreground bg-primary/20" : "glass-card text-muted-foreground hover:text-foreground"}`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </GlassCard>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !unlocked ? (
          <div className="max-w-lg mx-auto">
            <GlassCard glow="magenta" hover={false} delay={0.1} className="text-center">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Roadmap Locked</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Complete {REQUIRED_COMPLETIONS} practice session or mock interview to unlock your personalised 30-day career roadmap.
              </p>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-display font-bold text-primary">{completions}/{REQUIRED_COMPLETIONS}</span>
                </div>
                <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (completions / REQUIRED_COMPLETIONS) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-cyber)" }}
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Link to="/practice" className="px-6 py-3 rounded-xl font-display text-sm text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
                  <Target className="w-4 h-4 inline mr-2" />Practice Now
                </Link>
                <Link to="/interview" className="px-6 py-3 rounded-xl glass-card neon-border-cyan font-display text-sm text-primary hover:scale-105 transition-transform">
                  <Trophy className="w-4 h-4 inline mr-2" />Mock Interview
                </Link>
              </div>
            </GlassCard>
          </div>
        ) : (
          <GlassCard hover={false} delay={0.1}>
            <h3 className="font-heading text-xl font-bold neon-text-cyan mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5" /> 30-Day {TRACKS.find((x) => x.id === track)?.label} Path
            </h3>
            <div className="space-y-1">
              {roadmapDays.map((d, i) => (
                <motion.div key={d.day} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.02 }} className="flex items-center gap-3">
                  <div className="flex flex-col items-center w-8">
                    <div className="w-4 h-4 rounded-full border-2 border-border bg-muted/10 flex items-center justify-center" />
                    {i < roadmapDays.length - 1 && <div className="w-0.5 h-6 bg-border" />}
                  </div>
                  <div className="flex-1 flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-muted/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-display text-muted-foreground w-10">D{d.day}</span>
                      <span className="text-sm text-foreground">{d.task}</span>
                    </div>
                    <span className="text-xs font-display text-neon-orange">+{d.xp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default CareerTree;
