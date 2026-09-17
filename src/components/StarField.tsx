const stars = Array.from({ length: 64 }, (_, index) => ({
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

const fallingStars = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + index * index * 9) % 104 - 2}%`,
  delay: `${(index % 17) * -0.7}s`,
  duration: `${8 + (index % 9) * 1.4}s`,
  size: `${index % 9 === 0 ? 4 : index % 4 === 0 ? 3 : 1.5 + (index % 3) * 0.5}px`,
  drift: `${(index % 7) * 18 - 54}px`,
}));

export function StarField() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  return <div className="star-field" aria-hidden="true">
    <div className="falling-stars">{fallingStars.slice(0, isMobile ? 6 : fallingStars.length).map((star) => <span key={star.id} className="falling-star" style={{ left: star.left, width: star.size, height: star.size, "--fall-delay": star.delay, "--fall-duration": star.duration, "--fall-drift": star.drift } as React.CSSProperties} />)}</div>
    {stars.slice(0, isMobile ? 24 : stars.length).map((star) => <i key={star.id} className={star.bright ? "bright-star" : ""} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, "--drift-x": star.driftX, "--drift-y": star.driftY, "--drift-duration": star.duration, "--twinkle-duration": star.twinkle } as React.CSSProperties} />)}
    <div className="shooting-stars"><span /><span /><span /><span /><span /></div>
  </div>;
}
