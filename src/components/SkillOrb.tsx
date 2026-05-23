import { motion } from "framer-motion";

interface SkillOrbProps {
  name: string;
  level: number;
  color: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-16 h-16", md: "w-20 h-20", lg: "w-24 h-24" };
const textSize = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" };

const SkillOrb = ({ name, level, color, delay = 0, size = "md" }: SkillOrbProps) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    whileHover={{ scale: 1.2, zIndex: 10 }}
    className={`${sizeMap[size]} rounded-full flex flex-col items-center justify-center cursor-pointer relative group`}
    style={{
      background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
      border: `1px solid ${color}60`,
      boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}10`,
    }}
  >
    <span className={`font-display font-bold ${textSize[size]} text-foreground`}>
      {level}%
    </span>
    <span className={`${textSize[size]} text-muted-foreground mt-0.5 text-center leading-tight px-1`}>
      {name}
    </span>
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ border: `2px solid ${color}` }}
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

export default SkillOrb;
