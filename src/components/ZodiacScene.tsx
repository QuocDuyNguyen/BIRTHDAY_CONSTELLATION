import { motion } from "framer-motion";
import type { BirthdayPhase } from "../hooks/useBirthdaySequence";
import type { ZodiacSign } from "../types";

interface ZodiacSceneProps { phase: BirthdayPhase; sign: ZodiacSign; dimmed?: boolean; }
const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const constellationSegments = [
  { d: "M50 154 L98 96", points: [[50, 154], [98, 96]] },
  { d: "M98 96 L150 134", points: [[98, 96], [150, 134]] },
  { d: "M150 134 L208 65", points: [[150, 134], [208, 65]] },
  { d: "M208 65 L260 124", points: [[208, 65], [260, 124]] },
  { d: "M260 124 L288 75", points: [[260, 124], [288, 75]] },
  { d: "M98 96 L208 65", points: [[98, 96], [208, 65]] },
  { d: "M150 134 L260 124", points: [[150, 134], [260, 124]] },
] as const;
const constellationPoints = [[50, 154], [98, 96], [150, 134], [208, 65], [260, 124], [288, 75]] as const;

export function ZodiacScene({ phase, sign, dimmed = false }: ZodiacSceneProps) {
  const active = phase !== "intro" && phase !== "cake-layer-1" && phase !== "cake-layer-2" && phase !== "cake-layer-3" && phase !== "cake-decoration";
  return <motion.div className={`zodiac-scene ${dimmed ? "scene-in-background" : ""}`} style={{ "--zodiac-primary": sign.primaryColor, "--zodiac-secondary": sign.secondaryColor } as React.CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: dimmed ? .16 : active ? 1 : 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} aria-label={`Cung hoàng đạo ${sign.name}`}>
    <motion.div className="zodiac-ring" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: active ? 1 : 0, scale: active ? 1 : .9 }} transition={{ opacity: { duration: 1.05, delay: .12, ease: "easeOut" }, scale: { duration: 1.2, delay: .12, ease: [0.16, 1, 0.3, 1] } }}>{zodiacSymbols.map((symbol, index) => symbol === sign.symbol ? null : <span key={symbol} style={{ transform: `rotate(${index * 30}deg) translateY(-min(31vw, 225px)) rotate(-${index * 30}deg)` }}>{symbol}</span>)}</motion.div>
    <div className="constellation" aria-hidden="true"><svg viewBox="0 0 320 220">{constellationSegments.slice(0, 5).map((segment, index) => { const [[startX, startY], [endX, endY]] = segment.points; const delay = 2.9 + index * .66; return <g key={segment.d}><motion.path d={segment.d} initial={{ pathLength: 0, opacity: 0 }} animate={active ? { pathLength: 1, opacity: .65 } : { pathLength: 0, opacity: 0 }} transition={{ duration: .64, delay, ease: [0.33, 1, 0.68, 1] }} /><motion.circle className="constellation-tracer" r="3.4" stroke="#fff" strokeWidth="1" initial={{ cx: startX, cy: startY, opacity: 0 }} animate={active ? { cx: [startX, endX], cy: [startY, endY], opacity: [0, 1, 1, 0] } : { cx: startX, cy: startY, opacity: 0 }} transition={{ duration: .64, delay, ease: [0.33, 1, 0.68, 1] }} /></g>; })}{constellationSegments.slice(5).map((segment, index) => { const [[startX, startY], [endX, endY]] = segment.points; const delay = 6.45 + index * .5; return <g key={segment.d}><motion.path d={segment.d} initial={{ pathLength: 0, opacity: 0 }} animate={active ? { pathLength: 1, opacity: .5 } : { pathLength: 0, opacity: 0 }} transition={{ duration: .56, delay, ease: [0.33, 1, 0.68, 1] }} /><motion.circle className="constellation-tracer" r="3" stroke="#fff" strokeWidth="1" initial={{ cx: startX, cy: startY, opacity: 0 }} animate={active ? { cx: [startX, endX], cy: [startY, endY], opacity: [0, 1, 1, 0] } : { cx: startX, cy: startY, opacity: 0 }} transition={{ duration: .56, delay, ease: [0.33, 1, 0.68, 1] }} /></g>; })}{constellationPoints.map(([x, y], index) => <motion.circle key={`${x}-${y}`} cx={x} cy={y} initial={{ r: 0, opacity: 0 }} animate={active ? { r: 4, opacity: 1 } : { r: 0, opacity: 0 }} transition={{ duration: .38, delay: 1.45 + index * .18, ease: [0.16, 1, 0.3, 1] }} />)}</svg></div>
    <motion.div className="zodiac-center" initial={{ scale: .82, opacity: 0 }} animate={active ? { scale: [.82, 1.015, 1], opacity: [0, .8, 1] } : { scale: .82, opacity: 0 }} transition={{ duration: 1.15, delay: .7, ease: [0.16, 1, 0.3, 1], times: [0, .72, 1] }}><span>{sign.symbol}</span><small>{sign.name} · {sign.element}</small></motion.div>
  </motion.div>;
}
