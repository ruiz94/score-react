import "./App.css";

import Home from "./pages/Home";
import Game from "./pages/Game";
import Winner from "./components/Winner";

import useScore from "./hooks/useScore";

function App() {
  const { stateScore, setTeams, addRun, restRun, switchTurnAtBat, resetGame } =
    useScore();

  return (
    <div className="App">
      {stateScore && stateScore.playing ? (
        <div className="field">
          {stateScore.winner ? (
            <Winner winner={stateScore.winner} teams={stateScore.teams} scores={stateScore.scores}/>
          ) : (
            <Game
              {...stateScore}
              handleAddRun={addRun}
              handleRestRun={restRun}
              switchTurnAtBat={switchTurnAtBat}
            />
          )}
          <button onClick={resetGame} className="btn-reset">Nuevo Juego</button>
        </div>
      ) : (
        <Home setTeams={setTeams} />
      )}
    </div>
  );
}

export default App;
