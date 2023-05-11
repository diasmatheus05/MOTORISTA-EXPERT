export function Info({
  title,
  subTitle,
  info,
  description,
  center = false,
}: {
  title: string;
  subTitle?: string;
  info: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div>
      <div className={`flex flex-col items-${center ? "center" : "start"}`}>
        <h6 className="font-semibold text-base">{title}</h6>
        {subTitle && <h6 className="font-light text-base">{subTitle}</h6>}
      </div>
      <div className={`flex gap-1 justify-${center ? "center" : "start"}`}>
        <p className="font-bold text-2xl">{info}</p>
        {description && <p className="font-light text-2xl">{description}</p>}
      </div>
    </div>
  );
}
