import { useEffect, useState } from "react";

const stars = Array.from({ length: 112 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + index * index * 11 + 11) % 100}%`,
  top: `${(index * 61 + index * index * 17 + 7) % 100}%`,
  delay: `${(index % 17) * -0.55}s`,
  size: `${index % 13 === 0 ? 5.5 : index % 17 === 0 ? 3.5 : index % 5 === 0 ? 2.4 : 1.2 + (index % 3) * 0.45}px`,
  driftX: `${((index * 19) % 70) - 35}px`,
  driftY: `${((index * 13) % 50) - 25}px`,
  duration: `${9 + (index % 12)}s`,
  twinkle: `${2.6 + (index % 8) * 0.45}s`,
  bright: index % 13 === 0 || index % 17 === 0 || index % 29 === 0,
}));

function createFlyByStars(seed: number, count: number, spread: number): string {
  let state = seed;
  const random = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  return Array.from({ length: count }, () => {
    const x = Math.round((random() * 2 - 1) * spread);
    const y = Math.round((random() * 2 - 1) * spread);
    const alpha = (0.34 + random() * 0.66).toFixed(2);
    const color = random() > 0.84 ? "#ffe9f5" : random() > 0.55 ? "#dceeff" : "#ffffff";
    return `${x}px ${y}px 0 0 ${color}${Math.round(Number(alpha) * 255).toString(16).padStart(2, "0")}`;
  }).join(", ");
}

const flyByLayers = [
  createFlyByStars(17, 130, 920),
  createFlyByStars(41, 105, 780),
  createFlyByStars(73, 82, 650),
];

const fallingStars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + index * index * 9) % 104 - 2}%`,
  delay: `${(index % 17) * -0.7}s`,
  duration: `${8 + (index % 9) * 1.4}s`,
  size: `${index % 9 === 0 ? 4 : index % 4 === 0 ? 3 : 1.5 + (index % 3) * 0.5}px`,
  drift: `${(index % 7) * 18 - 54}px`,
}));

export function StarField() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * 2 });
    const onPointerLeave = () => setPointer({ x: 0, y: 0 });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    return () => { window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerleave", onPointerLeave); };
  }, []);
  const fieldStyle = { "--pointer-x": `${pointer.x * 34}px`, "--pointer-y": `${pointer.y * 24}px` } as React.CSSProperties;
  return <div className="star-field" style={fieldStyle} aria-hidden="true">
    <div className="fly-by-layer fly-layer-one" style={{ boxShadow: flyByLayers[0] }} />
    <div className="fly-by-layer fly-layer-two" style={{ boxShadow: flyByLayers[1] }} />
    <div className="fly-by-layer fly-layer-three" style={{ boxShadow: flyByLayers[2] }} />
    <div className="falling-stars">{fallingStars.map((star) => <span key={star.id} className="falling-star" style={{ left: star.left, width: star.size, height: star.size, "--fall-delay": star.delay, "--fall-duration": star.duration, "--fall-drift": star.drift } as React.CSSProperties} />)}</div>
    {stars.map((star) => <i key={star.id} className={star.bright ? "bright-star" : ""} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, "--drift-x": star.driftX, "--drift-y": star.driftY, "--drift-duration": star.duration, "--twinkle-duration": star.twinkle } as React.CSSProperties} />)}
    <div className="shooting-stars"><span /><span /><span /><span /><span /></div>
  </div>;
}
