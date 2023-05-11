import { DayGradientColors } from "@/types";

const colors_dic = {
  0: "secondary-100",
  20: "primary-100",
  40: "primary-200",
  60: "primary-300",
  80: "primary-400",
  100: "primary-500",
};

export function DayGradient({ colors }: { colors: DayGradientColors }) {
  return (
    <div className="w-full h-4 flex bg-secondary-100">
      <div
        className={`w-full h-full bg-gradient-to-r from-${
          colors_dic[colors["00"]]
        } from-0% via-${colors_dic[colors["03"]]} via-50% to-${
          colors_dic[colors["06"]]
        } to-100%`}
      />
      <div
        className={`w-full h-full bg-gradient-to-r from-${
          colors_dic[colors["06"]]
        } from-0% via-${colors_dic[colors["09"]]} via-50% to-${
          colors_dic[colors["12"]]
        } to-100%`}
      />
      <div
        className={`w-full h-full bg-gradient-to-r from-${
          colors_dic[colors["12"]]
        } from-0% via-${colors_dic[colors["15"]]} via-50% to-${
          colors_dic[colors["18"]]
        } to-100%`}
      />
      <div
        className={`w-full h-full bg-gradient-to-r from-${
          colors_dic[colors["18"]]
        } from-0% via-${colors_dic[colors["21"]]} via-50% to-${
          colors_dic[colors["24"]]
        } to-100%`}
      />
    </div>
  );
}
