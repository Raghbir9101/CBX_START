// import React, { useState } from "react";
// import "./calculator.css";

// const Calculator = () => {
//   const [input, setInput] = useState("");

//   const handleClick = (value) => {
//     setInput(input + value);
//   };

//   const handleClear = () => {
//     setInput("");
//   };

//   const handleEqual = () => {
//     try {
//       setInput(eval(input).toString());
//     } catch (error) {
//       setInput("Error");
//     }
//   };

//   return (
//     <div className="calculator">
//       <div className="display">{input || "0"}</div>
//       <div className="buttons">
//         <button onClick={handleClear}>C</button>
//         <button onClick={() => handleClick("/")}>/</button>
//         <button onClick={() => handleClick("*")}>*</button>
//         <button onClick={() => handleClick("-")}>-</button>
//         <button onClick={() => handleClick("7")}>7</button>
//         <button onClick={() => handleClick("8")}>8</button>
//         <button onClick={() => handleClick("9")}>9</button>
//         <button onClick={() => handleClick("+")}>+</button>
//         <button onClick={() => handleClick("4")}>4</button>
//         <button onClick={() => handleClick("5")}>5</button>
//         <button onClick={() => handleClick("6")}>6</button>
//         <button onClick={handleEqual}>=</button>
//         <button onClick={() => handleClick("1")}>1</button>
//         <button onClick={() => handleClick("2")}>2</button>
//         <button onClick={() => handleClick("3")}>3</button>
//         <button className="zero" onClick={() => handleClick("0")}>
//           0
//         </button>
//         <button onClick={() => handleClick(".")}>.</button>
//       </div>
//     </div>
//   );
// };

// export default Calculator;


import React, { useState } from "react";
import "./calculator.css";

const App = () => {
  const [input, setInput] = useState("");

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

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handlePercentage}>%</button>
        <button onClick={handleSqrt}>√</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>
        <button className="zero" onClick={() => handleClick("0")}>
          0
        </button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};

export default App;
