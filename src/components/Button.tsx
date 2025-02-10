import clsx from "clsx";

type TButtonColor = "yellow" | "blue" | "gray";

type TButtonProps = {
  children: React.ReactNode;
  color: TButtonColor;
  className?: string;
};

export default function Button({
  children,
  color = "yellow",
  className,
}: TButtonProps) {
  const colorStyles = {
    yellow:
      "inset-shadow-yellow-lg bg-yellow-200 focus:bg-yellow-100 hover:bg-yellow-100",
    blue: "inset-shadow-blue-lg bg-blue-200 focus:bg-blue-100 hover:bg-blue-100",
    gray: "inset-shadow-gray-lg bg-gray-200 focus:bg-gray-100 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(
        "cursor-pointer font-bold",
        className,
        colorStyles[color],
      )}
    >
      {children}
    </button>
  );
}
