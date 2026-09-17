const orbitPlanets = [
  { className: "cosmic-orbit orbit-one", duration: "15s", delay: "-3s", color: "#f5b7a4" },
  { className: "cosmic-orbit orbit-two", duration: "22s", delay: "-11s", color: "#8fd7f0" },
  { className: "cosmic-orbit orbit-three", duration: "31s", delay: "-21s", color: "#e7bd83" },
  { className: "cosmic-orbit orbit-four", duration: "43s", delay: "-8s", color: "#b6a7ff" },
  { className: "cosmic-orbit orbit-five", duration: "58s", delay: "-37s", color: "#e5e5f0" },
];

export function CosmicOrbitBackground() {
  return <div className="cosmic-orbits" aria-hidden="true">
    <div className="cosmic-sun" />
    {orbitPlanets.map((orbit) => <div className={orbit.className} key={orbit.className} style={{ "--orbit-duration": orbit.duration, "--orbit-delay": orbit.delay } as CSSProperties}><i style={{ background: orbit.color }} /></div>)}
    <div className="asteroid-belt">{Array.from({ length: 34 }, (_, index) => <i key={index} style={{ "--asteroid-angle": `${index * 10.6 + (index % 3) * 2}deg`, "--asteroid-radius": `${index % 4 === 0 ? 50 : 46 + (index % 5)}%`, "--asteroid-delay": `${index * -0.18}s` } as CSSProperties} />)}</div>
  </div>;
}
import type { CSSProperties } from "react";
