import { DayGradientColors } from "@/types";

const colors_dic = {
  "00": "#a6a6a6", //"secondary-100",
  "20": "#ffdb0d", //"primary-100",
  "40": "#e8b10c", //"primary-200",
  "60": "#ffa500", //"primary-300",
  "80": "#e8810c", //"primary-400",
  "100": "#ff6b0d", //"primary-500",
};

export function DayGradient({ colors }: { colors: DayGradientColors }) {
  return (
    <div className="w-full h-4 flex bg-secondary-100">
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(90deg, ${colors_dic[colors["00"]]} 0%, ${
            colors_dic[colors["03"]]
          } 12.5%, ${colors_dic[colors["06"]]} 25%, ${
            colors_dic[colors["09"]]
          } 37.5%, ${colors_dic[colors["12"]]} 50%, ${
            colors_dic[colors["15"]]
          } 62.5%, ${colors_dic[colors["18"]]} 75%, ${
            colors_dic[colors["21"]]
          } 87.5%, ${colors_dic[colors["24"]]} 100%)`,
        }}
      />
    </div>
  );
}
