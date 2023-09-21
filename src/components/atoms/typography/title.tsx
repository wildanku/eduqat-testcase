type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Title = ({ children }: Props) => {
  return <h1 className="text-3xl font-medium">{children}</h1>;
};

export default Title;
