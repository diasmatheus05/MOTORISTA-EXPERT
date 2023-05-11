import { ReactNode } from "react";

export function Box({
  children,
  cols,
  rows,
  title,
}: {
  children: ReactNode;
  cols: number;
  rows?: number;
  title?: string;
}) {
  return (
    <div
      className={`w-full p-2 border-2 border-secondary-100 rounded-2xl col-span-${cols} row-span-${rows}`}
      style={{
        gridColumn: `span ${cols} / span ${cols}`,
        gridRow: `span ${rows} / span ${rows}`,
      }}
    >
      {title && <p className="font-semibold text-xs mb-1">{title}</p>}
      {children}
    </div>
  );
}
