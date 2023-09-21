type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
};

const Small = ({ children, className }: Props) => {
  return <h1 className={`text-xs text-gray-700 ${className}`}>{children}</h1>;
};

export default Small;
