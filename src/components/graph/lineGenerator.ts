import * as d3 from "d3";

interface LineGeneratorOptions {
  X: number[];
  Y: number[];
  defined: boolean[];
  xLine: (i: number) => number;
  yLine: (i: number) => number;
  stroke: {
    color: string;
    linecap: string;
    linejoin: string;
    width: number;
    opacity: number;
  };
}

export function lineGenerator(
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
  { X, Y, defined, xLine, yLine, stroke }: LineGeneratorOptions
) {
  const data = X.map((x, i) => [x, Y[i]]) as [number, number][];

  // Construct a line generator.
  const line = d3
    .line()
    .defined((d, i) => defined[i])
    .curve(d3.curveLinear)
    .x((d, i) => xLine(i))
    .y((d, i) => yLine(i));

  // Linha
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", stroke.color)
    .attr("stroke-width", stroke.width)
    .attr("stroke-linecap", stroke.linecap)
    .attr("stroke-linejoin", stroke.linejoin)
    .attr("stroke-opacity", stroke.opacity)
    .attr("d", line(data));
}
