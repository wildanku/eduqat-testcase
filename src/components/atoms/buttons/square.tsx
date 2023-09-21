type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
};

const ButtonSquare = ({ children, className }: Props) => {
  return (
    <button
      className={`rounded-lg w-7 h-7 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonSquare;
