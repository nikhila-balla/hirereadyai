import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, FileText, Download, TrendingUp, Target, Flame, Lock, BarChart3, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import HolographicStat from "@/components/HolographicStat";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useBattlePass } from "@/hooks/useBattlePass";

interface PracticeResult {
  id: string;
  category: string;
  topic: string | null;
  score: number;
  total_questions: number;
  xp_earned: number | null;
  created_at: string;
}

interface MockResult {
  id: string;
  confidence: number | null;
  posture: number | null;
  flow: number | null;
  overall: number | null;
  created_at: string;
}

const Results = () => {
  const { user } = useAuth();
  const { levelInfo } = useBattlePass();
  const [practiceResults, setPracticeResults] = useState<PracticeResult[]>([]);
  const [mockResults, setMockResults] = useState<MockResult[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchResults = async () => {
      const [pr, mr] = await Promise.all([
        supabase.from("practice_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
        supabase.from("mock_results").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      ]);
      if (pr.data) setPracticeResults(pr.data);
      if (mr.data) setMockResults(mr.data);
    };
    fetchResults();
  }, [user]);

  const avgPractice = practiceResults.length > 0
    ? Math.round(practiceResults.reduce((a, r) => a + (r.score / r.total_questions) * 100, 0) / practiceResults.length)
    : 0;
  const avgMock = mockResults.length > 0
    ? Math.round(mockResults.reduce((a, r) => a + (r.overall || 0), 0) / mockResults.length)
    : 0;
  const totalXP = practiceResults.reduce((a, r) => a + (r.xp_earned || 0), 0);
  const totalTests = practiceResults.length + mockResults.length;
  const hasData = totalTests > 0;
  const readiness = totalTests > 0 ? Math.min(100, Math.round((totalXP / (totalTests * 200)) * 100)) : 0;

  const generateRoadmapPDF = async () => {
    if (totalTests < 1) return;
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("HireReady AI - 30-Day Roadmap", 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated for: ${user?.email}`, 20, 35);
    doc.text(`Current Practice Score: ${avgPractice}%`, 20, 45);
    doc.text(`Current Mock Score: ${avgMock}%`, 20, 55);
    doc.setFontSize(10);

    const roadmap = [
      "Day 1-3: Arrays & Strings fundamentals",
      "Day 4-6: Linked Lists & Stacks",
      "Day 7-9: Trees & Binary Search Trees",
      "Day 10-12: Graphs & BFS/DFS",
      "Day 13-15: Dynamic Programming basics",
      "Day 16-18: System Design fundamentals",
      "Day 19-20: Mock HR Interview practice",
      "Day 21-23: Advanced DP patterns",
      "Day 24-25: Database & SQL optimization",
      "Day 26-27: Mock technical interviews",
      "Day 28-29: Company-specific prep",
      "Day 30: Final comprehensive mock interview",
    ];

    let y = 70;
    roadmap.forEach((item) => {
      doc.text(`• ${item}`, 20, y);
      y += 10;
    });

    doc.save("HireReady_Roadmap.pdf");
  };

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text-cyber mb-2">RESULTS</h1>
            <p className="text-muted-foreground">{hasData ? "Your performance at a glance" : "Complete activities to see your progress"}</p>
          </div>
          {totalTests >= 1 ? (
            <button onClick={generateRoadmapPDF} className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-display text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
              <Download className="w-4 h-4" /> Roadmap PDF
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>{totalTests}/1 to unlock PDF</span>
            </div>
          )}
        </motion.div>

        {/* Stats moved here from Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <HolographicStat icon={<Target className="w-5 h-5 text-neon-cyan" />} label="Readiness" value={hasData ? `${readiness}%` : "—"} color="#00f5ff" delay={0.1} />
          <HolographicStat icon={<Trophy className="w-5 h-5 text-neon-magenta" />} label="Practice Avg" value={hasData ? `${avgPractice}%` : "—"} color="#ff00ff" delay={0.15} />
          <HolographicStat icon={<Award className="w-5 h-5 text-neon-purple" />} label="Mock Avg" value={hasData ? `${avgMock}%` : "—"} color="#8b5cf6" delay={0.2} />
          <HolographicStat icon={<Flame className="w-5 h-5 text-neon-orange" />} label="Total XP" value={totalXP > 0 ? totalXP.toLocaleString() : "0"} color="#f59e0b" delay={0.25} />
          <HolographicStat icon={<TrendingUp className="w-5 h-5 text-neon-green" />} label={`Lvl ${levelInfo.level}`} value={levelInfo.title} color="#10b981" delay={0.3} />
        </div>

        {!hasData ? (
          <GlassCard hover={false} delay={0.2} className="text-center py-12">
            <p className="text-lg font-heading font-bold text-foreground mb-2">No activities yet</p>
            <p className="text-sm text-muted-foreground mb-6">Start practicing or take a mock interview to see your results here.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/practice" className="px-6 py-3 rounded-xl font-display text-sm text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
                Start Practicing
              </Link>
              <Link to="/interview" className="px-6 py-3 rounded-xl glass-card neon-border-cyan font-display text-sm text-primary hover:scale-105 transition-transform">
                Mock Interview
              </Link>
            </div>
          </GlassCard>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCard glow="cyan" hover={false} delay={0.2}>
              <h3 className="font-heading text-xl font-bold neon-text-cyan mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Practice History
              </h3>
              {practiceResults.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No practice sessions yet.</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {practiceResults.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/5 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground capitalize">{r.category}{r.topic ? ` - ${r.topic}` : ""}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-display font-bold text-primary">{Math.round((r.score / r.total_questions) * 100)}%</p>
                        <p className="text-xs text-neon-orange">+{r.xp_earned} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard glow="magenta" hover={false} delay={0.3}>
              <h3 className="font-heading text-xl font-bold neon-text-magenta mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> Mock Interview History
              </h3>
              {mockResults.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No mock interviews yet.</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {mockResults.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/5 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">Mock Interview</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-display font-bold text-secondary">{r.overall}%</p>
                        <div className="flex gap-2 text-[10px] text-muted-foreground">
                          <span>C:{r.confidence}</span>
                          <span>P:{r.posture}</span>
                          <span>F:{r.flow}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
