import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Swords, Brain, BarChart3, Building2, Upload } from "lucide-react";
import SkillOrb from "@/components/SkillOrb";
import GlassCard from "@/components/GlassCard";
import Navbar from "@/components/Navbar";
import ResumeUpload from "@/components/ResumeUpload";
import CompanySelector from "@/components/CompanySelector";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SKILL_COLORS = ["#00f5ff", "#ff00ff", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; resume_uploaded: boolean }>({ full_name: null, resume_uploaded: false });
  const [skills, setSkills] = useState<{ name: string; level: number }[]>([]);
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    const [profileRes, skillsRes] = await Promise.all([
      supabase.from("profiles").select("full_name, resume_uploaded").eq("user_id", user.id).single(),
      supabase.from("resume_skills").select("skill_name, proficiency_level").eq("user_id", user.id),
    ]);
    
    if (profileRes.error || !profileRes.data) {
      const defaultName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Warrior";
      await supabase.from("profiles").upsert({
        user_id: user.id,
        full_name: defaultName,
        resume_uploaded: false,
      }, { onConflict: "user_id" });
      setProfile({
        full_name: defaultName,
        resume_uploaded: false,
      });
    } else {
      setProfile({
        full_name: profileRes.data.full_name || "",
        resume_uploaded: !!profileRes.data.resume_uploaded,
      });
    }

    if (skillsRes.data) {
      setSkills(skillsRes.data.map((s) => ({ name: s.skill_name, level: s.proficiency_level })));
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const displayName = profile.full_name || user?.user_metadata?.full_name || "Warrior";

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-6">

        {/* TOP: Welcome + Resume Upload */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              <span className="text-foreground">Hi, </span>
              <span className="gradient-text-cyber">{displayName}!</span>
            </h1>
            <p className="text-muted-foreground mt-1">Your AI career command center</p>
          </div>
          {profile.resume_uploaded && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-neon-green/10 text-neon-green font-display flex items-center gap-1.5">
              <Upload className="w-3 h-3" /> Resume uploaded
            </span>
          )}
        </motion.section>

        {/* SKILL GALAXY - 30vh fixed height */}
        <GlassCard glow="cyan" hover={false} delay={0.1} className="min-h-[200px]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-lg font-bold neon-text-cyan flex items-center gap-2">
              <Award className="w-5 h-5" /> Skill Galaxy
            </h2>
            {skills.length > 0 && (
              <button
                onClick={() => setShowResumeUpload(true)}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-display flex items-center gap-1.5"
              >
                <Upload className="w-3 h-3" /> Edit Resume
              </button>
            )}
          </div>
          {showResumeUpload ? (
            <div className="flex flex-col items-center">
              <ResumeUpload onSkillsExtracted={(extracted) => {
                setSkills(extracted);
                setProfile(p => ({ ...p, resume_uploaded: true }));
                setShowResumeUpload(false);
              }} />
              {skills.length > 0 && (
                <button
                  onClick={() => setShowResumeUpload(false)}
                  className="text-xs text-muted-foreground hover:underline mt-2"
                >
                  Cancel
                </button>
              )}
            </div>
          ) : skills.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center items-center max-h-[25vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              {skills.map((s, i) => (
                <SkillOrb
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={s.level >= 75 ? "#10b981" : s.level >= 50 ? "#f59e0b" : "#ef4444"}
                  delay={0.1 + i * 0.04}
                  size={s.level > 80 ? "lg" : s.level > 60 ? "md" : "sm"}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ResumeUpload onSkillsExtracted={(extracted) => {
                setSkills(extracted);
                setProfile(p => ({ ...p, resume_uploaded: true }));
              }} />
            </div>
          )}
        </GlassCard>

        {/* COMPANY SELECTOR - LPA sorted */}
        <GlassCard hover={false} delay={0.2}>
          <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-neon-magenta" /> Target Companies
          </h2>
          <CompanySelector />
        </GlassCard>

        {/* TEST CARDS */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: "/practice", icon: <Brain className="w-6 h-6" />, label: "Practice Now", color: "#00f5ff", desc: "Aptitude, Coding & Behavioral" },
            { to: "/interview", icon: <Swords className="w-6 h-6" />, label: "Mock Interview", color: "#ff00ff", desc: "Webcam + AI Interview Arena" },
            { to: "/results", icon: <BarChart3 className="w-6 h-6" />, label: "View Results", color: "#8b5cf6", desc: "Scores, XP & Roadmap" },
          ].map((a, i) => (
            <Link to={a.to} key={a.to}>
              <GlassCard delay={0.3 + i * 0.1} className="text-center cursor-pointer">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${a.color}15`, border: `1px solid ${a.color}30`, color: a.color }}>
                  {a.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{a.label}</h3>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
