import clsx from "clsx";

type TStatBlockProps = {
  color: "yellow" | "blue" | "silver";
  heading: string;
  value: number;
};

export default function StatBlock({ color, heading, value }: TStatBlockProps) {
  const colors = {
    yellow: "bg-yellow-200",
    blue: "bg-blue-200",
    silver: "bg-silver-200",
  };

  return (
    <li className={clsx("rounded-2xl py-3 text-center", colors[color])}>
      <p className="mobile:text-sm text-xs"> {heading} </p>
      <span className="mobile:text-2xl text-xl font-bold"> {value} </span>
    </li>
  );
}
