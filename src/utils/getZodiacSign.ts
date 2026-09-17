import { zodiacThemes } from "../data/zodiacThemes";
import type { ZodiacSign } from "../types";

const ranges: Array<[string, number, number, string]> = [
  ["capricorn", 1222, 119, "♑"], ["aquarius", 120, 218, "♒"],
  ["pisces", 219, 320, "♓"], ["aries", 321, 419, "♈"],
  ["taurus", 420, 520, "♉"], ["gemini", 521, 620, "♊"],
  ["cancer", 621, 722, "♋"], ["leo", 723, 822, "♌"],
  ["virgo", 823, 922, "♍"], ["libra", 923, 1022, "♎"],
  ["scorpio", 1023, 1121, "♏"], ["sagittarius", 1122, 1221, "♐"],
];

export function getZodiacSign(date: string): ZodiacSign {
  const [, monthPart, dayPart] = date.split("-");
  const month = Number(monthPart);
  const day = Number(dayPart);
  const value = month * 100 + day;
  const matched = ranges.find(([, start, end]) => start <= end ? value >= start && value <= end : value >= start || value <= end);
  return zodiacThemes[matched?.[0] ?? "virgo"];
}

export function getCelebrationAge(birthDate: string): number {
  return new Date().getFullYear() - Number(birthDate.slice(0, 4));
}
