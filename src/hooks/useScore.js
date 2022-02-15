import { useReducer, useEffect, useCallback } from 'react'

const SET_TEAMS = "SET_TEAMS",
  RESET = "RESET",
  SET_SAVED_GAME = "SET_SAVED_GAME",
  ADD_RUN = "ADD_RUN",
  REST_RUN = "REST_RUN",
  SWITCH_TURN_AT_BAT = "SWITCH_TURN_AT_BAT",
  ADD_INNING = "ADD_INNING",
  ADD_TO_REGISTER = "ADD_TO_REGISTER",
  UPDATE_TO_REGISTER = "  UPDATE_TO_REGISTER",
  SET_WINNER = 'SET_WINNER';

const defaultState = {
  inning: 1,
  limitInnings: 0,
  turnAtBat: "visitor",
  teams: {},
  playing: false,
  scores: [
    {
      home: 0,
      visitor: 0,
    },
  ],
  winner: null
}

const scoreReducer = (state, action) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        playing: true,
        limitInnings: action.limitInnings
      };
    case ADD_RUN:
      return {
        ...state,
        teams: {
          ...state.teams,
          [state.turnAtBat]: {
            ...state.teams[state.turnAtBat],
            score: state.teams[state.turnAtBat].score + 1,
          },
        },
      };
    case REST_RUN:
      if (state.teams[state.turnAtBat].score <= 0) return state;
      return {
        ...state,
        teams: {
          ...state.teams,
          [state.turnAtBat]: {
            ...state.teams[state.turnAtBat],
            score: state.teams[state.turnAtBat].score - 1,
          },
        },
      };
    case SET_SAVED_GAME:
      return action.payload;
    case RESET:
      return defaultState;
    case SWITCH_TURN_AT_BAT:
      return {
        ...state,
        turnAtBat: action.payload,
      };
    case ADD_INNING:
      return {
        ...state,
        inning: action.payload,
      };
    case UPDATE_TO_REGISTER:
      let newScore = [...state.scores];
      newScore.map((item, index) => {
        if (index === state.inning - 1) {
          item[state.turnAtBat] = action.runs;
        }
        return item;
      });
      return {
        ...state,
        scores: newScore,
      };
    case ADD_TO_REGISTER:
      let newScoreToAdd = [...state.scores]

      if(newScoreToAdd.length < state.inning){
        newScoreToAdd.push({
          home: 0,
          visitor: 0,
        })
      }
      return {
        ...state,
        scores: newScoreToAdd
      };
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner
      }
    default:
      return state;
  }
};

const useScore = () => {

  const [state, dispatch] = useReducer(scoreReducer, defaultState);

  const setTeams = (teamHome, teamVisitor, limitInnings) => {
    dispatch({
      type: SET_TEAMS,
      payload: {
        home: {
          name: teamHome,
          score: 0,
        },
        visitor: {
          name: teamVisitor,
          score: 0,
        },
      },
      limitInnings
    });
  };

  const addRun = () => {
    dispatch({ type: ADD_RUN });
    dispatch({
      type: UPDATE_TO_REGISTER,
      runs: state.scores[state.inning - 1][state.turnAtBat] + 1,
    });
  };

  const restRun = () => {
    dispatch({ type: REST_RUN })
    dispatch({
      type: UPDATE_TO_REGISTER,
      runs: state.scores[state.inning - 1][state.turnAtBat] - 1,
    });
  }

  const switchTurnAtBat = () => {
    
    if (state.turnAtBat === "visitor") {
      if(state.inning >= +state.limitInnings && state.teams.home.score > state.teams.visitor.score){
        dispatch({ 
          type: SET_WINNER,
          winner: state.teams.home.name
         });
        return;
      }
      dispatch({ type: SWITCH_TURN_AT_BAT, payload: "home" });
    } else {
      if(state.inning >= +state.limitInnings && state.teams.home.score !== state.teams.visitor.score){
        dispatch({ 
          type: SET_WINNER,
          winner: state.teams.home.score > state.teams.visitor.score ? state.teams.home.name : state.teams.visitor.name
         });
      }else{
        dispatch({ type: SWITCH_TURN_AT_BAT, payload: "visitor" });
        dispatch({ type: ADD_INNING, payload: state.inning + 1 });
        dispatch({ type: ADD_TO_REGISTER, payload:{
          home: 0,
          visitor: 0,
        } });
        
      }
    }
  };

  const resetGame = () => {
    dispatch({ type: RESET });
    localStorage.removeItem("game");
  };

  useEffect(() => {
    if (state && state.playing) {
      localStorage.setItem("game", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    let game = localStorage.getItem("game");
    game = JSON.parse(game);
    if (game) {
      dispatch({ type: SET_SAVED_GAME, payload: game });
    }
  }, []);


  return { stateScore: state, setTeams, addRun, restRun, switchTurnAtBat, resetGame}
}

export default useScore