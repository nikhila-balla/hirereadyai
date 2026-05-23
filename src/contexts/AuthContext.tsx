import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect if this page load is a result of clicking an email verification link.
    // Supabase appends ?code=...&type=signup (PKCE) or #access_token=... (implicit).
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const isEmailVerification =
      (urlParams.has("code") && urlParams.get("type") === "signup") ||
      hash.includes("access_token") ||
      hash.includes("type=signup");

    if (isEmailVerification) {
      // Remove the tokens from the URL bar immediately so they aren't reused
      window.history.replaceState({}, document.title, window.location.pathname);

      // Let Supabase exchange the token, then sign the user OUT so they
      // must log in manually — enforcing the desired flow.
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && event !== "SIGNED_OUT") {
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
          setLoading(false);
          // Unsubscribe immediately so this listener doesn't interfere with future sign-in
          subscription.unsubscribe();
        }
      });

      // Also handle the case where getSession already resolves a live session
      supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
        if (existingSession) {
          await supabase.auth.signOut();
        }
        setUser(null);
        setSession(null);
        setLoading(false);
      });

      // Cleanup: unsubscribe on component unmount if it hasn't already unsubscribed
      return () => subscription.unsubscribe();
    }

    // ── Normal app load — restore session if it exists ──
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        // After clicking "Verify Email", user lands back on /auth
        emailRedirectTo: `${window.location.origin}/auth`,
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
