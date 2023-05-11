"use client";
import { useEffect, useRef } from "react";
import { graphGenerator } from "../graph";

interface Data {
  day: number;
  arrecadado: number;
  viagens: number;
  horas: number;
}

export function GraphWeek({ data }: { data: Data[] }) {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graphElement = graphRef.current;

    const node = graphGenerator(data, {
      x: (d: Data) => d.day,
      yLabel: { left: "R$ Arrecadado", right: "Nº Viagens" },
      xLabel: "Dias da Semana",
      width: graphElement?.offsetWidth!,
      height: 300,
      tooltip: (i) =>
        `${data[i].viagens} Viages\nR$ ${data[i].arrecadado}\n${data[i].horas} Hrs`,
      y: [
        {
          fn: (d: Data) => d.viagens,
          type: "bar",
          gap: 8,
          color: "#ffdb0d",
        },
        {
          fn: (d: Data) => d.arrecadado,
          defined: (x: number, y: number) => !isNaN(x) && !isNaN(y),
          type: "line",
          stroke: {
            color: "#ffa500",
          },
        },
        {
          fn: (d: Data) => d.horas,
          defined: (x: number, y: number) => !isNaN(x) && !isNaN(y),
          type: "line",
          stroke: {
            color: "#ff6b0d",
          },
        },
      ],
    });
    if (node) {
      graphElement?.appendChild(node);
      graphElement?.classList.add("min-h-0");
    }

    return () => {
      while (graphElement?.lastChild) {
        graphElement.removeChild(graphElement.lastChild);
      }
    };
  }, [data]);

  return <div ref={graphRef} className="min-h-[300px]" />;
}
