import { Corrida, DayGradientColors, Pagamento } from "@/types";
// import { cookies } from "next/headers";
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

// const arrecadados_viagens = [
//   { day: 1, arrecadado: 30, viagens: 30 },
//   { day: 2, arrecadado: 40, viagens: 34 },
//   { day: 3, arrecadado: 35, viagens: 36 },
//   { day: 4, arrecadado: 28, viagens: 32 },
//   { day: 5, arrecadado: 50, viagens: 30 },
//   { day: 6, arrecadado: 45, viagens: 26 },
//   { day: 7, arrecadado: 50, viagens: 30 },
//   { day: 8, arrecadado: 55, viagens: 38 },
//   { day: 9, arrecadado: 60, viagens: 40 },
//   { day: 10, arrecadado: 55, viagens: 46 },
//   { day: 11, arrecadado: 40, viagens: 42 },
//   { day: 12, arrecadado: 30, viagens: 44 },
//   { day: 13, arrecadado: 40, viagens: 40 },
//   { day: 14, arrecadado: 35, viagens: 38 },
//   { day: 15, arrecadado: 28, viagens: 36 },
//   { day: 16, arrecadado: 45, viagens: 34 },
//   { day: 17, arrecadado: 50, viagens: 32 },
//   { day: 18, arrecadado: 55, viagens: 30 },
//   { day: 19, arrecadado: 60, viagens: 28 },
//   { day: 20, arrecadado: 55, viagens: 26 },
//   { day: 21, arrecadado: 40, viagens: 30 },
//   { day: 22, arrecadado: 40, viagens: 34 },
//   { day: 23, arrecadado: 35, viagens: 38 },
//   { day: 24, arrecadado: 28, viagens: 42 },
//   { day: 25, arrecadado: 50, viagens: 38 },
//   { day: 26, arrecadado: 45, viagens: 34 },
//   { day: 27, arrecadado: 50, viagens: 32 },
//   { day: 28, arrecadado: 55, viagens: 30 },
//   { day: 29, arrecadado: 60, viagens: 28 },
//   { day: 30, arrecadado: 55, viagens: 20 },
// ];

// const arrecadados_viagens_horas = [
//   { day: 1, arrecadado: 80, viagens: 18, horas: 6 },
//   { day: 2, arrecadado: 70, viagens: 15, horas: 6 },
//   { day: 3, arrecadado: 60, viagens: 12, horas: 6 },
//   { day: 4, arrecadado: 90, viagens: 10, horas: 8 },
//   { day: 5, arrecadado: 100, viagens: 25, horas: 12 },
//   { day: 6, arrecadado: 140, viagens: 22, horas: 12 },
//   { day: 7, arrecadado: 140, viagens: 20, horas: 10 },
// ];

const gradientGroup = (hour: number) => {
  if (hour >= 0 && hour < 3) return "00";
  if (hour >= 3 && hour < 6) return "03";
  if (hour >= 6 && hour < 9) return "06";
  if (hour >= 9 && hour < 12) return "09";
  if (hour >= 12 && hour < 15) return "12";
  if (hour >= 15 && hour < 18) return "15";
  if (hour >= 18 && hour < 21) return "18";
  if (hour >= 21 && hour < 24) return "21";
  return "24";
};

const gradientColors = (taxa: number) => {
  if (taxa >= 0 && taxa < 10) return "00";
  if (taxa >= 10 && taxa < 30) return "20";
  if (taxa >= 30 && taxa < 50) return "40";
  if (taxa >= 50 && taxa < 70) return "60";
  if (taxa >= 70 && taxa < 90) return "80";
  return "100";
};

const fecthData = async () => {
  const data = await fetch(
    // "https://motorista-expert.vercel.app/api/dashboard",
    "http://localhost:3000/api/dashboard",
    { cache: "no-store" }
  );
  const { corridas } = (await data.json()) as {
    corridas: Corrida[];
    pagamentos: Pagamento[];
  };

  const monthData: Record<
    number,
    {
      arrecadado: number;
      distancia: number;
      corridas: number;
      weekDay: number;
      horas: number;
      gradiente: {
        "00": number;
        "03": number;
        "06": number;
        "09": number;
        "12": number;
        "15": number;
        "18": number;
        "21": number;
        "24": number;
      };
    }
  > = {};

  corridas.forEach((corrida) => {
    const timestampInicio = corrida.status_changes.find(
      (status) => status.status === "accepted"
    )?.timestamp;
    if (timestampInicio) {
      const date = new Date(timestampInicio * 1000);
      const monthDay = date.getDate();
      const weekDay = date.getDay();
      const hour = date.getHours();

      monthData[monthDay] = {
        arrecadado: (monthData[monthDay]?.arrecadado ?? 0) + corrida.fare,
        distancia:
          (monthData[monthDay]?.distancia ?? 0) + (corrida.distance ?? 0),
        corridas: (monthData[monthDay]?.corridas ?? 0) + 1,
        weekDay: weekDay,
        horas: (monthData[monthDay]?.horas ?? 0) + corrida.duration, // segundos
        gradiente: {
          ...monthData[monthDay]?.gradiente,
          [gradientGroup(hour)]:
            (monthData[monthDay]?.gradiente[gradientGroup(hour)] ?? 0) + 1,
        },
      };
    }
  });

  new Array(30).fill(0).forEach(
    (d, i) =>
      !monthData[i + 1] &&
      (monthData[i + 1] = {
        arrecadado: 0,
        distancia: 0,
        corridas: 0,
        weekDay: 1, // segunda é o dia de folga
        horas: 0,
        gradiente: {
          "00": 0,
          "03": 0,
          "06": 0,
          "09": 0,
          "12": 0,
          "15": 0,
          "18": 0,
          "21": 0,
          "24": 0,
        },
      })
  );

  const gradientArray: DayGradientColors[] = [];
  const weekData = new Array(7).fill(0).map((day, index) => {
    const days: {
      arrecadado: number;
      corridas: number;
      weekDay: number;
      horas: number;
      gradiente: {
        "00": number;
        "03": number;
        "06": number;
        "09": number;
        "12": number;
        "15": number;
        "18": number;
        "21": number;
        "24": number;
      };
    }[] = Object.values(monthData).filter((item) => item.weekDay === index);

    const arrecadado = days.reduce((acc, cur) => acc + cur.arrecadado, 0);
    const viagens = days.reduce((acc, cur) => acc + cur.corridas, 0);
    const horas = days.reduce((acc, cur) => acc + cur.horas, 0) / (60 * 60); // segundos -> horas

    gradientArray.push({
      "00": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["00"], 0) * 100) /
          viagens
      ),
      "03": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["03"], 0) * 100) /
          viagens
      ),
      "06": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["06"], 0) * 100) /
          viagens
      ),
      "09": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["09"], 0) * 100) /
          viagens
      ),
      "12": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["12"], 0) * 100) /
          viagens
      ),
      "15": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["15"], 0) * 100) /
          viagens
      ),
      "18": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["18"], 0) * 100) /
          viagens
      ),
      "21": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["21"], 0) * 100) /
          viagens
      ),
      "24": gradientColors(
        (days.reduce((acc, cur) => acc + cur.gradiente["24"], 0) * 100) /
          viagens
      ),
    });

    return {
      day: index + 1,
      arrecadado: Number((arrecadado / days.length).toFixed(2)),
      viagens: Number((viagens / days.length).toFixed(1)),
      horas: Number((horas / days.length).toFixed(1)),
    };
  });

  const valorTotal = Object.values(monthData).reduce(
    (acc, cur) => acc + cur.arrecadado,
    0
  );
  const horaTotal =
    Object.values(monthData).reduce((acc, cur) => acc + cur.horas, 0) /
    (60 * 60);
  const distanciaTotal = Object.values(monthData).reduce(
    (acc, cur) => acc + cur.distancia,
    0
  );

  const valorMedioHora = valorTotal / horaTotal;

  const valorMedioDistancia = valorTotal / distanciaTotal;

  const distanciaMediaHora = distanciaTotal / horaTotal;

  const valorMedioViagem =
    valorTotal /
    Object.values(monthData).reduce((acc, cur) => acc + cur.corridas, 0);

  return {
    monthData: Object.keys(monthData).map((day) => ({
      day: Number(day),
      arrecadado: Number(monthData[Number(day)].arrecadado.toFixed(2)),
      viagens: monthData[Number(day)].corridas,
    })),
    weekData: weekData,
    weekGradient: gradientArray,
    valorMedioHora,
    valorMedioDistancia,
    distanciaMediaHora,
    valorMedioViagem,
    valorTotal,
  };
};

export default async function Dashboard() {
  const {
    monthData,
    weekData,
    weekGradient,
    distanciaMediaHora,
    valorMedioDistancia,
    valorMedioHora,
    valorMedioViagem,
    valorTotal,
  } = await fecthData();

  return (
    <DashboardComponent
      monthData={monthData}
      weekData={weekData}
      weekGradient={weekGradient}
      valorMedioHora={valorMedioHora}
      distanciaMediaHora={distanciaMediaHora}
      valorMedioKm={valorMedioDistancia}
      valorMedioViagem={valorMedioViagem}
      valorTotal={valorTotal}
    />
  );
}
