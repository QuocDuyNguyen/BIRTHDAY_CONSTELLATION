import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface BalloonSpec {
  color: "blush" | "lilac" | "cream" | "berry";
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

const balloons: BalloonSpec[] = [
  { color: "lilac", left: "3%", top: "25%", size: 82, delay: 0.05, duration: 1.05, rotate: -7 },
  { color: "blush", left: "10%", top: "56%", size: 68, delay: 0.28, duration: 1.2, rotate: 5 },
  { color: "cream", left: "18%", top: "34%", size: 52, delay: 0.48, duration: 1.1, rotate: -4 },
  { color: "berry", left: "73%", top: "40%", size: 74, delay: 0.18, duration: 1.16, rotate: 6 },
  { color: "lilac", left: "84%", top: "23%", size: 58, delay: 0.38, duration: 1.08, rotate: -5 },
  { color: "blush", left: "89%", top: "66%", size: 86, delay: 0.62, duration: 1.28, rotate: 7 },
  { color: "cream", left: "65%", top: "72%", size: 44, delay: 0.76, duration: 1.22, rotate: -3 },
];

export function Balloons({ visible, paused = false }: { visible: boolean; paused?: boolean }) {
  return <div className={`balloon-stage ${visible ? "is-visible" : "is-hidden"} ${paused ? "is-paused" : ""}`} aria-hidden="true">
    {balloons.map((balloon, index) => {
      const style = {
        left: balloon.left,
        top: balloon.top,
        "--balloon-size": `${balloon.size}px`,
        "--balloon-delay": `${balloon.delay}s`,
      } as CSSProperties;

      return <motion.div
        className="balloon-entry"
        key={`${balloon.color}-${index}`}
        style={style}
        initial={{ opacity: 0, y: "108vh", scale: 0.45, rotate: balloon.rotate * 1.8 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1, rotate: balloon.rotate } : { opacity: 0, y: "108vh", scale: 0.45, rotate: balloon.rotate * 1.8 }}
        transition={{ duration: balloon.duration, delay: balloon.delay, ease: [0.22, 0.8, 0.25, 1] }}
      >
        <div className={`balloon-shell balloon-${balloon.color}`}>
          <span className="balloon-body" />
          <span className="balloon-string" />
        </div>
      </motion.div>;
    })}
  </div>;
}
