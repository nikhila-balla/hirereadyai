import { motion } from "framer-motion";
import { Flame, Star, Swords, Brain, MessageCircle, Lock, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { useBattlePass, getLevelFromXP } from "@/hooks/useBattlePass";

const levelMeta = Array.from({ length: 10 }, (_, i) => ({
  level: i + 1,
  title: ["Rookie", "Coder", "Solver", "Builder", "Analyst", "Architect", "Strategist", "Expert", "Master", "Legend"][i],
  xp: [0, 500, 1200, 2000, 3000, 4500, 6500, 9000, 12000, 16000][i],
}));

const BattlePass = () => {
  const { levelInfo, battlePass } = useBattlePass();
  const streak = battlePass?.streak_days || 0;
  const hasData = (battlePass?.total_xp || 0) > 0;

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text-aurora mb-2">BATTLE PASS</h1>
          <p className="text-muted-foreground">Level up through practice. Earn XP from every session.</p>
        </motion.div>

        {/* XP Progress */}
        <GlassCard glow="cyan" hover={false} delay={0.1} className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-cyber)" }}>
              <Crown className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">Level {levelInfo.level} — {levelInfo.title}</p>
              <p className="text-sm text-muted-foreground">
                {hasData ? `${levelInfo.currentXP} / ${levelInfo.nextLevelXP} XP to next level` : "Complete practices to earn XP"}
              </p>
            </div>
            {streak > 0 && (
              <div className="ml-auto flex items-center gap-1 text-neon-orange">
                <Flame className="w-5 h-5" />
                <span className="font-display font-bold">{streak}-day streak</span>
              </div>
            )}
          </div>
          <div className="h-4 rounded-full bg-muted/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full relative"
              style={{ background: "var(--gradient-cyber)" }}
            >
              <div className="absolute inset-0 animate-pulse-glow" style={{ background: "linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.4), transparent)" }} />
            </motion.div>
          </div>
        </GlassCard>

        {/* Level Track */}
        <GlassCard hover={false} delay={0.2} className="mb-8 overflow-x-auto">
          <h3 className="font-heading text-lg font-bold neon-text-cyan mb-4">Level Track</h3>
          <div className="flex gap-2 min-w-max pb-2">
            {levelMeta.map((l, i) => {
              const unlocked = levelInfo.level >= l.level;
              const current = levelInfo.level === l.level;
              return (
                <motion.div
                  key={l.level}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`relative flex flex-col items-center w-20 p-3 rounded-xl border transition-all ${
                    current ? "neon-border-cyan bg-primary/5"
                    : unlocked ? "border-primary/20 bg-primary/5"
                    : "border-border bg-muted/10 opacity-50"
                  }`}
                >
                  <span className="font-display text-lg font-bold" style={{ color: unlocked ? "#00f5ff" : undefined }}>
                    {l.level}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">{l.title}</span>
                  {current && <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary glow-pulse" />}
                  {!unlocked && <Lock className="w-3 h-3 text-muted-foreground mt-1" />}
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {!hasData ? (
          <GlassCard hover={false} delay={0.3} className="text-center py-12">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">No XP Earned Yet</h2>
            <p className="text-sm text-muted-foreground mb-6">Complete practices and mock interviews to earn XP and level up.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/practice" className="px-6 py-3 rounded-xl font-display text-sm text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
                <Brain className="w-4 h-4 inline mr-2" />Start Practicing
              </Link>
              <Link to="/interview" className="px-6 py-3 rounded-xl glass-card neon-border-cyan font-display text-sm text-primary hover:scale-105 transition-transform">
                <Swords className="w-4 h-4 inline mr-2" />Mock Interview
              </Link>
            </div>
          </GlassCard>
        ) : (
          <GlassCard glow="magenta" hover={false} delay={0.3}>
            <h3 className="font-heading text-xl font-bold neon-text-magenta mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" /> XP Breakdown
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2 p-3 rounded-xl border border-border">
                <Brain className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground">Aptitude</p>
                  <p className="text-xs">50-150 XP per session</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl border border-border">
                <MessageCircle className="w-5 h-5 text-neon-magenta flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground">Coding</p>
                  <p className="text-xs">100-300 XP per session</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl border border-border">
                <Swords className="w-5 h-5 text-neon-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-foreground">Mock Interview</p>
                  <p className="text-xs">150-450 XP per session</p>
                </div>
              </div>
            </div>
            {streak >= 3 && (
              <div className="mt-4 p-3 rounded-xl bg-neon-orange/5 border border-neon-orange/20 text-center">
                <p className="text-xs text-neon-orange font-display font-bold">
                  🔥 {streak}-day streak! {streak >= 7 ? "1.5x XP bonus!" : "1.2x XP bonus!"}
                </p>
              </div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default BattlePass;
