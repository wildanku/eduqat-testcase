type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div className={`bg-white p-3 border rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
