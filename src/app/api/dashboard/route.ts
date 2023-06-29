import { Corrida, Pagamento } from "@/types";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

type diaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const horariosPico = {
  0: [0, 0],
  1: [8, 10], // Segunda-feira: 8h-10h
  2: [17, 19], // Terça-feira: 17h-19h
  3: [12, 14], // Quarta-feira: 12h-14h
  4: [18, 20], // Quinta-feira: 18h-20h
  5: [7, 9], // Sexta-feira: 7h-9h
  6: [0, 0],
};

function calcularDuracao(
  distanciaKm: number,
  horario: number,
  dia: diaSemana
): number {
  let duracaoBase = distanciaKm * 5; // Duração base: 5 minutos por km
  if (horario >= horariosPico[dia][0] && horario <= horariosPico[dia][1]) {
    duracaoBase *= 1.5; // Aumenta a duração em 50% durante horário de pico
  }
  return Math.floor(duracaoBase);
}

const horasPorDia = [8, 0, 5, 5, 7, 8, 9]; // Index 0 represents Sunday

const taxasHora = [
  25.0, // Domingo: taxa de R$ 25,00 por hora
  15.0, // Segunda-feira: taxa de R$ 15,00 por hora
  22.5, // Terça-feira: taxa de R$ 22,50 por hora
  20.0, // Quarta-feira: taxa de R$ 20,00 por hora
  28.0, // Quinta-feira: taxa de R$ 28,00 por hora
  25.0, // Sexta-feira: taxa de R$ 25,00 por hora
  22.5, // Sabado: taxa de R$ 22,50 por hora
];

function calcularTaxaHoraria(
  diaSemana: number,
  diaMes: number,
  horario: number
): number {
  let taxaBase = taxasHora[diaSemana];
  if (diaMes > 15) {
    taxaBase *= 1.1; // Aumenta a taxa em 10% na segunda quinzena do mês
  }
  if (horario >= 18 || horario < 6) {
    taxaBase *= 1.2; // Aumenta a taxa em 20% durante a noite (das 18h às 6h)
  }
  return taxaBase;
}

function gerarObjetoCorrida(
  timestampInicio: number,
  distancia: number,
  duracao: number,
  taxaHora: number
): Corrida {
  return {
    // Valor da corrida: R$ 2,50 por km + Valor da Hora * Duração
    fare: Math.round((distancia * 2.5 + (taxaHora / 60) * duracao) * 100) / 100,
    dropoff: {
      timestamp: timestampInicio + duracao * 60,
    },
    vehicle_id: "<ID>",
    distance: distancia,
    start_city: {
      latitude: -23.5505,
      display_name: "São Paulo, SP",
      longitude: -46.6333,
    },
    status_changes: [
      {
        status: "accepted",
        timestamp: timestampInicio,
      },
      {
        status: "driver_arrived",
        timestamp: timestampInicio + 60,
      },
      {
        status: "trip_began",
        timestamp: timestampInicio + 120,
      },
      {
        status: "completed",
        timestamp: timestampInicio + duracao,
      },
    ],
    pickup: {
      timestamp: timestampInicio + 120,
    },
    driver_id: "<ID>",
    status: "completed",
    duration: duracao * 60,
    trip_id: uuid(),
    currency_code: "BRL",
  };
}

function gerarObjetoPagamento(corrida: Corrida): Pagamento | null {
  if (corrida.status !== "completed") {
    return null;
  }

  const pagamento: Pagamento = {
    payment_id: "<ID>",
    category: "fare",
    event_time: corrida.dropoff.timestamp! + 3600, // Simula o pagamento uma hora após o término da corrida
    trip_id: corrida.trip_id,
    cash_collected: 0,
    amount: corrida.fare,
    driver_id: "<ID>",
    breakdown: {
      other: 0,
      toll: 0,
      service_fee: -0.2 * corrida.fare, // Taxa de serviço de 20% sobre o valor da corrida
    },
    rider_fees: {
      split_fare: 0,
    },
    partner_id: "<ID>",
    currency_code: "BRL",
  };

  return pagamento;
}

export async function GET(request: Request) {
  const listaCorridas: Corrida[] = [];
  const listaPagamentos: Pagamento[] = [];

  for (let dia = 1; dia <= 30; dia++) {
    const currentDate = new Date(2023, 3, dia);
    const weekDay = currentDate.getDay() as diaSemana;
    // Horas trabalhadas por dia da semana
    const horaTrabalho = horasPorDia[weekDay];
    // Inicio - Horario aleatório a partir das 10h00
    const horarioInicial = Math.floor(getRandomFloat(10, 24 - horaTrabalho));

    // Duração total em minutos
    let duracaoTotal = 0;
    while (duracaoTotal < horaTrabalho * 60) {
      const minutosHoraInicio = horarioInicial * 60 + duracaoTotal;
      // Hora de início com intervalo máximo de 10 minutos
      const minutos = Math.floor(
        getRandomFloat(minutosHoraInicio, minutosHoraInicio + 10)
      );
      const diferencaMinutosHoraInicio = minutos - minutosHoraInicio;
      const dateInicio = new Date(currentDate);
      dateInicio.setMinutes(minutos);
      const timestampInicio = Math.floor(dateInicio.getTime() / 1000);

      if (Math.random() < 0.2) {
        const corridaCancelada: Corrida = {
          vehicle_id: "<ID>",
          distance: null,
          start_city: {
            latitude: -23.5505,
            display_name: "São Paulo, SP",
            longitude: -46.6333,
          },
          pickup: {
            timestamp: null,
          },
          driver_id: "<ID>",
          trip_id: uuid(),
          currency_code: "BRL",
          fare: 0,
          dropoff: {
            timestamp: null,
          },
          status_changes: [
            {
              status: "accepted",
              timestamp: timestampInicio,
            },
            {
              status: "rider_canceled",
              timestamp: timestampInicio + 60,
            },
          ],
          status: "rider_canceled",
          duration: 0,
        };

        duracaoTotal += 1 + diferencaMinutosHoraInicio;
        listaCorridas.push(corridaCancelada);
      } else {
        const taxaHora = calcularTaxaHoraria(
          weekDay,
          dia,
          dateInicio.getHours()
        );
        // Distância aleatória entre 2 e 10 km
        const distancia = getRandomFloat(2, 10);
        // Duraçao da corrida em minutos
        const duracao = calcularDuracao(distancia, minutos, weekDay);
        let corrida = gerarObjetoCorrida(
          timestampInicio,
          distancia,
          duracao,
          taxaHora
        );

        duracaoTotal += duracao + diferencaMinutosHoraInicio;
        listaCorridas.push(corrida);

        const pagamento = gerarObjetoPagamento(corrida);
        if (pagamento) {
          listaPagamentos.push(pagamento);
        }
      }
    }
  }

  return NextResponse.json({
    corridas: listaCorridas,
    pagamentos: listaPagamentos,
  });
}
