import clsx from "clsx";

type TButtonColor = "yellow" | "blue" | "silver";

type TButtonProps = React.ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  color: TButtonColor;
  className?: string;
};

export default function Button({
  children,
  color = "yellow",
  className,
  ...rest
}: TButtonProps) {
  const colorStyles = {
    yellow:
      "inset-shadow-yellow-lg bg-yellow-200 focus:bg-yellow-100 hover:bg-yellow-100",
    blue: "inset-shadow-blue-lg bg-blue-200 focus:bg-blue-100 hover:bg-blue-100",
    silver:
      "inset-shadow-silver-sm bg-silver-200 focus:bg-silver-100 hover:bg-silver-100",
  };

  return (
    <button
      className={clsx(
        "text-navy-200 cursor-pointer font-bold",
        className,
        colorStyles[color],
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
