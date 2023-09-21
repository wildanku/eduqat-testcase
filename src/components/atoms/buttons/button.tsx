type Props = {
  children: JSX.Element | JSX.Element[] | string;
  type?: "primary";
  outlined?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  type = "primary",
  size = "md",
  outlined = true,
  className,
  onClick,
}: Props) => {
  return (
    <button
      className={`${size === "sm" && "py-1 px-4"} ${
        size === "md" && "py-2 px-5"
      } ${size === "lg" && "py-3 px-6"} ${size === "xl" && "py-4 px-7"} ${
        type === "primary" &&
        outlined &&
        "border-purple-600 border text-purple-600 hover:text-white hover:bg-purple-600"
      } ${
        type === "primary" &&
        !outlined &&
        "bg-purple-600 text-white hover:bg-purple-700"
      } text-${size} rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
