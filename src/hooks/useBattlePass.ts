import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const LEVEL_THRESHOLDS = [0, 500, 1200, 2000, 3000, 4500, 6500, 9000, 12000, 16000];
const LEVEL_TITLES = ["Rookie", "Coder", "Solver", "Builder", "Analyst", "Architect", "Strategist", "Expert", "Master", "Legend"];

export function getLevelFromXP(xp: number) {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return {
    level: Math.min(level, 10),
    title: LEVEL_TITLES[Math.min(level - 1, 9)],
    currentXP: xp,
    nextLevelXP: LEVEL_THRESHOLDS[Math.min(level, 9)] || LEVEL_THRESHOLDS[9],
    progress: level >= 10 ? 100 : ((xp - LEVEL_THRESHOLDS[level - 1]) / (LEVEL_THRESHOLDS[level] - LEVEL_THRESHOLDS[level - 1])) * 100,
  };
}

export function useBattlePass() {
  const { user } = useAuth();
  const [battlePass, setBattlePass] = useState<{ total_xp: number; streak_days: number; last_activity_date: string | null } | null>(null);

  const fetchBattlePass = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("battle_pass")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    if (data) setBattlePass(data as { total_xp: number; streak_days: number; last_activity_date: string | null });
  }, [user]);

  useEffect(() => { fetchBattlePass(); }, [fetchBattlePass]);

  const awardXP = useCallback(async (type: "aptitude" | "coding" | "behavioral" | "mock", score: number, total: number) => {
    if (!user) return 0;

    const pct = total > 0 ? score / total : 0;
    let xp = 0;
    switch (type) {
      case "aptitude": xp = Math.round(50 + pct * 100); break;
      case "coding": xp = Math.round(100 + pct * 200); break;
      case "behavioral": xp = Math.round(50 + pct * 100); break;
      case "mock": xp = Math.round(150 + pct * 300); break;
    }

    const today = new Date().toISOString().split("T")[0];
    const currentXP = battlePass?.total_xp || 0;
    const lastDate = battlePass?.last_activity_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const streak = lastDate === yesterday ? (battlePass?.streak_days || 0) + 1 : lastDate === today ? (battlePass?.streak_days || 1) : 1;

    // Streak bonus
    if (streak >= 7) xp = Math.round(xp * 1.5);
    else if (streak >= 3) xp = Math.round(xp * 1.2);

    const newXP = currentXP + xp;
    const newLevel = getLevelFromXP(newXP).level;

    const { error } = await supabase.from("battle_pass").upsert({
      user_id: user.id,
      total_xp: newXP,
      level: newLevel,
      streak_days: streak,
      last_activity_date: today,
    }, { onConflict: "user_id" });

    if (!error) {
      setBattlePass({ total_xp: newXP, streak_days: streak, last_activity_date: today });
    }

    return xp;
  }, [user, battlePass]);

  return { battlePass, awardXP, refresh: fetchBattlePass, levelInfo: getLevelFromXP(battlePass?.total_xp || 0) };
}
