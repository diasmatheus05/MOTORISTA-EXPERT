import { DayGradientColors } from "@/types";
import { DashboardComponent } from "./dashboard";

const viagens_semana_gradient: DayGradientColors[] = [
  {
    "00": "20",
    "03": "40",
    "06": "60",
    "09": "40",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "80",
  },
  {
    "00": "80",
    "03": "20",
    "06": "60",
    "09": "60",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "20",
  },
  {
    "00": "20",
    "03": "40",
    "06": "20",
    "09": "60",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "80",
  },
  {
    "00": "100",
    "03": "20",
    "06": "60",
    "09": "80",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "20",
  },
  {
    "00": "20",
    "03": "80",
    "06": "20",
    "09": "60",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "80",
  },
  {
    "00": "100",
    "03": "20",
    "06": "20",
    "09": "60",
    "12": "80",
    "15": "60",
    "18": "80",
    "21": "60",
    "24": "20",
  },
  {
    "00": "20",
    "03": "40",
    "06": "60",
    "09": "20",
    "12": "80",
    "15": "100",
    "18": "80",
    "21": "60",
    "24": "100",
  },
];

const arrecadados_viagens = [
  { day: 1, arrecadado: 30, viagens: 30 },
  { day: 2, arrecadado: 40, viagens: 34 },
  { day: 3, arrecadado: 35, viagens: 36 },
  { day: 4, arrecadado: 28, viagens: 32 },
  { day: 5, arrecadado: 50, viagens: 30 },
  { day: 6, arrecadado: 45, viagens: 26 },
  { day: 7, arrecadado: 50, viagens: 30 },
  { day: 8, arrecadado: 55, viagens: 38 },
  { day: 9, arrecadado: 60, viagens: 40 },
  { day: 10, arrecadado: 55, viagens: 46 },
  { day: 11, arrecadado: 40, viagens: 42 },
  { day: 12, arrecadado: 30, viagens: 44 },
  { day: 13, arrecadado: 40, viagens: 40 },
  { day: 14, arrecadado: 35, viagens: 38 },
  { day: 15, arrecadado: 28, viagens: 36 },
  { day: 16, arrecadado: 45, viagens: 34 },
  { day: 17, arrecadado: 50, viagens: 32 },
  { day: 18, arrecadado: 55, viagens: 30 },
  { day: 19, arrecadado: 60, viagens: 28 },
  { day: 20, arrecadado: 55, viagens: 26 },
  { day: 21, arrecadado: 40, viagens: 30 },
  { day: 22, arrecadado: 40, viagens: 34 },
  { day: 23, arrecadado: 35, viagens: 38 },
  { day: 24, arrecadado: 28, viagens: 42 },
  { day: 25, arrecadado: 50, viagens: 38 },
  { day: 26, arrecadado: 45, viagens: 34 },
  { day: 27, arrecadado: 50, viagens: 32 },
  { day: 28, arrecadado: 55, viagens: 30 },
  { day: 29, arrecadado: 60, viagens: 28 },
  { day: 30, arrecadado: 55, viagens: 20 },
];

const arrecadados_viagens_horas = [
  { day: 1, arrecadado: 80, viagens: 18, horas: 6 },
  { day: 2, arrecadado: 70, viagens: 15, horas: 6 },
  { day: 3, arrecadado: 60, viagens: 12, horas: 6 },
  { day: 4, arrecadado: 90, viagens: 10, horas: 8 },
  { day: 5, arrecadado: 100, viagens: 25, horas: 12 },
  { day: 6, arrecadado: 140, viagens: 22, horas: 12 },
  { day: 7, arrecadado: 140, viagens: 20, horas: 10 },
];

export default async function Dashboard() {
  const data = await fetch("/api/payment", { cache: "no-store" });
  console.log(data);

  return (
    <DashboardComponent
      monthData={arrecadados_viagens}
      weekData={arrecadados_viagens_horas}
      weekGradient={viagens_semana_gradient}
    />
  );
}
