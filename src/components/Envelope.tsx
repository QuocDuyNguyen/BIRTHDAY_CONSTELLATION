import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { BirthdayPhase } from "../hooks/useBirthdaySequence";

interface EnvelopeProps { phase: BirthdayPhase; onOpen: () => void; }
export function Envelope({ phase, onOpen }: EnvelopeProps) {
  const open = ["card-open", "card-message", "complete"].includes(phase);
  const show = ["envelope", "card-open", "card-message", "complete"].includes(phase);
  const [arrived, setArrived] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
  useEffect(() => { setArrived(false); }, [phase]);
  useEffect(() => { const media = window.matchMedia("(max-width: 640px)"); const onChange = () => setIsMobile(media.matches); media.addEventListener("change", onChange); return () => media.removeEventListener("change", onChange); }, []);
  const finalX = 0;
  const finalY = 0;
  const flight = phase === "envelope" ? { opacity: 1, x: isMobile ? [0, 86, -78, 35, finalX] : [0, 180, -210, 145, finalX], y: isMobile ? [0, -130, -72, 65, finalY] : [0, -135, 125, -82, finalY], rotate: isMobile ? [0, 18, -17, 13, 0] : [0, 22, -23, 18, 0] } : { opacity: show ? (phase === "card-message" || phase === "complete" ? 0 : 1) : 0, x: open ? finalX : 0, y: open ? finalY : show ? 0 : 80, rotate: 0, scale: show ? 1 : 0.7 };
  return <motion.div className="envelope-wrap" initial={false} animate={flight} transition={phase === "envelope" ? { duration: 4.6, ease: "easeInOut" } : { duration: 0.8 }} onAnimationComplete={() => { if (phase === "envelope") setArrived(true); }}><div className="envelope-cosmo" aria-hidden="true"><i /><i /><i /><i /><i /></div><button className={`envelope ${open ? "is-open" : ""} ${arrived ? "is-arrived" : ""}`} onClick={onOpen} disabled={open || phase !== "envelope" || !arrived} aria-label="Mở phong bì sinh nhật"><div className="envelope-paper">♡</div><div className="envelope-front" /><div className="envelope-flap" />{phase === "envelope" && arrived && <span className="envelope-hint">Chạm để mở thư</span>}</button></motion.div>;
}
