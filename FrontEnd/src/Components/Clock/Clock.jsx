import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AnalogClock from "analog-clock-react";
import { ElementWrapper } from "../Page/Page";
import CustomClock from "./CustomClock";
import "./clock.css";

const MyClock = ({
  provided,
  item,
  handleDelete,
  onChange,
  data,
  pageMetaData,
}) => {
  const [collapsed, setCollapsed] = useState(data?.collapsed);
  const options = {
    width: "100%",
    border: true,
    // borderColor: "#2e2e2e",
    borderColor: "#BAC3CF",
    baseColor: "#f0f0f0",
    // baseColor: "transparent",
    centerColor: "#ffffff",
    centerBorderColor: "#000000",

    handColors: {
      second: "#ff0000",
      minute: "#646E82",
      hour: "#646E82",
    },
    showNumbers: true,
    numbersColor: "#000000",
  };
  useEffect(() => {
    onChange({ collapsed });
  }, [collapsed]);

  return (
    <ElementWrapper
      editable={pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR"}
      collapsed={data?.collapsed}
      setCollapsed={setCollapsed}
      handleDelete={handleDelete}
      provided={provided}
      item={item}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "200px",
          margin: "auto",
        }}
      >
        <div
          // className="clock-background"
          style={{
            width: "100%",
            paddingTop: "100%",
            position: "relative",
            top: "25px",
          }}
        >
          {/* <CustomClock /> */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <AnalogClock {...options} />
          </div>
        </div>
      </div>
    </ElementWrapper>
  );
};

export default MyClock;
