import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "magenta" | "purple" | "none";
  hover?: boolean;
  delay?: number;
}

const glowStyles = {
  cyan: "neon-border-cyan",
  magenta: "neon-border-magenta",
  purple: "border-neon-purple/40 shadow-[0_0_20px_hsl(270_100%_60%/0.4)]",
  none: "",
};

const GlassCard = ({ children, className = "", glow = "none", hover = true, delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
    className={`glass-card p-6 ${glowStyles[glow]} transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
