import * as d3 from "d3";

interface BarGeneratorOptions {
  yBar: (i: number) => number;
  bins: d3.Bin<number, number>[];
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  color: string;
  gap: number;
  tooltip: (i: number) => string;
}

export function barGenerator(
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
  { yBar, bins, xScale, yScale, color, gap, tooltip }: BarGeneratorOptions
) {
  const YBins = Array.from(bins, (I) => d3.sum(I, (i) => yBar(i)));

  const barWidth = (b: d3.Bin<number, number>) =>
    Math.max(0, xScale(b.x1!) - xScale(b.x0!) - gap);
  const barHeight = (b: d3.Bin<number, number>, i: number) =>
    yScale(0) - yScale(YBins[i]);

  const bax_x = (b: d3.Bin<number, number>) => xScale(b.x0!) - barWidth(b) / 2;
  const bar_y = (b: d3.Bin<number, number>, i: number) => yScale(YBins[i]);

  // Barras
  svg
    .append("g")
    .attr("fill", color)
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", bax_x)
    .attr("width", barWidth)
    .attr("y", bar_y)
    .attr("height", barHeight)
    .append("title")
    .text((d, i) => tooltip(i));
}
