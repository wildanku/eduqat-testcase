import ArrowLeft from "../atoms/icons/arrow-left";
import Heading from "../atoms/typography/heading";
import Title from "../atoms/typography/title";
import Container from "./container";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-lg">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="pr-4 border-r py-3">
            <ArrowLeft />
          </div>
          <div className="pl-3">
            <Heading>Event</Heading>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
