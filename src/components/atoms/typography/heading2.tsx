type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Heading2 = ({ children }: Props) => {
  return <h1 className="text-2xl font-medium">{children}</h1>;
};

export default Heading2;
