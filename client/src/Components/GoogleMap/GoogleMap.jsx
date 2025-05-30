import "./GoogleMap.css";
import { useState } from "react";

const GoogleMap = () => {
  const [location, setLocation] = useState("");
  const [mapLocation, setMapLocation] = useState("kochi");
  const onSearch = () => {
    setMapLocation(location);
  }
  return (
    <>
      <input
        type="text"
        value={location}
        placeholder="Enter your location"
        name="location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={onSearch}> Search</button>
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            width="793"
            height="467"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${mapLocation}&t=&z=9&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="Google Map"
          ></iframe>
          <a
            href="https://123movies-i.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            123movies
          </a>
          <br />
          <style>{/* Add any necessary styles here */}</style>
          <a
            href="https://www.embedgooglemap.net"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </>
  );
};

export default GoogleMap;
