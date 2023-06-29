import { Box, DayGradient, Info } from "@/components/dashboard";
import { GraphMonth } from "@/components/dashboard/graphMonth";
import { GraphWeek } from "@/components/dashboard/graphWeek";
import { DayGradientColors, MonthData, WeekData } from "@/types";

export function DashboardComponent({
  weekData,
  monthData,
  weekGradient,
  valorMedioHora,
  valorMedioKm,
  distanciaMediaHora,
  valorMedioViagem,
  valorTotal,
}: {
  weekData: WeekData[];
  monthData: MonthData[];
  weekGradient: DayGradientColors[];
  valorMedioHora: number;
  valorMedioKm: number;
  distanciaMediaHora: number;
  valorTotal: number;
  valorMedioViagem: number;
}) {
  return (
    <div className="p-6">
      <h3 className="font-bold text-2xl mb-6">
        Valores referentes à todo histórico de viagem
      </h3>

      <div className="grid grid-cols-12 gap-6">
        <Box cols={9}>
          <div className="flex items-center justify-around gap-4">
            <Info
              title="Valor médio da Hora"
              info={valorMedioHora.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            />
            <Info
              title="Valor médio do Km"
              info={valorMedioKm.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            />
            <Info
              title="Distância média por Hora"
              info={distanciaMediaHora.toFixed(1) + " Km"}
            />
          </div>
        </Box>
        <Box cols={3} rows={2}>
          <div className="h-full flex flex-col items-center justify-around gap-4">
            <Info
              center
              title="Ganhos Totais"
              info={valorTotal.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            />
            <Info
              center
              title="Ganho médio por viagem"
              info={valorMedioViagem.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            />
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
          <GraphWeek data={weekData} />
        </Box>
        <Box cols={12} title="MÉDIA MENSAL: R$ Arrecadado x Nº Viagens">
          <GraphMonth data={monthData} />
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
                {weekGradient.map((day, index) => (
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
      </div>
    </div>
  );
}
