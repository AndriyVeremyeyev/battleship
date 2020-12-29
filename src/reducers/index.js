import { generateFreeCells, generateShipsStatus } from "../database";

const initialState = {
  pageStatus: "startGame",
  legendLineOne: "",
  legendLineTwo: "",
  player: {
    input: false,
    attempts: 0,
    wrongAttempts: generateFreeCells({}, false),
    shipsCells: generateFreeCells({}),
    shipsShadowsCells: generateFreeCells({}),
    shipsStatus: generateShipsStatus({}),
    possibleDirections: generateFreeCells({}, false),
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
  },
  computer: {
    killedCells: generateFreeCells({}, false),
    shipsCells: generateFreeCells({}),
    shipsShadowsCells: generateFreeCells({}),
    wrongAttempts: [],
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
  },
  sillyButtons: false,
  showComputer: false,
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
    case "SET_INPUT":
      return {
        ...state,
        player: {
          ...state.player,
          input: !state.player.input,
        },
      };
    case "SET_SILLY_BUTTONS":
      return {
        ...state,
        sillyButtons: !state.sillyButtons,
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
        [action.payload.player]: {
          ...state[action.payload.player],
          attempts: state[action.payload.player].attempts + 1,
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
    default:
      return state;
  }
};

export default reducer;
