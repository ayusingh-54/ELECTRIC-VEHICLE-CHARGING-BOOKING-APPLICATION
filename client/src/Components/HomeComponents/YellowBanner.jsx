import { BsFillCarFrontFill } from "react-icons/bs";
import { MdElectricCar } from "react-icons/md";
import { FaChargingStation, FaUsers, FaBolt } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import "./styles/yellowBanner.css";

const YellowBanner = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    users: 0,
    evs: 0,
    stations: 0,
    charging: 0,
  });

  const targetNumbers = {
    users: 500,
    evs: 1000,
    stations: 250,
    charging: 1500,
  };

  const isTab = useMediaQuery({
    query: "(max-width: 1008px)",
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const incrementValues = {
      users: targetNumbers.users / steps,
      evs: targetNumbers.evs / steps,
      stations: targetNumbers.stations / steps,
      charging: targetNumbers.charging / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedNumbers({
        users: Math.min(
          Math.floor(incrementValues.users * currentStep),
          targetNumbers.users
        ),
        evs: Math.min(
          Math.floor(incrementValues.evs * currentStep),
          targetNumbers.evs
        ),
        stations: Math.min(
          Math.floor(incrementValues.stations * currentStep),
          targetNumbers.stations
        ),
        charging: Math.min(
          Math.floor(incrementValues.charging * currentStep),
          targetNumbers.charging
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="yellow-banner banner-animation">
      <div>
        <FaUsers />
        <span>{animatedNumbers.users}+ Users Activated</span>
      </div>

      <div>
        <BsFillCarFrontFill />
        <span>{animatedNumbers.evs}+ EVs Registered</span>
      </div>

      {!isTab && (
        <>
          <div>
            <FaChargingStation />
            <span>{animatedNumbers.stations}+ Charging Stations</span>
          </div>

          <div>
            <FaBolt />
            <span>{animatedNumbers.charging}+ Sessions Completed</span>
          </div>
        </>
      )}
    </div>
  );
};

export default YellowBanner;
