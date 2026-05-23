import { motion, AnimatePresence } from "framer-motion";
import { Brain, Mic, MicOff, MessageSquare, Video, Gauge, Activity } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Scores {
  confidence: number;
  content: number;
  flow: number;
}

interface Props {
  company: string;
  cameraOn: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  isSpeaking: boolean;
  currentQuestion: number;
  totalQuestions: number;
  questionText: string;
  transcript: string;
  isListening: boolean;
  scores: Scores;
  input: string;
  answersCount: number;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onToggleMic: () => void;
  onStartCamera: () => void;
  onComplete: () => void;
}

const InterviewHUD = ({
  company, cameraOn, videoRef, isSpeaking, currentQuestion, totalQuestions,
  questionText, transcript, isListening, scores, input, answersCount,
  onInputChange, onSend, onToggleMic, onStartCamera, onComplete,
}: Props) => {
  const overall = scores.confidence > 0 ? Math.round((scores.confidence + scores.content + scores.flow) / 3) : 0;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Video + AI Avatar */}
        <div className="grid sm:grid-cols-2 gap-4">
          <GlassCard glow="cyan" hover={false} delay={0.1}>
            <div className="aspect-video rounded-lg bg-muted/30 overflow-hidden relative">
              {cameraOn ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Video className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Camera off</p>
                  <button onClick={onStartCamera} className="text-xs text-primary mt-2 hover:underline">Enable</button>
                </div>
              )}
              {cameraOn && <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md glass-card text-[10px] font-display text-neon-green">● LIVE</div>}
            </div>
          </GlassCard>

          <GlassCard glow="magenta" hover={false} delay={0.2}>
            <div className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden" style={{ background: "radial-gradient(circle, #ff00ff08, transparent)" }}>
              <motion.div
                animate={isSpeaking ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={isSpeaking ? { duration: 0.6, repeat: Infinity } : {}}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{
                    background: isSpeaking ? "linear-gradient(135deg, #ff6b6b, #4ecdc4)" : "var(--gradient-cyber)",
                    boxShadow: isSpeaking ? "0 0 40px #ff6b6b80" : "0 0 30px #ff00ff40",
                  }}
                >
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-sm font-heading font-bold text-foreground">{company} Interviewer</p>
                <p className="text-xs text-muted-foreground mt-1">{isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Waiting..."}</p>
              </motion.div>
            </div>
          </GlassCard>
        </div>

        {/* Question + Transcript */}
        <GlassCard hover={false} delay={0.3} className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-display text-muted-foreground">Q{currentQuestion + 1} / {totalQuestions}</span>
            {isSpeaking && <span className="text-xs font-display text-secondary animate-pulse">🔊 AI Speaking...</span>}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <div className="px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-foreground text-sm">
                <Brain className="w-3 h-3 text-secondary inline mr-1.5" />
                {questionText}
              </div>
            </motion.div>
          </AnimatePresence>

          {transcript && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
              <div className="px-4 py-3 rounded-xl bg-primary/10 neon-border-cyan text-foreground text-sm">
                <Mic className="w-3 h-3 text-primary inline mr-1.5" />
                {transcript}
              </div>
            </motion.div>
          )}

          <div className="flex gap-2 mt-auto">
            <input
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type or speak your answer..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <button
              onClick={onToggleMic}
              className={`p-2.5 rounded-xl transition-all ${isListening ? "bg-neon-green/10 border border-neon-green/30 text-neon-green" : "glass-card text-muted-foreground hover:text-foreground"}`}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button onClick={onSend} className="px-4 py-2.5 rounded-xl font-display text-xs text-primary-foreground hover:scale-105 transition-transform" style={{ background: "var(--gradient-cyber)" }}>
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <GlassCard glow="cyan" hover={false} delay={0.2}>
          <h3 className="font-heading text-lg font-bold neon-text-cyan mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5" /> Performance
          </h3>
          {[
            { label: "Confidence", score: scores.confidence, color: "#00f5ff" },
            { label: "Content", score: scores.content, color: "#ff00ff" },
            { label: "Flow", score: scores.flow, color: "#8b5cf6" },
          ].map((s) => (
            <div key={s.label} className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-display font-bold" style={{ color: s.color }}>{s.score}%</span>
              </div>
              <div className="h-3 rounded-full bg-muted/30 overflow-hidden">
                <motion.div animate={{ width: `${s.score}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}60, ${s.color})` }} />
              </div>
            </div>
          ))}
        </GlassCard>

        <GlassCard hover={false} delay={0.4}>
          <h3 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-neon-green" /> Session
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Company</span><span className="font-display text-foreground">{company}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Question</span><span className="font-display text-foreground">{currentQuestion + 1}/{totalQuestions}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Answered</span><span className="font-display text-foreground">{answersCount}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Overall</span><span className="font-display text-primary">{overall}%</span></div>
          </div>
        </GlassCard>

        <button
          onClick={onComplete}
          className="w-full py-3 rounded-xl font-display font-bold text-sm text-primary-foreground hover:scale-[1.02] transition-transform"
          style={{ background: "linear-gradient(135deg, #10b981, #00f5ff)" }}
        >
          Complete Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewHUD;
