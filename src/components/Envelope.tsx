import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { BirthdayPhase } from "../hooks/useBirthdaySequence";

interface EnvelopeProps { phase: BirthdayPhase; onOpen: () => void; }
export function Envelope({ phase, onOpen }: EnvelopeProps) {
  const open = ["card-open", "card-message", "complete"].includes(phase);
  const show = ["envelope", "card-open", "card-message", "complete"].includes(phase);
  const [arrived, setArrived] = useState(false);
  const hasOpened = useRef(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
  useEffect(() => { if (phase === "intro") hasOpened.current = false; else if (open) hasOpened.current = true; setArrived(false); }, [phase, open]);
  useEffect(() => { const media = window.matchMedia("(max-width: 640px)"); const onChange = () => setIsMobile(media.matches); media.addEventListener("change", onChange); return () => media.removeEventListener("change", onChange); }, []);
  const finalX = 0;
  const finalY = 0;
  const returning = phase === "envelope" && hasOpened.current;
  const entryY = Math.round(window.innerHeight * 0.58 + (isMobile ? 100 : 120));
  const flight = phase === "envelope" && !returning ? { opacity: 1, x: 0, y: [entryY, finalY], rotate: 0 } : { opacity: show ? (phase === "card-message" || phase === "complete" ? 0 : 1) : 0, x: open ? finalX : 0, y: open ? finalY : show ? 0 : 80, rotate: 0, scale: show ? 1 : 0.7 };
  return <motion.div className="envelope-wrap" initial={false} animate={flight} transition={phase === "envelope" && !returning ? { duration: 2.2, ease: [0.22, 1, 0.36, 1] } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={() => { if (phase === "envelope") setArrived(true); }}><div className={`envelope-cosmo ${open ? "is-opening" : ""}`} aria-hidden="true"><i /><i /><i /><i /><i /></div><button className={`envelope ${open ? "is-open" : ""} ${arrived ? "is-arrived" : ""}`} onClick={onOpen} disabled={open || phase !== "envelope" || !arrived} aria-label="Mở phong bì sinh nhật"><div className="envelope-paper">♡</div><div className="envelope-front" /><div className="envelope-flap" />{phase === "envelope" && arrived && <span className="envelope-hint">Chạm để mở thư</span>}</button></motion.div>;
}
