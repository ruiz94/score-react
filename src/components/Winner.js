import React from "react";

import './Winner.css';
import Table from "../components/Table";

const Winner = ({ winner, teams, scores }) => {

  const teamsNames = {
    home: teams.home.name,
    visitor: teams.visitor.name
  }
  
  return (
    <div className="winner">
      <div className="name-winner">
        Ganador: <span>{winner}</span>
      </div>

      <div className="score">
        <div className="item item-1">
          <div className="team-name">{teams.home.name}</div>
          <div className="team-score">{teams.home.score}</div>
          <span className="team-label">Casa</span>
        </div>
        <div className="item">
          <div className="team-name">{teams.visitor.name}</div>
          <div className="team-score">{teams.visitor.score}</div>
          <span className="team-label">Visitante</span>
        </div>
      </div>
      <Table scores={scores} teamsNames={teamsNames}/>
    </div>
  );
};

export default Winner;
