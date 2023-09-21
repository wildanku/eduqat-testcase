type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
};

const Paragraph = ({ children, className }: Props) => {
  return <p className={`text-base ${className}`}>{children}</p>;
};

export default Paragraph;
