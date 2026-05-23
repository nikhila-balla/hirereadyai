import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Brain, Trophy, GitBranch, Mic, Shield, Swords, Sprout, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import GlassCard from "@/components/GlassCard";

const features = [
  { icon: <Brain className="w-6 h-6" />, title: "AI Interview Arena", desc: "Battle an AI interviewer with live confidence, posture & flow scoring", color: "#00f5ff" },
  { icon: <Trophy className="w-6 h-6" />, title: "Battle Pass Practice", desc: "Level up through daily quests, XP rewards, and leaderboard competition", color: "#ff00ff" },
  { icon: <GitBranch className="w-6 h-6" />, title: "Career Tree", desc: "Watch your 30-day career roadmap grow as you complete challenges", color: "#8b5cf6" },
  { icon: <Mic className="w-6 h-6" />, title: "Voice AI Coach", desc: "Get real-time spoken feedback from your personal AI career coach", color: "#10b981" },
  { icon: <Zap className="w-6 h-6" />, title: "Skill Galaxy", desc: "Your resume transforms into a living constellation of skills", color: "#f59e0b" },
  { icon: <Shield className="w-6 h-6" />, title: "Company Intel", desc: "AR-style company deep dives with culture fit predictions", color: "#ef4444" },
];

const TYPING_TEXT = "AI Placement Copilot";

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden cyber-grid">
      <ParticleBackground />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card neon-border-cyan mb-8 text-sm text-primary">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Career Platform</span>
          </div>

          <h1
            className="font-display font-black tracking-tight leading-tight mb-5 text-5xl sm:text-6xl"
            style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.4), 0 4px 20px hsl(var(--primary) / 0.25)" }}
          >
            <span className="gradient-text-cyber">HIREREADY AI</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-heading font-light text-foreground/90 mb-6">
            Get Placed at Your <span className="gradient-text-cyber font-semibold">Dream Company</span>
          </p>

          <p className="text-lg text-muted-foreground mb-12">
            Resume AI <span className="text-primary mx-1">→</span> Mock Arena <span className="text-primary mx-1">→</span> Job Roadmap
          </p>

          <div className="flex justify-center mb-14 px-4">
            <Link
              to="/auth"
              className="group w-[70%] max-w-xl inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-display font-black text-lg uppercase tracking-widest text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: "var(--gradient-cyber)" }}
            >
              🚀 Start Free
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Feature mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Brain className="w-5 h-5" />, label: "Resume Analysis", color: "#00f5ff" },
              { icon: <Swords className="w-5 h-5" />, label: "Interview Battles", color: "#ff00ff" },
              { icon: <Sprout className="w-5 h-5" />, label: "Career Roadmap", color: "#10b981" },
            ].map((card) => (
              <div
                key={card.label}
                className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl glass-card border border-glass-border"
              >
                <span style={{ color: card.color }}>{card.icon}</span>
                <span className="text-sm font-medium text-foreground">{card.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating orbs decoration */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-40 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #00f5ff40, transparent)" }}
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #ff00ff30, transparent)" }}
        />
      </section>

      {/* Features */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-bold text-center mb-4 gradient-text-aurora"
          >
            NEXT-GEN FEATURES
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Not your average placement prep. This is the future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1} hover>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-12 text-center neon-border-cyan"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 neon-text-cyan">
            READY TO DOMINATE?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of students already crushing their placement prep with AI-powered training.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-10 py-4 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-primary-foreground hover:scale-105 transition-transform"
            style={{ background: "var(--gradient-cyber)" }}
          >
            Start Your Journey
          </Link>
        </motion.div>
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border">
        <p>© 2026 HireReady AI — Built for hackathon glory 🚀</p>
      </footer>
    </div>
  );
};

export default Landing;
