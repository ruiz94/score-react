import React from "react";
import './Game.css';

import Controls from "../components/Controls";
import Table from "../components/Table";

const Game = ({ inning, turnAtBat, teams, scores, handleAddRun, handleRestRun, switchTurnAtBat }) => {

  const teamsNames = {
    home: teams.home.name,
    visitor: teams.visitor.name
  }

  return (
    <div className="game">
      <div className="head Card">
        <div className="inning">{inning}</div>
        <div className="teams">
          <div className={`team-item team-1 ${turnAtBat === 'home' && 'turnAtBat'}`}>
            <div className="team-score">{teams.home.score}</div>
            <div className="team-name">{teams.home.name}</div>
            <div className="label">Casa</div>
          </div>
          <div className={`team-item team-2 ${turnAtBat === 'visitor' && 'turnAtBat'}`}>
            <div className="team-score">{teams.visitor.score}</div>
            <div className="team-name">{teams.visitor.name}</div>
            <div className="label">Visitantes</div>
          </div>
        </div>
      </div>
      <Controls handleAddRun={handleAddRun} handleRestRun={handleRestRun} switchTurnAtBat={switchTurnAtBat}/>
      <Table scores={scores} teamsNames={teamsNames}/>
    </div>
  );
};

export default Game;
