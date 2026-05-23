import { motion } from "framer-motion";
import { Trophy, MessageSquare, Zap, BarChart3, ChevronDown, ChevronUp, Save, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { InterviewScores } from "@/hooks/useInterviewScoring";
import { useState } from "react";

interface Props {
  scores: InterviewScores;
  company: string;
  totalQuestions: number;
  answeredCount: number;
  onSave: () => void;
  saved: boolean;
  onRetry: () => void;
}

const getGrade = (score: number) => {
  if (score >= 85) return { grade: "A+", color: "#10b981" };
  if (score >= 75) return { grade: "A", color: "#10b981" };
  if (score >= 65) return { grade: "B+", color: "#00f5ff" };
  if (score >= 55) return { grade: "B", color: "#00f5ff" };
  if (score >= 45) return { grade: "C", color: "#f59e0b" };
  if (score >= 35) return { grade: "C-", color: "#f59e0b" };
  return { grade: "D", color: "#ef4444" };
};

const InterviewResults = ({ scores, company, totalQuestions, answeredCount, onSave, saved, onRetry }: Props) => {
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const { grade, color } = getGrade(scores.overall);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Results */}
      <div className="lg:col-span-2 space-y-6">
        {/* Overall Score */}
        <GlassCard glow="cyan" hover={false} delay={0.1}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Interview Complete!</h2>
              <p className="text-muted-foreground text-sm">{company} • {answeredCount}/{totalQuestions} questions answered</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: `conic-gradient(${color} ${scores.overall}%, transparent ${scores.overall}%)`, padding: "4px" }}
            >
              <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                <span className="text-2xl font-display font-bold" style={{ color }}>{grade}</span>
                <span className="text-xs text-muted-foreground">{scores.overall}%</span>
              </div>
            </motion.div>
          </div>

          {/* Score Bars */}
          <div className="space-y-4">
            {[
              { label: "Content & Relevance", score: scores.content, icon: MessageSquare, color: "#ff00ff" },
              { label: "Confidence", score: scores.confidence, icon: Zap, color: "#00f5ff" },
              { label: "Structure (STAR)", score: scores.structure, icon: BarChart3, color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-display font-bold" style={{ color: s.color }}>{s.score}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}60, ${s.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Per-Question Breakdown */}
        <GlassCard hover={false} delay={0.3}>
          <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-secondary" /> Question-by-Question
          </h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {scores.perQuestion.map((q, i) => {
              const isExpanded = expandedQ === i;
              const qGrade = getGrade(q.overallScore);
              return (
                <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setExpandedQ(isExpanded ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-bold shrink-0"
                        style={{ background: `${qGrade.color}20`, color: qGrade.color }}
                      >
                        {q.overallScore}
                      </span>
                      <span className="text-sm text-foreground truncate">Q{i + 1}: {q.question}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>
                  {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-4 pb-3 space-y-2 border-t border-border/30">
                      <div className="pt-3">
                        <p className="text-xs text-muted-foreground mb-1">Your Answer:</p>
                        <p className="text-sm text-foreground/80">{q.answer || <span className="italic text-muted-foreground">No answer provided</span>}</p>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span>Content: <strong style={{ color: "#ff00ff" }}>{q.contentScore}%</strong></span>
                        <span>Confidence: <strong style={{ color: "#00f5ff" }}>{q.confidenceScore}%</strong></span>
                        <span>Structure: <strong style={{ color: "#8b5cf6" }}>{q.structureScore}%</strong></span>
                      </div>
                      {q.feedback && (
                        <p className="text-xs text-secondary/80 bg-secondary/5 px-3 py-2 rounded-lg">{q.feedback}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Sidebar Actions */}
      <div className="space-y-4">
        <GlassCard glow="magenta" hover={false} delay={0.2}>
          <h3 className="font-heading text-lg font-bold neon-text-magenta mb-3">Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Company</span><span className="font-display text-foreground">{company}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Questions</span><span className="font-display text-foreground">{answeredCount}/{totalQuestions}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Grade</span><span className="font-display font-bold" style={{ color }}>{grade}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Overall</span><span className="font-display text-primary">{scores.overall}%</span></div>
          </div>
        </GlassCard>

        <button
          onClick={onSave}
          disabled={saved}
          className="w-full py-3 rounded-xl font-display font-bold text-sm text-primary-foreground hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ background: "var(--gradient-cyber)" }}
        >
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Results</>}
        </button>

        <button
          onClick={onRetry}
          className="w-full py-3 rounded-xl font-display font-bold text-sm border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
        >
          Retry Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewResults;
