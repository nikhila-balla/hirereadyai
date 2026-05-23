import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Save, LogOut, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    college_name: "",
    branch: "",
    address: "",
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoading(true);
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          college_name: data.college_name || "",
          branch: data.branch || "",
          address: data.address || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      user_id: user.id,
      ...profile,
    }, { onConflict: "user_id" });
    if (error) toast.error("Failed to save");
    else toast.success("Profile saved!");
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-grid">
      <Navbar />
      <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text-cyber mb-2">PROFILE</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </motion.div>

        <GlassCard glow="cyan" hover={false} delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-cyber)" }}>
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">{profile.full_name || "Set your name"}</h2>
              <p className="text-sm text-muted-foreground">{profile.college_name || "Add your college"}</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { key: "full_name", label: "Full Name", placeholder: "Your full name" },
              { key: "phone", label: "Phone", placeholder: "+91 XXXXXXXXXX" },
              { key: "college_name", label: "College", placeholder: "Your college name" },
              { key: "branch", label: "Branch", placeholder: "e.g. CSE, ECE" },
              { key: "address", label: "Address", placeholder: "City, State" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-display mb-1 block">{field.label}</label>
                <input
                  value={profile[field.key as keyof typeof profile]}
                  onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="flex-1 py-3 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-primary-foreground hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              style={{ background: "var(--gradient-cyber)" }}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile
            </button>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 rounded-xl glass-card border border-destructive/30 text-destructive text-sm font-display hover:bg-destructive/10 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Profile;
