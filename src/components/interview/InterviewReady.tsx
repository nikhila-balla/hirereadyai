import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, AlertTriangle, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Props {
  company: string;
  cameraOn: boolean;
  micOn: boolean;
  cameraError: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  onToggleCamera: () => void;
  onToggleMic: () => void;
  onStart: () => void;
}

const InterviewReady = ({ company, cameraOn, micOn, cameraError, videoRef, onToggleCamera, onToggleMic, onStart }: Props) => (
  <div className="max-w-2xl mx-auto">
    <GlassCard glow="cyan" hover={false} delay={0.1}>
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-display font-bold mb-4"
          style={{ background: "var(--gradient-cyber)" }}
        >
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-primary-foreground">{company} Interview</span>
        </motion.div>
        <h2 className="font-heading text-xl font-bold text-foreground">AI Interviewer Ready</h2>
        <p className="text-sm text-muted-foreground mt-1">5 company-specific questions · AI voice · Live transcript</p>
      </div>

      <div className="aspect-video rounded-xl bg-muted/30 mb-4 overflow-hidden relative">
        {cameraOn ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Video className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Camera off</p>
          </div>
        )}
        {cameraOn && (
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md glass-card text-[10px] font-display text-neon-green">● LIVE</div>
        )}
      </div>

      {cameraError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive">{cameraError}</p>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button
          onClick={onToggleCamera}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-display transition-all ${cameraOn ? "bg-neon-green/10 border border-neon-green/30 text-neon-green" : "glass-card text-muted-foreground hover:text-foreground"}`}
        >
          {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          {cameraOn ? "Camera On ✓" : "Enable Camera"}
        </button>
        <button
          onClick={onToggleMic}
          className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-display transition-all ${micOn ? "bg-neon-green/10 border border-neon-green/30 text-neon-green" : "glass-card text-muted-foreground hover:text-foreground"}`}
        >
          {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          {micOn ? "Mic On ✓" : "Enable Mic"}
        </button>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-primary-foreground hover:scale-[1.02] transition-transform"
        style={{ background: "var(--gradient-cyber)" }}
      >
        🎤 Begin {company} Interview
      </button>
      <p className="text-xs text-muted-foreground text-center mt-3">AI will speak questions aloud. You can respond by voice or type.</p>
    </GlassCard>
  </div>
);

export default InterviewReady;
