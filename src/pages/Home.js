import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = ({ setTeams }) => {
  const [teamHome, setTeamHome] = useState("");
  const [teamVisitor, setTeamVisitor] = useState("");
  const [innings, setInnings] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const formHandler = (event) => {
    event.preventDefault();
    if (!isComplete) return null;
    setTeams(teamHome, teamVisitor, innings);
  };

  useEffect(() => {
    if (teamHome !== "" && teamVisitor !== "" && innings > 0) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [teamHome, teamVisitor, innings]);

  const formatText = (str) => {
    str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
  } 

  return (
    <div className="form-home">
      <form onSubmit={formHandler}>
        <h2>Ingresa los equipos</h2>
        <label htmlFor="home">
          <span>Casa</span>
          <input
            type="text"
            name="home"
            id="home"
            value={teamHome}
            onChange={(e) => setTeamHome(formatText(e.target.value))}
            autoComplete="off"
          />
        </label>
        <label htmlFor="visitors">
          <span>Visitantes</span>
          <input
            type="text"
            name="visitors"
            id="visitors"
            value={teamVisitor}
            onChange={(e) => setTeamVisitor(formatText(e.target.value))}
            autoComplete="off"
          />
        </label>
        <label htmlFor="innings">
          <span>¿Cuantas entradas?</span>
          <input
            type="number"
            name="innings"
            id="innings"
            value={innings}
            onChange={(e) => setInnings(e.target.value)}
            autoComplete="off"
          />
        </label>
        <button type="submit" className={`${!isComplete && "blocked"}`}>
          Play
        </button>
      </form>
    </div>
  );
};

export default Home;
