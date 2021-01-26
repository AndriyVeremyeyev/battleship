import { generateFreeCells, generateShipsStatus } from "../database";

const basicInitialState = {
  attempts: 0,
  killedCells: generateFreeCells({}, false),
  shipsStatus: generateShipsStatus({}),
  shipsCells: generateFreeCells({}),
  shipsShadowsCells: generateFreeCells({}),
  wrongAttempts: generateFreeCells({}, false),
  battleShip: [],
  cruiserFirst: [],
  cruiserSecond: [],
  destroyerFirst: [],
  destroyerSecond: [],
  destroyerThird: [],
  vedetteFirst: [],
  vedetteSecond: [],
  vedetteThird: [],
  vedetteForth: [],
};

const computerInitialState = {
  ...basicInitialState,
  catchedShip: false,
  damagedShip: [],
};

const playerInitialState = {
  ...basicInitialState,
  possibleDirections: generateFreeCells({}, false),
};

const initialState = {
  pageStatus: "startGame",
  legendLineOne: "",
  legendLineTwo: "",
  player: playerInitialState,
  computer: computerInitialState,
  showComputer: false,
  playAgain: false,
  firstTime: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_KILLED_CELLS":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          killedCells: {
            ...state[action.payload.player].killedCells,
            [action.payload.cell]: true,
          },
        },
      };
    case "SET_SHIPS_CELLS":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          shipsCells: {
            ...state[action.payload.player].shipsCells,
            [action.payload.cell]: false,
          },
        },
      };
    case "SET_SHIPS_CELLS_TOTAL":
      return {
        ...state,
        computer: {
          ...state.computer,
          shipsCells: action.payload,
        },
      };
    case "SET_SHIPS_SHADOWS_CELLS":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          shipsShadowsCells: {
            ...state[action.payload.player].shipsShadowsCells,
            [action.payload.cell]: false,
          },
        },
      };
    case "SET_SHIPS_SHADOWS_CELLS_TOTAL":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          shipsShadowsCells: action.payload.obj,
        },
      };
    case "SET_SHIP":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          [action.payload.ship]: [
            ...state[action.payload.player][action.payload.ship],
            ...action.payload.position,
          ],
        },
      };
    case "REMOVE_SHIP_CELL":
      const newArray = state[action.payload.player][action.payload.ship].filter(
        (cell) => cell !== action.payload.cell
      );
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          [action.payload.ship]: newArray,
        },
      };
    case "SET_PAGE_STATUS":
      return {
        ...state,
        pageStatus: action.payload,
      };
    case "SET_LEGEND_LINE_ONE":
      return {
        ...state,
        legendLineOne: action.payload,
      };
    case "SET_LEGEND_LINE_TWO":
      return {
        ...state,
        legendLineTwo: action.payload,
      };
    case "SET_SHOW_COMPUTER":
      return {
        ...state,
        showComputer: !state.showComputer,
      };
    case "SET_SHIPS_STATUS":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          shipsStatus: {
            ...state[action.payload.player].shipsStatus,
            [action.payload.ship]: action.payload.status,
          },
        },
      };
    case "SET_ATTEMPTS":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          attempts: state[action.payload].attempts + 1,
        },
      };
    case "SET_WRONG_ATTEMPTS":
      return {
        ...state,
        [action.payload.player]: {
          ...state[action.payload.player],
          wrongAttempts: {
            ...state[action.payload.player].wrongAttempts,
            [action.payload.attempt]: true,
          },
        },
      };
    case "SET_POSSIBLE_DIRECTIONS":
      return {
        ...state,
        player: {
          ...state.player,
          possibleDirections: {
            ...state.player.possibleDirections,
            [action.payload]: true,
          },
        },
      };
    case "REMOVE_POSSIBLE_DIRECTIONS":
      return {
        ...state,
        player: {
          ...state.player,
          possibleDirections: generateFreeCells({}, false),
        },
      };
    case "REMOVE_SHADOWS":
      return {
        ...state,
        player: {
          ...state.player,
          shipsShadowsCells: generateFreeCells({}),
        },
      };
    case "SET_PLAY_AGAIN":
      return {
        ...state,
        playAgain: action.payload,
      };
    case "SET_FIRST_TIME":
      return {
        ...state,
        firstTime: action.payload,
      };
    case "CLEAR_EVERYTHING":
      return {
        ...state,
        player: playerInitialState,
        computer: computerInitialState,
      };
    // case "SET_CATCHED_SHIP":
    //   return {
    //     ...state,
    //     computer: {
    //       ...state.computer,
    //       catchedShip: action.payload,
    //     },
    //   };
    case "SET_DAMAGED_SHIP":
      return {
        ...state,
        computer: {
          ...state.computer,
          damagedShip: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
