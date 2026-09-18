import { motion } from "framer-motion";
import { CakeSlice, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { BirthdayData, ZodiacSign } from "../types";

interface BirthdayCardProps { data: BirthdayData; sign: ZodiacSign; age: number; visible: boolean; anchorToEnvelope: boolean; onReplay: () => void; onClose: () => void; onBlow: () => void; blown: boolean; musicOn: boolean; onMusicToggle: () => void; typingKey: number; }

export function BirthdayCard({ data, sign, age, visible, anchorToEnvelope, onReplay, onClose, onBlow, blown, musicOn, onMusicToggle, typingKey }: BirthdayCardProps) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const fullText = data.card.paragraphs.join("\n\n");
  useEffect(() => { setText(""); setDone(false); if (!visible) return; let index = 0; const timer = window.setInterval(() => { index += 1; setText(fullText.slice(0, index)); if (index >= fullText.length) { window.clearInterval(timer); setDone(true); } }, 48); return () => window.clearInterval(timer); }, [fullText, typingKey, visible]);
  return <motion.section className={`card-wrap ${anchorToEnvelope ? "letter-card-position" : ""}`} initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 70, scale: visible ? 1 : 0.78, pointerEvents: visible ? "auto" : "none" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
    <div className="birthday-card"><button className="card-close-button" onClick={onClose} aria-label="Tắt màn hình thư"><X size={18} /></button><div className="card-glow" /><div className="card-topline">A birthday note · {sign.symbol}</div><h2>{data.card.title}</h2><div className="card-recipient"><span>{data.receiverName}</span><span className="card-cake-emoji" aria-hidden="true">🎂</span></div><div className="age-line">A new orbit around the sun · <strong>{age}</strong></div><div className="typewriter"><div className="message-paragraphs">{text.split("\n\n").map((paragraph, index) => <p className="message-paragraph" key={`${index}-${paragraph}`}>{paragraph}</p>)}<span className={`cursor ${done ? "finished" : ""}`} /></div></div><p className="zodiac-note">{sign.shortMessage}</p><div className="card-closing">{data.card.closing}</div><div className="card-actions" style={{ opacity: done ? 1 : 0, pointerEvents: done ? "auto" : "none" }}><button onClick={onBlow} className="secondary-button" disabled={blown}><CakeSlice size={16} /> {blown ? "Nến đã tắt" : "Thổi nến"}</button><button onClick={onReplay} className="icon-button" aria-label="Xem lại animation từ đầu"><RotateCcw size={17} /> Xem lại</button></div></div><div className="card-controls"><button onClick={onMusicToggle} className="round-control" aria-label={musicOn ? "Tắt nhạc" : "Bật nhạc"}>{musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}</button></div></motion.section>;
}
