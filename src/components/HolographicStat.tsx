import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HolographicStatProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
  delay?: number;
}

const HolographicStat = ({ icon, label, value, color, delay = 0 }: HolographicStatProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="glass-card p-5 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
    style={{ borderColor: `${color}40`, boxShadow: `0 0 20px ${color}20` }}
  >
    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xl font-display font-bold" style={{ color }}>{value}</p>
      </div>
    </div>
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ background: `radial-gradient(circle at center, ${color}05, transparent)` }}
    />
  </motion.div>
);

export default HolographicStat;
