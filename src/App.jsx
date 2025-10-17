import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => setInput(input + value);
  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult("Error");
    }
  };
  const clear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="display">
        <input type="text" value={input} readOnly />
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {"1234567890+-*/.".split("").map((item) => (
          <button key={item} onClick={() => handleClick(item)}>{item}</button>
        ))}
        <button onClick={calculate}>=</button>
        <button onClick={clear}>C</button>
      </div>
    </div>
  );
}

export default App;
