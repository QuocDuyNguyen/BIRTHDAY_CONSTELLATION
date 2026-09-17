import type { ZodiacSign } from "../types";

export const zodiacThemes: Record<string, ZodiacSign> = {
  aries: { key: "aries", name: "Aries", symbol: "♈", element: "fire", primaryColor: "#ff9d57", secondaryColor: "#ffd27b", shortMessage: "May your spirit continue to burn bright, bold, and beautifully." },
  taurus: { key: "taurus", name: "Taurus", symbol: "♉", element: "earth", primaryColor: "#8be0a5", secondaryColor: "#f5d58c", shortMessage: "May every new season bring you lasting peace and quiet abundance." },
  gemini: { key: "gemini", name: "Gemini", symbol: "♊", element: "air", primaryColor: "#b9b6ff", secondaryColor: "#8de5ef", shortMessage: "May your curiosity lead you toward beautiful discoveries." },
  cancer: { key: "cancer", name: "Cancer", symbol: "♋", element: "water", primaryColor: "#7dcfff", secondaryColor: "#b5d9ff", shortMessage: "May your heart always be held by warmth, tenderness, and home." },
  leo: { key: "leo", name: "Leo", symbol: "♌", element: "fire", primaryColor: "#f6b84b", secondaryColor: "#ffe09a", shortMessage: "May you always shine with the effortless radiance that is uniquely yours." },
  virgo: { key: "virgo", name: "Virgo", symbol: "♍", element: "earth", primaryColor: "#f6a6c9", secondaryColor: "#ffd4e5", shortMessage: "May life’s finest details always find their way to you." },
  libra: { key: "libra", name: "Libra", symbol: "♎", element: "air", primaryColor: "#d6b7ff", secondaryColor: "#9be5eb", shortMessage: "May the year ahead unfold with grace, harmony, and sweetness." },
  scorpio: { key: "scorpio", name: "Scorpio", symbol: "♏", element: "water", primaryColor: "#8fb8ff", secondaryColor: "#c2d8ff", shortMessage: "May your depth become your strength, and your courage your light." },
  sagittarius: { key: "sagittarius", name: "Sagittarius", symbol: "♐", element: "fire", primaryColor: "#ff9c68", secondaryColor: "#ffc47b", shortMessage: "May every new horizon open into a story worth remembering." },
  capricorn: { key: "capricorn", name: "Capricorn", symbol: "♑", element: "earth", primaryColor: "#a6d89b", secondaryColor: "#f2cd86", shortMessage: "May every dream you nurture rise into something remarkable." },
  aquarius: { key: "aquarius", name: "Aquarius", symbol: "♒", element: "air", primaryColor: "#91d8ff", secondaryColor: "#ceb7ff", shortMessage: "May the world remain open to your most brilliant ideas." },
  pisces: { key: "pisces", name: "Pisces", symbol: "♓", element: "water", primaryColor: "#8fc5ff", secondaryColor: "#b8a7ff", shortMessage: "May your most beautiful dreams find their way into reality." },
};
