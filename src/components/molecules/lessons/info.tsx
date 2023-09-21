type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const LessonInfo = ({ children }: Props) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export default LessonInfo;
