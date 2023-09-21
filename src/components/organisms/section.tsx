type Props = {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
};

const Section = ({ children, className }: Props) => {
  return <section className={`mt-3 ${className}`}>{children}</section>;
};

export default Section;
