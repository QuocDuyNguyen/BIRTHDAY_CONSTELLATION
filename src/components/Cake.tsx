import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { BirthdayPhase } from "../hooks/useBirthdaySequence";
import type { CakeTheme } from "../types";

interface CakeProps {
  phase: BirthdayPhase;
  theme: CakeTheme;
  blown: boolean;
}

const phaseOrder: BirthdayPhase[] = [
  "intro", "cake-layer-1", "cake-layer-2", "cake-layer-3", "cake-decoration",
  "zodiac", "candle", "flame", "wish", "confetti", "birthday-title",
  "card-transition", "envelope", "card-open", "card-message", "complete",
];

const reached = (phase: BirthdayPhase, target: BirthdayPhase) => phaseOrder.indexOf(phase) >= phaseOrder.indexOf(target);

export function Cake({ phase, theme, blown }: CakeProps) {
  const body = theme === "chocolate" ? "#8a5b4b" : theme === "vanilla" ? "#e7cda8" : "#e79ab9";
  const bodyDark = theme === "chocolate" ? "#624036" : theme === "vanilla" ? "#c29b70" : "#c86f9e";
  const icing = theme === "chocolate" ? "#f4c7a8" : theme === "vanilla" ? "#fff3dd" : "#fff0f6";
  const accent = theme === "chocolate" ? "#d89d6d" : theme === "vanilla" ? "#f1bd7f" : "#f7c5dc";
  const svgStyle = { "--repo-cake-body": body, "--repo-cake-dark": bodyDark, "--repo-cake-icing": icing, "--repo-cake-accent": accent } as CSSProperties;
  const cardIsOpen = ["card-open", "card-message", "complete"].includes(phase);

  return <motion.div className={`cake-scene ${cardIsOpen ? "is-background" : ""}`} animate={{ opacity: cardIsOpen ? 0.18 : 1, scale: cardIsOpen ? 0.94 : 1 }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}>
    <div className="cake-halo" />
    <svg className="repo-cake-svg" viewBox="0 0 240 370" role="img" aria-label="Bánh sinh nhật đang phát sáng" style={svgStyle}>
      <defs>
        <linearGradient id="repoCakeBody" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--repo-cake-body)" /><stop offset="1" stopColor="var(--repo-cake-dark)" /></linearGradient>
        <linearGradient id="repoCakeIcing" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="var(--repo-cake-icing)" /></linearGradient>
        <filter id="repoCakeShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#120a1c" floodOpacity=".42" /></filter>
        <filter id="repoCakeFlameGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      <motion.ellipse cx="120" cy="321" rx="111" ry="9" fill="#f8e6e7" opacity=".96" filter="url(#repoCakeShadow)" initial={{ opacity: 0, scaleX: .7 }} animate={{ opacity: reached(phase, "cake-layer-1") ? 1 : 0, scaleX: reached(phase, "cake-layer-1") ? 1 : .7 }} transition={{ duration: .38, ease: "easeOut" }} />

      <g className={`cake-layer-motion cake-layer-bottom ${reached(phase, "cake-layer-1") ? "is-visible" : ""}`} filter="url(#repoCakeShadow)">
        <path d="M24 269 C24 257 216 257 216 269 L216 313 C216 326 24 326 24 313 Z" fill="url(#repoCakeBody)" />
        <ellipse cx="120" cy="269" rx="96" ry="18" fill="var(--repo-cake-body)" stroke="var(--repo-cake-icing)" strokeWidth="3" />
        <path d="M35 300 C82 312 161 313 205 300" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className={`cake-layer-motion cake-layer-middle ${reached(phase, "cake-layer-2") ? "is-visible" : ""}`} filter="url(#repoCakeShadow)">
        <path d="M37 216 C37 205 203 205 203 216 L203 260 C203 272 37 272 37 260 Z" fill="url(#repoCakeBody)" />
        <ellipse cx="120" cy="216" rx="83" ry="16" fill="var(--repo-cake-body)" stroke="var(--repo-cake-icing)" strokeWidth="3" />
        <path d="M49 248 C91 258 151 259 191 248" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g className={`cake-layer-motion cake-layer-top ${reached(phase, "cake-layer-3") ? "is-visible" : ""}`} filter="url(#repoCakeShadow)">
        <path d="M51 165 C51 155 189 155 189 165 L189 207 C189 218 51 218 51 207 Z" fill="url(#repoCakeBody)" />
        <ellipse cx="120" cy="165" rx="69" ry="14" fill="var(--repo-cake-body)" stroke="var(--repo-cake-icing)" strokeWidth="3" />
        <path d="M63 196 C96 204 145 204 177 196" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g className={`cake-decoration-motion ${reached(phase, "cake-decoration") ? "is-visible" : ""}`}>
        <ellipse cx="120" cy="163" rx="70" ry="14" fill="url(#repoCakeIcing)" />
        <path d="M51 160 C68 154 84 157 99 159 C114 161 127 157 141 158 C158 159 174 154 189 160 L189 166 C184 166 183 176 177 177 C170 178 169 168 164 168 C157 168 157 179 150 180 C143 181 142 169 136 169 C129 169 130 183 122 184 C114 185 113 170 107 170 C100 170 100 180 93 180 C86 180 85 169 79 169 C73 169 71 176 65 175 C58 174 55 168 51 166 Z" fill="url(#repoCakeIcing)" />
        <path d="M64 158 C84 154 102 164 120 158 C141 152 157 163 178 157" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="78" cy="153" r="3.5" fill="var(--repo-cake-accent)" /><circle cx="163" cy="153" r="3.5" fill="var(--repo-cake-accent)" />
      </g>

      <g className={`cake-candle-motion ${reached(phase, "candle") ? "is-visible" : ""}`}>
        <rect x="113" y="107" width="14" height="58" rx="6" fill="var(--zodiac-primary)" />
        <path d="M114 121 H126 M114 135 H126 M114 149 H126" stroke="rgba(255,255,255,.72)" strokeWidth="4" />
        <motion.g className="candle-flame" animate={blown ? { opacity: 0, scale: .1, y: 15 } : reached(phase, "flame") ? { opacity: 1, scale: [1, 1.13, .9, 1], rotate: [-4, 5, -3, 0] } : { opacity: 0, scale: .1 }} transition={blown ? { duration: .4 } : { duration: 1.05, repeat: Infinity, ease: "easeInOut" }}>
          <ellipse cx="120" cy="98" rx="15" ry="19" fill="#ffb856" opacity=".35" filter="url(#repoCakeFlameGlow)" />
          <path d="M120 107 C108 97 116 87 122 80 C132 94 132 102 120 107 Z" fill="#ff9a4d" filter="url(#repoCakeFlameGlow)" />
          <path d="M120 103 C116 98 120 93 123 89 C127 97 125 101 120 103 Z" fill="#fff7b0" />
        </motion.g>
      </g>
    </svg>
  </motion.div>;
}
