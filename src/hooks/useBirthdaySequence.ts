import { useCallback, useEffect, useRef, useState } from "react";

export type BirthdayPhase = "intro" | "cake-layer-1" | "cake-layer-2" | "cake-layer-3" | "cake-decoration" | "zodiac" | "candle" | "flame" | "wish" | "confetti" | "birthday-title" | "card-transition" | "envelope" | "card-open" | "card-message" | "complete";

const timeline: Array<[BirthdayPhase, number]> = [
  ["cake-layer-1", 350], ["cake-layer-2", 1050], ["cake-layer-3", 1750], ["cake-decoration", 2400],
  ["zodiac", 3000], ["candle", 4650], ["flame", 5200], ["wish", 5750], ["confetti", 6900],
  ["birthday-title", 7000], ["card-transition", 8550], ["envelope", 9300],
];

export function useBirthdaySequence() {
  const [phase, setPhase] = useState<BirthdayPhase>("intro");
  const [started, setStarted] = useState(false);
  const [sequenceKey, setSequenceKey] = useState(0);
  const openTimer = useRef<number | null>(null);

  const start = useCallback(() => {
    setStarted(true);
    setPhase("intro");
    setSequenceKey((key) => key + 1);
  }, []);

  const reset = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    setStarted(false);
    setPhase("intro");
    setSequenceKey((key) => key + 1);
  }, []);

  const openLetter = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    setPhase("card-open");
    openTimer.current = window.setTimeout(() => setPhase("card-message"), 300);
  }, []);

  const closeLetter = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    setPhase("envelope");
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers = timeline.map(([nextPhase, delay]) => window.setTimeout(() => setPhase(nextPhase), delay));
    return () => {
      timers.forEach(window.clearTimeout);
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    };
  }, [sequenceKey, started]);

  return { phase, started, start, reset, openLetter, closeLetter };
}
