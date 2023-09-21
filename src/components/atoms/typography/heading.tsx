type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Heading = ({ children }: Props) => {
  return <h1 className="text-lg font-medium">{children}</h1>;
};

export default Heading;
