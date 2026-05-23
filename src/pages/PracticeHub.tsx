import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, CheckCircle, XCircle, Zap, Brain, Code, Sparkles, MessageSquare, Database, Search, Filter, Trophy, ChevronDown, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import CodingPlayground from "@/components/coding/CodingPlayground";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { generateQuizQuestions, generateQuizQuestionsViaGemini, getTimerForDifficulty, topicOptions, type Question } from "@/data/questionBank";
import { useBattlePass } from "@/hooks/useBattlePass";
import { Progress } from "@/components/ui/progress";

const tabs = [
  { id: "aptitude", label: "Aptitude", icon: <Brain className="w-4 h-4" />, color: "hsl(var(--neon-cyan))", count: 22 },
  { id: "dsa", label: "DSA", icon: <Code className="w-4 h-4" />, color: "hsl(var(--neon-magenta))", count: 15 },
  { id: "mock", label: "Mock", icon: <MessageSquare className="w-4 h-4" />, color: "hsl(var(--neon-purple))", count: 10 },
  { id: "sql", label: "SQL", icon: <Database className="w-4 h-4" />, color: "hsl(var(--neon-green))", count: 9 },
  { id: "coding", label: "Coding", icon: <Terminal className="w-4 h-4" />, color: "hsl(var(--neon-orange))", count: 50 },
];

const difficultyFilters = ["All", "Easy", "Medium", "Hard"] as const;

const PracticeHub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { awardXP } = useBattlePass();

  // Selection state
  const [activeTab, setActiveTab] = useState("aptitude");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");

  // Quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState(45);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  const currentQuestion = questions[currentQ];
  const currentTimer = currentQuestion ? getTimerForDifficulty(currentQuestion.difficulty) : 45;

  // Load completed topics
  useEffect(() => {
    if (!user) return;
    supabase.from("practice_results").select("topic, category").eq("user_id", user.id).then(({ data }) => {
      if (data) {
        const topics = new Set(data.map((d) => `${d.category}:${d.topic}`));
        setCompletedTopics(topics);
      }
    });
  }, [user, finished]);

  useEffect(() => {
    if (!user) return;
    supabase.from("company_selection").select("company_name").eq("user_id", user.id).then(({ data }) => {
      if (data) setCompanies(data.map((d) => d.company_name));
    });
  }, [user]);

  // Filter topics based on search and difficulty
  const filteredTopics = useMemo(() => {
    const allTopics = topicOptions[activeTab] || ["All Topics"];
    return allTopics.filter(t => {
      if (t === "All Topics") return !searchQuery;
      if (searchQuery && !t.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeTab, searchQuery]);

  const finishQuiz = useCallback(async () => {
    setFinished(true);
    if (!user || questions.length === 0) return;

    const xpType = activeTab === "dsa" || activeTab === "sql" || activeTab === "coding"
      ? ("coding" as const)
      : activeTab === "mock"
      ? ("mock" as const)
      : ("aptitude" as const);
    const xp = await awardXP(xpType, score, questions.length);

    try {
      await supabase.from("practice_results").insert({
        user_id: user.id,
        category: activeTab,
        topic: selectedTopic !== "All Topics" ? selectedTopic : activeTab,
        score,
        total_questions: questions.length,
        time_taken_seconds: questions.reduce((acc, q) => acc + getTimerForDifficulty(q.difficulty), 0) - timer,
        xp_earned: xp,
      });
      toast.success(`+${xp} XP earned!`);
    } catch {
      toast.error("Failed to save results");
    }
  }, [user, score, questions, activeTab, timer, selectedTopic, awardXP]);

  useEffect(() => {
    if (!started || finished || !currentQuestion) return;
    if (timer <= 0) {
      if (currentQ < questions.length - 1) {
        setAnswers((p) => [...p, null]);
        const nextQ = currentQ + 1;
        setCurrentQ(nextQ);
        setTimer(getTimerForDifficulty(questions[nextQ].difficulty));
        setSelected(null);
      } else {
        finishQuiz();
      }
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, started, finished, currentQ, questions, finishQuiz, currentQuestion]);

  const handleAnswer = (idx: number) => {
    if (selected !== null || !currentQuestion) return;
    setSelected(idx);
    if (idx === currentQuestion.answer) setScore((s) => s + 1);
    setAnswers((p) => [...p, idx]);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        const nextQ = currentQ + 1;
        setCurrentQ(nextQ);
        setTimer(getTimerForDifficulty(questions[nextQ].difficulty));
        setSelected(null);
      } else {
        finishQuiz();
      }
    }, 1000);
  };

  const startPractice = async (topic: string) => {
    const company = companies.length > 0 ? companies[0] : undefined;
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    let qs: Question[] = [];
    setSelectedTopic(topic);
    
    if (geminiApiKey && topic !== "All Topics") {
      setGeneratingQuestions(true);
      try {
        qs = await generateQuizQuestionsViaGemini(activeTab, topic, geminiApiKey, 10);
      } catch (err) {
        console.warn("Failed to generate questions via Gemini, falling back to local bank:", err);
        qs = generateQuizQuestions(activeTab, 10, topic, company);
      } finally {
        setGeneratingQuestions(false);
      }
    } else {
      qs = generateQuizQuestions(activeTab, 10, topic, company);
    }
    
    if (qs.length === 0) {
      toast.error("Failed to generate questions.");
      return;
    }

    setQuestions(qs);
    setStarted(true);
    setCurrentQ(0);
    setScore(0);
    setTimer(getTimerForDifficulty(qs[0]?.difficulty || "easy"));
    setSelected(null);
    setFinished(false);
    setAnswers([]);
  };

  const resetQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setSelectedTopic("All Topics");
  };

  // ─── AI Generation Screen ───
  if (generatingQuestions) {
    return (
      <div className="min-h-screen cyber-grid flex items-center justify-center">
        <Navbar />
        <div className="max-w-md w-full px-4 text-center">
          <GlassCard glow="cyan" hover={false}>
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 animate-spin">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground">AI Command Center</h2>
              <p className="text-sm text-muted-foreground animate-pulse">Generating custom AI practice questions for "{selectedTopic}"...</p>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  // ─── Finished screen ───
  if (finished && questions.length > 0) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen cyber-grid">
        <Navbar />
        <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <div className="text-6xl mb-4">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "💪"}</div>
            <h1 className="text-3xl font-display font-bold gradient-text-cyber mb-2">
              {pct >= 80 ? "EXCELLENT!" : pct >= 60 ? "GOOD JOB!" : "KEEP GOING!"}
            </h1>
            <p className="text-4xl font-display font-black neon-text-cyan mb-6">{pct}%</p>
            <GlassCard glow="cyan" hover={false}>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-display font-bold text-neon-green">{score}</p>
                  <p className="text-xs text-muted-foreground">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-destructive">{questions.length - score}</p>
                  <p className="text-xs text-muted-foreground">Wrong</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-neon-orange">+{Math.round(pct * 2)}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            </GlassCard>
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={resetQuiz} className="px-6 py-3 rounded-xl glass-card neon-border-cyan font-display text-sm text-primary hover:scale-105 transition-transform">
                Back to Topics
              </button>
              <button onClick={() => navigate("/results")} className="px-6 py-3 rounded-xl font-display text-sm text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
                View Results
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Active quiz ───
  if (started && currentQuestion) {
    const timerPct = (timer / currentTimer) * 100;
    return (
      <div className="min-h-screen cyber-grid">
        <Navbar />
        <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground font-display">Q {currentQ + 1}/{questions.length}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-display">{selectedTopic}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-display ${
                currentQuestion.difficulty === "easy" ? "bg-neon-green/10 text-neon-green" :
                currentQuestion.difficulty === "medium" ? "bg-neon-orange/10 text-neon-orange" :
                "bg-destructive/10 text-destructive"
              }`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div />
            <div className="flex items-center gap-2">
              <Timer className={`w-4 h-4 ${timer <= 10 ? "text-destructive animate-pulse" : "text-primary"}`} />
              <span className={`font-display font-bold ${timer <= 10 ? "text-destructive" : "text-primary"}`}>{timer}s</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted/30 mb-8 overflow-hidden">
            <motion.div animate={{ width: `${timerPct}%` }} className="h-full rounded-full" style={{ background: timer <= 10 ? "hsl(0 85% 55%)" : "var(--gradient-cyber)" }} />
          </div>

          <GlassCard glow="cyan" hover={false} className="mb-6">
            <h2 className="text-lg font-heading font-bold text-foreground">{currentQuestion.q}</h2>
          </GlassCard>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              let borderClass = "border-border hover:border-primary/40";
              if (selected !== null) {
                if (idx === currentQuestion.answer) borderClass = "border-neon-green/60 bg-neon-green/10";
                else if (idx === selected) borderClass = "border-destructive/60 bg-destructive/10";
              }
              return (
                <motion.button key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => handleAnswer(idx)} disabled={selected !== null} className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 glass-card ${borderClass}`}>
                  <span className="w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center text-xs font-display font-bold text-muted-foreground">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-sm text-foreground">{opt}</span>
                  {selected !== null && idx === currentQuestion.answer && <CheckCircle className="w-5 h-5 text-neon-green ml-auto" />}
                  {selected !== null && idx === selected && idx !== currentQuestion.answer && <XCircle className="w-5 h-5 text-destructive ml-auto" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── Topic selection with tabs ───
  const totalTopics = Object.values(topicOptions).reduce((sum, t) => sum + t.filter(x => x !== "All Topics").length, 0);

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text-aurora mb-1">PRACTICE HUB</h1>
          <p className="text-muted-foreground text-sm">{totalTopics}+ topics across 5 categories • 10 questions per topic • Earn XP</p>
        </motion.div>

        {/* Company targeting */}
        {companies.length > 0 && (
          <GlassCard hover={false} delay={0.05} className="mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Targeting:</span>
              {companies.map((c) => (
                <span key={c} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-display">{c}</span>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery(""); setDifficultyFilter("All"); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {(topicOptions[tab.id] || []).filter(t => t !== "All Topics").length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Coding tab renders its own playground */}
        {activeTab === "coding" ? (
          <CodingPlayground />
        ) : (
          <>
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex gap-1.5">
                {difficultyFilters.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`px-3 py-2 rounded-lg text-xs font-display font-medium transition-all ${
                      difficultyFilter === d
                        ? d === "Easy" ? "bg-neon-green/15 text-neon-green border border-neon-green/30"
                        : d === "Medium" ? "bg-neon-orange/15 text-neon-orange border border-neon-orange/30"
                        : d === "Hard" ? "bg-destructive/15 text-destructive border border-destructive/30"
                        : "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              <AnimatePresence mode="popLayout">
                {filteredTopics.map((topic, i) => {
                  if (topic === "All Topics") return null;
                  const isCompleted = completedTopics.has(`${activeTab}:${topic}`);
                  return (
                    <motion.div
                      key={`${activeTab}-${topic}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <button
                        onClick={() => startPractice(topic)}
                        className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{topic}</h3>
                          {isCompleted && (
                            <div className="flex items-center gap-1">
                              <Trophy className="w-3.5 h-3.5 text-neon-green" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-muted-foreground">10 questions</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-display">
                            Start →
                          </span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredTopics.filter(t => t !== "All Topics").length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">No topics match your search.</p>
              </div>
            )}

            {/* Quick start - All Topics */}
            <GlassCard hover={false} delay={0.2} className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground mb-1">Quick Start — Random Mix</h3>
                  <p className="text-xs text-muted-foreground">10 questions from all {tabs.find(t => t.id === activeTab)?.label} topics</p>
                </div>
                <button
                  onClick={() => startPractice("All Topics")}
                  className="px-5 py-2.5 rounded-lg text-xs font-display font-bold text-primary-foreground hover:scale-105 transition-transform"
                  style={{ background: "var(--gradient-cyber)" }}
                >
                  Start
                </button>
              </div>
            </GlassCard>

            {/* How it works */}
            <GlassCard hover={false} delay={0.3}>
              <h3 className="font-heading text-sm font-bold neon-text-cyan mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> How It Works
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-neon-green font-bold">1.</span>
                  <span>Easy (45s) → Medium (90s) → Hard (120s)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-orange font-bold">2.</span>
                  <span>Company-specific difficulty adapts to targets</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neon-magenta font-bold">3.</span>
                  <span>Earn XP → Level up → Unlock Roadmap</span>
                </div>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
};

export default PracticeHub;
