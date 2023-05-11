type Colors = 0 | 20 | 40 | 60 | 80 | 100;
type Hours = "00" | "03" | "06" | "09" | "12" | "15" | "18" | "21" | "24";

export type DayGradientColors = { [T in Hours]: Colors };
