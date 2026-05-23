import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Hide on these top-level routes
const HIDDEN_ROUTES = ["/", "/auth", "/dashboard"];

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (HIDDEN_ROUTES.includes(location.pathname)) return null;

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={location.pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={handleBack}
        className="fixed top-20 left-4 sm:left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl glass-card border border-glass-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </motion.button>
    </AnimatePresence>
  );
};

export default BackButton;
