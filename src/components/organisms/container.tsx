type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={`w-full max-w-screen-2xl p-5 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
