import React, { useState } from "react";

import "./Controls.css";

import IconMinus from "../assets/minus.png";
import IconPlus from "../assets/plus.png";

const Controls = ({ handleAddRun, handleRestRun, switchTurnAtBat }) => {
  const [outs, setOuts] = useState(0);

  const addOuts = () => {
    setOuts((prev) => {
      const outs = prev + 1;
      if (outs === 3) {
        switchTurnAtBat();
        return 0;
      }
      return outs;
    });
  };

  return (
    <div className="Card controls">
      <div className="outs">
        <span>{outs} outs</span>
        <button onClick={addOuts} className="add-out">
          Agregar Out
        </button>
      </div>
      <div className="divider"></div>
      <div className="runs">
        <div className="runs-title">Agregar o quitar carreras</div>
        <div className="btns">
          <img src={IconMinus} alt="minus" onClick={handleRestRun} />
          <img src={IconPlus} alt="plus" onClick={handleAddRun} />
        </div>
      </div>
    </div>
  );
};

export default Controls;
