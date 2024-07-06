import React from "react";
import ReactDOM from "react-dom";
import AnalogClock from "analog-clock-react";

const MyClock = () => {
  const options = {
    width: "100%",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#f0f0f0",
    centerColor: "#ffffff",
    centerBorderColor: "#000000",
    handColors: {
      second: "#ff0000",
      minute: "#000000",
      hour: "#000000",
    },
    showNumbers: true,
    numbersColor: "#000000",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "200px",
        margin: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          paddingTop: "100%",
          position: "relative",
          top: "25px",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <AnalogClock {...options} />
        </div>
      </div>
    </div>
  );
};

export default MyClock;
