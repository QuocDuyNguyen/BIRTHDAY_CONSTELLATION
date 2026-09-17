import confetti from "canvas-confetti";
import { Howl } from "howler";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { BirthdayCard } from "./components/BirthdayCard";
import { Balloons } from "./components/Balloons";
import { Cake } from "./components/Cake";
import { Envelope } from "./components/Envelope";
import { IntroScreen } from "./components/IntroScreen";
import { StarField } from "./components/StarField";
import { ZodiacScene } from "./components/ZodiacScene";
import { birthdayData } from "./data/birthdayData";
import { useBirthdaySequence } from "./hooks/useBirthdaySequence";
import { getCelebrationAge, getZodiacSign } from "./utils/getZodiacSign";

function App() {
  const { phase, started, start, reset, openLetter, closeLetter } = useBirthdaySequence();
  const sign = useMemo(() => getZodiacSign(birthdayData.birthDate), []);
  const age = birthdayData.celebrationAge ?? getCelebrationAge(birthdayData.birthDate);
  const [blown, setBlown] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const musicRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!birthdayData.music) return;
    const music = new Howl({ src: [birthdayData.music], loop: true, volume: 0.42, html5: true });
    musicRef.current = music;
    return () => { music.stop(); music.unload(); musicRef.current = null; };
  }, []);

  const cardVisible = ["card-message", "complete"].includes(phase);
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;
    if (musicOn && started) {
      if (!music.playing()) music.play();
    } else {
      music.pause();
    }
  }, [musicOn, started]);

  const startExperience = useCallback(() => { setBlown(false); setMusicOn(true); musicRef.current?.play(); start(); }, [start]);
  const replay = useCallback(() => { setBlown(false); setMusicOn(true); setTypingKey((key) => key + 1); reset(); window.setTimeout(() => { start(); musicRef.current?.play(); }, 80); }, [reset, start]);
  const blowCandle = useCallback(() => {
    setBlown(true);
    const compact = window.matchMedia("(max-width: 640px)").matches;
    confetti({ particleCount: compact ? 8 : 38, spread: compact ? 48 : 60, ticks: compact ? 42 : 98, gravity: 1.2, scalar: compact ? .62 : .88, disableForReducedMotion: true, origin: { x: 0.5, y: 0.56 }, colors: [sign.primaryColor, sign.secondaryColor, "#ffffff"] });
  }, [sign]);
  const toggleMusic = useCallback(() => setMusicOn((value) => !value), []);

  useEffect(() => {
    if (phase !== "confetti") return;
    const compact = window.matchMedia("(max-width: 640px)").matches;
    const options = { ticks: compact ? 42 : 98, gravity: 1.2, scalar: compact ? .62 : .86, disableForReducedMotion: true, colors: [sign.primaryColor, sign.secondaryColor, "#ffffff"] };
    if (compact) {
      void confetti({ ...options, particleCount: 12, spread: 60, origin: { x: 0.5, y: 0.62 } });
      return;
    }
    void confetti({ ...options, particleCount: 55, angle: 62, spread: 56, origin: { x: 0.08, y: 0.66 } });
    void confetti({ ...options, particleCount: 55, angle: 118, spread: 56, origin: { x: 0.92, y: 0.66 } });
  }, [phase, sign]);

  const letterOpen = ["card-open", "card-message", "complete"].includes(phase);
  const letterFocus = phase === "envelope" || letterOpen;
  return (
    <main className={`app-shell element-${sign.element} theme-${birthdayData.cakeTheme}`} style={{ "--zodiac-primary": sign.primaryColor, "--zodiac-secondary": sign.secondaryColor } as React.CSSProperties}>
      <StarField />
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="scene-label">BIRTHDAY CONSTELLATION <span>✦</span></div>
      {started && <>
        <ZodiacScene phase={phase} sign={sign} dimmed={letterOpen} />
        <Cake phase={phase} theme={birthdayData.cakeTheme} blown={blown} />
        <Balloons visible={blown} paused={letterOpen} />
        <div className="wish-text" aria-live="polite">{phase === "wish" && "Make a wish ✨"}</div>
        <div className={`birthday-title ${letterOpen ? "scene-in-background" : ""}`} aria-live="polite">
          {["birthday-title", "card-transition", "envelope", "card-open", "card-message", "complete"].includes(phase) && <><span>HAPPY BIRTHDAY</span><strong>{birthdayData.receiverName}</strong></>}
        </div>
        {letterFocus && <div className="letter-backdrop" aria-hidden="true" />}
        <Envelope phase={phase} onOpen={openLetter} />
        <BirthdayCard data={birthdayData} sign={sign} age={age} visible={cardVisible} anchorToEnvelope={letterOpen} onReplay={replay} onClose={closeLetter} onBlow={blowCandle} blown={blown} musicOn={musicOn} onMusicToggle={toggleMusic} typingKey={typingKey} />
      </>}
      <IntroScreen visible={!started} onStart={startExperience} />
    </main>
  );
}

export default App;
