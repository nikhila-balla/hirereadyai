import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Zap, CheckCircle, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ParticleBackground from "@/components/ParticleBackground";

type PageMode = "signup" | "signin";

const AuthPage = () => {
  const [mode, setMode] = useState<PageMode>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupEmail, setSignupEmail] = useState(""); // remember email after signup

  // Signup form
  const [signupForm, setSignupForm] = useState({ fullName: "", email: "", password: "" });
  // Login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const { signUp, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  // ─────────────────────────────────────────
  // SIGN UP
  // ─────────────────────────────────────────
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.fullName.trim().length < 2) {
      toast.error("Please enter your full name (at least 2 characters).");
      return;
    }
    if (signupForm.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(signupForm.email, signupForm.password, signupForm.fullName.trim());
      if (error) {
        if (/already|registered|exists/i.test(error.message)) {
          toast.error("An account with this email already exists. Please sign in.");
          setMode("signin");
          setLoginForm(prev => ({ ...prev, email: signupForm.email }));
        } else {
          toast.error(error.message);
        }
      } else {
        // Sign out immediately to prevent auto-login from Supabase
        await signOut();
        
        setSignupEmail(signupForm.email);
        setLoginForm(prev => ({ ...prev, email: signupForm.email }));
        setMode("signin");
        toast.success("Account created successfully! Please check your email to confirm your account before signing in.", { duration: 6000 });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // SIGN IN
  // ─────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          toast.error("Email not confirmed. Please check your inbox and click the verification link.");
        } else {
          toast.error("Incorrect email or password. Please try again.");
        }
        setLoading(false);
        return;
      }

      // Check email verified
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Session error. Please try again.");
        await signOut();
        setLoading(false);
        return;
      }


      // Skip email verification check since we are disabling it on the backend
      // Success
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#00f5ff", "#ff00ea", "#7c3aed", "#22d3ee"],
      });
      toast.success("Welcome to HireReady! 🎉");
      setLoading(false);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid px-4">
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {/* ── SIGN UP ── */}
        {mode === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md glass-card p-8 neon-border-cyan relative z-10"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "var(--gradient-cyber)" }}
              >
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-bold gradient-text-cyber">CREATE ACCOUNT</h1>
              <p className="text-sm text-muted-foreground mt-1">Join HireReady and level up your career</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (8+ characters)"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                id="signup-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-primary-foreground hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                style={{ background: "var(--gradient-cyber)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Create Account
                  </span>
                )}
              </button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        )}

        {/* ── SIGN IN ── */}
        {mode === "signin" && (
          <motion.div
            key="signin"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md glass-card p-8 neon-border-cyan relative z-10"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "var(--gradient-cyber)" }}
              >
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-bold gradient-text-cyber">WELCOME BACK</h1>
              <p className="text-sm text-muted-foreground mt-1">Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signin-email"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                id="signin-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-primary-foreground hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100"
                style={{ background: "var(--gradient-cyber)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-6">
              New here?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-medium"
              >
                Create an account
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
