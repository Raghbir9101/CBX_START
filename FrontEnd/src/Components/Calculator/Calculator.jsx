import React, { useEffect, useState } from "react";
import "./calculator.css";
import { ElementWrapper } from "../Page/Page";

const App = ({ provided, item, handleDelete, onChange, data, pageMetaData }) => {
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(data?.collapsed);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEqual = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleSqrt = () => {
    try {
      setInput(Math.sqrt(eval(input)).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handlePercentage = () => {
    try {
      setInput((eval(input) / 100).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  useEffect(() => {
    onChange({ collapsed });
  }, [collapsed]);

  return (
    <ElementWrapper editable={(pageMetaData.role == "OWNER" || pageMetaData.role == "EDITOR")}   handleDelete={handleDelete} provided={provided} item={item} collapsed={data?.collapsed} setCollapsed={setCollapsed}>
      <div className="calculator">
        <div className="display">{input || "0"}</div>
        <div className="buttons">
          <button className="clearBtn" onClick={handleClear}>
            C
          </button>
          <button className="cBtn" onClick={handlePercentage}>
            %
          </button>
          <button className="cBtn" onClick={handleSqrt}>
            √
          </button>
          <button className="cBtn" onClick={() => handleClick("/")}>
            /
          </button>
          <button style={{color:"black"}} onClick={() => handleClick("7")}>7</button>
          <button style={{color:"black"}} onClick={() => handleClick("8")}>8</button>
          <button style={{color:"black"}} onClick={() => handleClick("9")}>9</button>
          <button style={{color:"black"}} onClick={() => handleClick("*")}>*</button>
          <button style={{color:"black"}} onClick={() => handleClick("4")}>4</button>
          <button style={{color:"black"}} onClick={() => handleClick("5")}>5</button>
          <button style={{color:"black"}} onClick={() => handleClick("6")}>6</button>
          <button style={{color:"black"}} onClick={() => handleClick("-")}>-</button>
          <button style={{color:"black"}} onClick={() => handleClick("1")}>1</button>
          <button style={{color:"black"}} onClick={() => handleClick("2")}>2</button>
          <button style={{color:"black"}} onClick={() => handleClick("3")}>3</button>
          <button style={{color:"black"}} onClick={() => handleClick("+")}>+</button>
          <button style={{color:"black"}} className="zero" onClick={() => handleClick("0")}>
            0
          </button>
          <button style={{color:"black"}} onClick={() => handleClick(".")}>.</button>
          <button className="cBtn" onClick={handleEqual}>
            =
          </button>
        </div>
      </div>
    </ElementWrapper>
  );
};

export default App;
