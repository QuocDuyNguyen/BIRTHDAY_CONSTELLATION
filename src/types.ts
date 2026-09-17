export type CakeTheme = "chocolate" | "strawberry" | "vanilla";

export type ZodiacElement = "fire" | "water" | "earth" | "air";

export interface BirthdayCard {
  title: string;
  paragraphs: string[];
  closing: string;
}

export interface BirthdayData {
  receiverName: string;
  birthDate: string;
  cakeTheme: CakeTheme;
  celebrationAge?: number;
  music?: string;
  card: BirthdayCard;
}

export interface ZodiacSign {
  key: string;
  name: string;
  symbol: string;
  element: ZodiacElement;
  primaryColor: string;
  secondaryColor: string;
  shortMessage: string;
}
