import { motion } from "framer-motion";
import type { BirthdayPhase } from "../hooks/useBirthdaySequence";
import { zodiacConstellations } from "../data/zodiacConstellations";
import type { CelestialStar } from "../data/zodiacConstellations";
import type { ZodiacSign } from "../types";

interface ZodiacSceneProps {
  phase: BirthdayPhase;
  sign: ZodiacSign;
  dimmed?: boolean;
}

const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 220;
const PADDING = 28;

interface ProjectedStar {
  x: number;
  y: number;
  radius: number;
}

function projectStars(stars: readonly CelestialStar[]): ProjectedStar[] {
  const radians = Math.PI / 180;
  const meanRa = Math.atan2(
    stars.reduce((sum, [ra]) => sum + Math.sin(ra * radians), 0),
    stars.reduce((sum, [ra]) => sum + Math.cos(ra * radians), 0),
  ) / radians;

  const unwrapped = stars.map(([ra, dec, magnitude]) => {
    let adjustedRa = ra;
    while (adjustedRa - meanRa > 180) adjustedRa -= 360;
    while (adjustedRa - meanRa < -180) adjustedRa += 360;
    return { ra: adjustedRa, dec, magnitude };
  });

  const minRa = Math.min(...unwrapped.map((star) => star.ra));
  const maxRa = Math.max(...unwrapped.map((star) => star.ra));
  const minDec = Math.min(...unwrapped.map((star) => star.dec));
  const maxDec = Math.max(...unwrapped.map((star) => star.dec));
  const raRange = Math.max(maxRa - minRa, 1);
  const decRange = Math.max(maxDec - minDec, 1);
  const scale = Math.min(
    (VIEWBOX_WIDTH - PADDING * 2) / raRange,
    (VIEWBOX_HEIGHT - PADDING * 2) / decRange,
  );
  const plottedWidth = raRange * scale;
  const plottedHeight = decRange * scale;
  const offsetX = (VIEWBOX_WIDTH - plottedWidth) / 2;
  const offsetY = (VIEWBOX_HEIGHT - plottedHeight) / 2;

  const projected = unwrapped.map(({ ra, dec, magnitude }) => ({
    x: offsetX + (ra - minRa) * scale,
    y: offsetY + (maxDec - dec) * scale,
    radius: Math.max(2.4, Math.min(5.5, 2.4 + (6 - magnitude) * 0.7)),
  }));

  return projected;
}

function spreadClosePoints(points: ProjectedStar[], minDistance: number) {
  if (!minDistance) return points;
  const next = points.map((point) => ({ ...point }));
  for (let iteration = 0; iteration < 14; iteration += 1) {
    for (let first = 0; first < next.length; first += 1) {
      for (let second = first + 1; second < next.length; second += 1) {
        const a = next[first];
        const b = next[second];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 0.01;
        if (distance >= minDistance) continue;
        const push = (minDistance - distance) * 0.28;
        const ux = dx / distance;
        const uy = dy / distance;
        a.x -= ux * push;
        a.y -= uy * push;
        b.x += ux * push;
        b.y += uy * push;
      }
    }
  }
  return next;
}

export function ZodiacScene({ phase, sign, dimmed = false }: ZodiacSceneProps) {
  const active = ["zodiac", "wish", "confetti", "card-transition", "envelope", "card-open", "card-message", "complete"].includes(phase);
  const constellation = zodiacConstellations[sign.key] ?? zodiacConstellations.virgo;
  const projectedStars = spreadClosePoints(projectStars(constellation.stars), constellation.minPointDistance ?? 0);

  return <motion.div className={`zodiac-scene ${dimmed ? "scene-in-background" : ""}`} style={{ "--zodiac-primary": sign.primaryColor, "--zodiac-secondary": sign.secondaryColor } as React.CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: dimmed ? .16 : active ? 1 : 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }} aria-label={`Cung hoàng đạo ${sign.name}`}>
    <motion.div className="zodiac-ring" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: active ? 1 : 0, scale: active ? 1 : .9 }} transition={{ opacity: { duration: 1.05, delay: .12, ease: "easeOut" }, scale: { duration: 1.2, delay: .12, ease: [0.16, 1, 0.3, 1] } }}>
      {zodiacSymbols.map((symbol, index) => symbol === sign.symbol ? null : <span key={symbol} style={{ transform: `rotate(${index * 30}deg) translateY(-min(31vw, 225px)) rotate(-${index * 30}deg)` }}>{symbol}</span>)}
    </motion.div>
    <div className="constellation" aria-hidden="true"><svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {constellation.connections.map(([startIndex, endIndex], index) => {
        const start = projectedStars[startIndex];
        const end = projectedStars[endIndex];
        if (!start || !end) return null;
        const delay = 3.65 + (constellation.connections.length > 1 ? index / (constellation.connections.length - 1) * 1.45 : 0);
        return <g key={`${sign.key}-line-${index}`}><motion.path d={`M${start.x} ${start.y} L${end.x} ${end.y}`} pathLength={1} initial={{ pathLength: 0, opacity: 0 }} animate={active ? { pathLength: 1, opacity: .65 } : { pathLength: 0, opacity: 0 }} transition={{ duration: .38, delay, ease: [0.33, 1, 0.68, 1] }} /><motion.circle className="constellation-tracer" r="3.2" stroke="#fff" strokeWidth="1" initial={{ cx: start.x, cy: start.y, opacity: 0 }} animate={active ? { cx: [start.x, end.x], cy: [start.y, end.y], opacity: [0, 1, 1, 0] } : { cx: start.x, cy: start.y, opacity: 0 }} transition={{ duration: .38, delay, ease: [0.33, 1, 0.68, 1] }} /></g>;
      })}
      {projectedStars.map((star, index) => <motion.circle key={`${sign.key}-star-${index}`} cx={star.x} cy={star.y} initial={{ r: 0, opacity: 0 }} animate={active ? { r: star.radius, opacity: 1 } : { r: 0, opacity: 0 }} transition={{ duration: .34, delay: 1.1 + index * .1, ease: [0.16, 1, 0.3, 1] }} />)}
    </svg></div>
    <motion.div className="zodiac-center" initial={{ scale: .82, opacity: 0 }} animate={active ? { scale: [.82, 1.015, 1], opacity: [0, .8, 1] } : { scale: .82, opacity: 0 }} transition={{ duration: 1.15, delay: .7, ease: [0.16, 1, 0.3, 1], times: [0, .72, 1] }}><span>{sign.symbol}</span><small>{sign.name} · {sign.element}</small></motion.div>
  </motion.div>;
}
