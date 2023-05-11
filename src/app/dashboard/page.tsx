import { Box, DayGradient, Info } from "@/components/dashboard";
import { GraphMonth } from "@/components/dashboard/graphMonth";
import { GraphWeek } from "@/components/dashboard/graphWeek";
import { DayGradientColors } from "@/types";

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
  { day: 1, arrecadado: 93.24, viagens: 80 },
  { day: 2, arrecadado: 95.35, viagens: 84 },
  { day: 3, arrecadado: 98.84, viagens: 86 },
  { day: 4, arrecadado: 99.92, viagens: 82 },
  { day: 5, arrecadado: 99.8, viagens: 80 },
  { day: 6, arrecadado: 99.47, viagens: 76 },
  { day: 7, arrecadado: 100.39, viagens: 80 },
  { day: 8, arrecadado: 100.4, viagens: 88 },
  { day: 9, arrecadado: 100.81, viagens: 90 },
  { day: 10, arrecadado: 103.92, viagens: 96 },
  { day: 11, arrecadado: 105.06, viagens: 92 },
  { day: 12, arrecadado: 93.24, viagens: 94 },
  { day: 13, arrecadado: 95.35, viagens: 90 },
  { day: 14, arrecadado: 98.84, viagens: 88 },
  { day: 15, arrecadado: 99.92, viagens: 86 },
  { day: 16, arrecadado: 99.47, viagens: 84 },
  { day: 17, arrecadado: 100.39, viagens: 82 },
  { day: 18, arrecadado: 100.4, viagens: 80 },
  { day: 19, arrecadado: 100.81, viagens: 78 },
  { day: 20, arrecadado: 103.92, viagens: 76 },
  { day: 21, arrecadado: 105.06, viagens: 80 },
  { day: 22, arrecadado: 95.35, viagens: 84 },
  { day: 23, arrecadado: 98.84, viagens: 88 },
  { day: 24, arrecadado: 99.92, viagens: 92 },
  { day: 25, arrecadado: 99.8, viagens: 88 },
  { day: 26, arrecadado: 99.47, viagens: 84 },
  { day: 27, arrecadado: 100.39, viagens: 82 },
  { day: 28, arrecadado: 100.4, viagens: 80 },
  { day: 29, arrecadado: 100.81, viagens: 78 },
  { day: 30, arrecadado: 103.92, viagens: 70 },
];

const arrecadados_viagens_horas = [
  { day: 1, arrecadado: 93.24, viagens: 80, horas: 12 },
  { day: 2, arrecadado: 95.35, viagens: 84, horas: 12 },
  { day: 3, arrecadado: 98.84, viagens: 86, horas: 12 },
  { day: 4, arrecadado: 99.92, viagens: 82, horas: 12 },
  { day: 5, arrecadado: 99.8, viagens: 80, horas: 12 },
  { day: 6, arrecadado: 99.47, viagens: 76, horas: 12 },
  { day: 7, arrecadado: 100.39, viagens: 80, horas: 12 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h3 className="font-bold text-2xl mb-6">
        Valores referentes à todo histórico de viagem
      </h3>

      <div className="grid grid-cols-12 gap-6">
        <Box cols={9}>
          <div className="flex items-center justify-around gap-4">
            <Info title="Valor médio da Hora" info="R$ 10,00" />
            <Info title="Valor médio da Km" info="R$ 10,00" />
            <Info title="Distância média por Hora" info="50 Km" />
          </div>
        </Box>
        <Box cols={3} rows={2}>
          <div className="h-full flex flex-col items-center justify-around gap-4">
            <Info center title="Ganhos Totais" info="R$ 10.000,00" />
            <Info center title="Ganho médio por viagem" info="R$ 10,00" />
            <Info center title="Total de gorjetas" info="R$ 1.000,00" />
            <Info
              center
              title="Custo Total"
              subTitle="(Gasolina, Revisão, ...)"
              info="R$ 5.000,00"
            />
          </div>
        </Box>
        <Box
          cols={9}
          title="MÉDIA SEMANAL: R$ Arrecadado x Nº Viagens x Hrs Trabalhadas"
        >
          <GraphWeek data={arrecadados_viagens_horas} />
        </Box>
        <Box cols={12} title="MÉDIA MENSAL: R$ Arrecadado x Nº Viagens">
          <GraphMonth data={arrecadados_viagens} />
        </Box>
        <Box cols={6} rows={2} title="Quantidade de Viagens x Dia da Semana">
          <div className="flex gap-2">
            <div className="flex flex-col mt-4">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                <i key={day} className="font-light text-xs leading-6">
                  {day}
                </i>
              ))}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between mb-1">
                <p className="font-light text-xs">00:00</p>
                <p className="font-light text-xs">06:00</p>
                <p className="font-light text-xs">12:00</p>
                <p className="font-light text-xs">18:00</p>
                <p className="font-light text-xs">23:59</p>
              </div>
              <div className="flex flex-col gap-2">
                {viagens_semana_gradient.map((day, index) => (
                  <DayGradient key={index} colors={day} />
                ))}
              </div>
            </div>
          </div>
        </Box>
        <Box cols={6} title="Quantidade de Viagens">
          <div className="flex items-center justify-around gap-4">
            <Info title="Sugeridas" info="400" />
            <Info title="Aceitas" info="360" description="(90%)" />
            <Info title="Completas" info="340" description="(85%)" />
            <Info title="Recusadas" info="40" description="(10%)" />
          </div>
        </Box>
        <Box cols={6} title="Médias por Viagens Completas">
          <div className="flex items-center justify-around gap-4">
            <div>
              <h5 className="font-bold text-base">Distância</h5>
              <p className="font-bold text-base">4 Km</p>
            </div>
            <div>
              <h5 className="font-bold text-base">Duração</h5>
              <p className="font-bold text-base">10 min</p>
            </div>
            <div>
              <h5 className="font-bold text-base">Tempo para buscar</h5>
              <p className="font-bold text-base">4 min</p>
            </div>
          </div>
        </Box>
        <Box cols={12}>
          <div className="flex items-center justify-center bg-primary-500 w-full h-72">
            MAPS
          </div>
        </Box>
      </div>
    </div>
  );
}
