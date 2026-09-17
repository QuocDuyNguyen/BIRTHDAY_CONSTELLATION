import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

interface IntroScreenProps { onStart: () => void; visible: boolean; }

export function IntroScreen({ onStart, visible }: IntroScreenProps) {
  return (
    <motion.section className="intro-screen" initial={false} animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none", y: visible ? 0 : -130, scale: visible ? 1 : 1.05 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <div className="eyebrow"><Sparkles size={14} /> A little cosmic surprise</div>
      <motion.div className="gift-orbit" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        <span className="orbit-dot" />
      </motion.div>
      <motion.div className="gift-icon" animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}><Gift size={60} strokeWidth={1.25} /></motion.div>
      <p className="intro-kicker">A special gift, made just for you...</p>
      <h1>A special gift<br /><em>made just for you</em></h1>
      <button className="primary-button" onClick={onStart} aria-label="Open your birthday gift"><Gift size={18} /> Open your gift</button>
    </motion.section>
  );
}
