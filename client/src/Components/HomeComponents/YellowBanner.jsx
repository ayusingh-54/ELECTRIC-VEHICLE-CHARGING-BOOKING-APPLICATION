import { BsFillCarFrontFill } from "react-icons/bs";
import { MdElectricCar } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import "./styles/yellowBanner.css";
const YellowBanner = () => {
  const isTab = useMediaQuery({
    query: "(max-width: 1008px)",
  });
  return (
    <div className="yellow-banner banner-animation">
      <div>500+ Users activated</div>
      <BsFillCarFrontFill />
      <div>1000+ EVs registered</div>
      {!isTab && (
        <>
          <MdElectricCar />
          <div>250+ Charging stations</div>
          <BsFillCarFrontFill />
          <div>1500 Charging completed</div>
          <MdElectricCar />
        </>
      )}
    </div>
  );
};
export default YellowBanner;
