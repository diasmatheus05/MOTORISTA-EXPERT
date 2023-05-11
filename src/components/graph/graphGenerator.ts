import * as d3 from "d3";

import { barGenerator, chartGenerator, lineGenerator } from ".";

interface YOptions<D> {
  fn: (d: D) => number;
  defined?: (x: any, ...y: any[]) => boolean;
  type: "line" | "bar";
  gap?: number;
  color?: string;
  stroke?: {
    color?: string;
    linecap?: string;
    linejoin?: string;
    width?: number;
    opacity?: number;
  };
}

interface Options<D> {
  margin?: {
    mb: number;
    ml: number;
    mr: number;
    mt: number;
  };
  width: number;
  height: number;
  xLabel?: string;
  yLabel?: {
    left?: string;
    right?: string;
  };
  x: (d: D) => number;
  y: YOptions<D>[];
  tooltip: (i: number) => string;
}

export function graphGenerator<D>(
  data: D[],
  {
    margin = {
      mb: 40, // Margin Bottom, in pixels
      mr: 40, // Margin Right, in pixels
      mt: 30, // Margin Top, in pixels
      ml: 40, // Margin Left, in pixels
    },
    width, // outer width, in pixels
    height, // outer height, in pixels
    xLabel = "", // a label for the x-axis
    yLabel = {
      left: "", // a label for the left y-axis
      right: "", // a label for the right y-axis
    },
    x,
    y,
    tooltip,
  }: Options<D>
) {
  const { X, Y, xScale, yScale } = computeValues(
    data,
    x,
    y,
    height,
    width,
    margin
  );

  const svg = chartGenerator({
    height,
    width,
    margin,
    xLabel,
    xTicks: X.length,
    xScale,
    yLabel: {
      left: yLabel.left ?? "",
      right: yLabel.right ?? "",
    },
    yScale,
  });

  Y.forEach((value) => {
    if (value.bins) {
      barGenerator(svg, {
        bins: value.bins,
        xScale,
        yScale,
        yBar: (i) => value.Y[i],
        color: value.color ?? "currentColor",
        gap: value.gap ?? 1,
        tooltip: tooltip,
      });
    } else {
      lineGenerator(svg, {
        X,
        Y: value.Y,
        defined: value.yDefined!,
        xLine: (i) => xScale(X[i]),
        yLine: (i) => yScale(value.Y[i]),
        stroke: {
          color: value.stroke?.color ?? "currentColor",
          linecap: value.stroke?.linecap ?? "round",
          linejoin: value.stroke?.linejoin ?? "round",
          width: value.stroke?.width ?? 1.5,
          opacity: value.stroke?.opacity ?? 1,
        },
      });
    }
  });

  return svg.node();
}

function computeValues<D>(
  data: D[],
  xValue: (d: D) => number,
  yValues: YOptions<D>[],
  height: number,
  width: number,
  margin: {
    mb: number;
    ml: number;
    mr: number;
    mt: number;
  }
) {
  const X = d3.map(data, xValue);
  const xDomain = [d3.min(X)!, d3.max(X)!];
  const xRange = [margin.ml, width - margin.mr];

  const yRange = [height - margin.mb, margin.mt];
  const yDomain = [99999999, 0];

  const values_y = yValues.map((value) => {
    const Y = d3.map(data, value.fn);

    yDomain[0] = d3.min([...Y, yDomain[0]])!;
    yDomain[1] = d3.max([...Y, yDomain[1]])!;

    let bins = undefined;
    if (value.type === "bar") {
      yDomain[0] = 0;
      const I = d3.range(X.length);
      bins = d3
        .bin()
        .thresholds(Y.length)
        .value((i) => X[i])(I);

      const barWidth = (width - value.gap! * bins.length) / bins.length;
      xRange[0] = margin.ml + barWidth / 2;
      xRange[1] = width - margin.mr - barWidth / 2;
    }

    let yDefined: boolean[] | undefined = undefined;
    if (value.type === "line") {
      yDefined = d3.map(data, (d: D, i: number) =>
        value.defined ? value.defined(X[i], Y[i]) : false
      );
    }

    return {
      Y,
      bins,
      yDefined,
      ...value,
    };
  });

  const xScale = d3.scaleLinear(xDomain, xRange);
  const yScale = d3.scaleLinear(yDomain, yRange);

  return {
    X,
    Y: values_y,
    xScale,
    yScale,
  };
}
