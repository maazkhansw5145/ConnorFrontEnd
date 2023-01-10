import React from "react";
import "./Calculator.css";
import QualBet from "./Variants/QualBet";

function Calculator(props) {
  return (
    <div className="calculator">
      <QualBet {...props} />
    </div>
  );
}

export default Calculator;
