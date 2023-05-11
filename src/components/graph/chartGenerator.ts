import * as d3 from "d3";

interface ChartGeneratorProps {
  height: number;
  width: number;
  margin: {
    mb: number;
    ml: number;
    mr: number;
    mt: number;
  };
  xLabel: string;
  yLabel: {
    left: string;
    right: string;
  };
  xTicks: number;
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export function chartGenerator({
  height,
  width,
  margin,
  xLabel,
  yLabel,
  xTicks,
  xScale,
  yScale,
}: ChartGeneratorProps) {
  const xAxis = d3.axisBottom(xScale).ticks(xTicks);
  const yAxis = d3.axisLeft(yScale);

  const svg = d3
    .create("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Eixo X
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.mb})`)
    .call(xAxis)
    .call((g) =>
      g
        .append("text")
        .attr("x", width - margin.mr)
        .attr("y", 30)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(xLabel)
    );

  // Eixo Y
  svg
    .append("g")
    .attr("transform", `translate(${margin.ml},0)`)
    .call(yAxis)
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - margin.ml - margin.mr)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -margin.ml)
        .attr("y", 15)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel.left)
    );

  if (yLabel.right) {
    const yAxisRight = d3.axisRight(yScale);
    svg
      .append("g")
      .attr("transform", `translate(${width - margin.mr},0)`)
      .call(yAxisRight)
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.ml)
          .attr("y", 15)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel.right)
      );
  }

  return svg;
}
