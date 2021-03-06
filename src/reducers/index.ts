import { generateFreeCells, generateShipsStatus } from "../database";

const basicInitialState = {
  attempts: 0,
  killedCells: generateFreeCells({}, false),
  shipsStatus: generateShipsStatus({}),
  shipsCells: generateFreeCells({}),
  shipsShadowsCells: generateFreeCells({}),
  wrongAttempts: generateFreeCells({}, false),
  ships: {
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
};

const computerInitialState = {
  ...basicInitialState,
  catchedShip: false,
};

const playerInitialState = {
  ...basicInitialState,
  possibleDirections: generateFreeCells({}, false),
  damagedShip: [],
};

const initialState = {
  firstTime: true,
  isBattle: false,
  legendLineOne: "",
  legendLineTwo: "",
  pageStatus: "startGame",
  playAgain: false,
  playerName: "",
  score: [0, 0],
  showComputer: false,
  computer: computerInitialState,
  player: playerInitialState,
};

// @ts-ignore
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_KILLED_CELLS":
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          killedCells: {
            // @ts-ignore
            ...state[action.payload.player].killedCells,
            [action.payload.cell]: true,
          },
        },
      };
    case "SET_SHIPS_CELLS":
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          shipsCells: {
            // @ts-ignore
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
          // @ts-ignore
          ...state[action.payload.player],
          shipsShadowsCells: {
            // @ts-ignore
            ...state[action.payload.player].shipsShadowsCells,
            [action.payload.cell]: false,
          },
        },
      };
    case "SET_SHIPS_SHADOWS_CELLS_TOTAL":
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          shipsShadowsCells: action.payload.obj,
        },
      };
    case "SET_SHIP":
      const updatedShip = [
        // @ts-ignore
        ...state[action.payload.player].ships[action.payload.ship],
        ...action.payload.position,
      ];
      const considerCellNumber = (cell: string) => {
        return cell.length === 3 ? cell[1] + cell[2] : cell[1];
      };
      if (updatedShip.length > 1) {
        if (updatedShip[0] === updatedShip[1]) {
          updatedShip.sort(
            (a, b) =>
              Number(considerCellNumber(a)) - Number(considerCellNumber(b))
          );
        } else {
          updatedShip.sort((a, b) => a.charCodeAt() - b.charCodeAt());
        }
      }

      updatedShip.sort();
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          ships: {
            // @ts-ignore
            ...state[action.payload.player].ships,
            [action.payload.ship]: updatedShip,
          },
        },
      };
    case "REMOVE_SHIP_CELL":
      // @ts-ignore
      const newArray = state[action.payload.player].ships[
        action.payload.ship
      ].filter((cell: string) => cell !== action.payload.cell);
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          ships: {
            // @ts-ignore
            ...state[action.payload.player].ships,
            [action.payload.ship]: newArray,
          },
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
          // @ts-ignore
          ...state[action.payload.player],
          shipsStatus: {
            // @ts-ignore
            ...state[action.payload.player].shipsStatus,
            [action.payload.ship]: action.payload.status,
          },
        },
      };
    case "SET_ATTEMPTS":
      return {
        ...state,
        [action.payload]: {
          // @ts-ignore
          ...state[action.payload],
          // @ts-ignore
          attempts: state[action.payload].attempts + 1,
        },
      };
    case "SET_WRONG_ATTEMPTS":
      return {
        ...state,
        [action.payload.player]: {
          // @ts-ignore
          ...state[action.payload.player],
          wrongAttempts: {
            // @ts-ignore
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
    case "SET_DAMAGED_SHIP":
      return {
        ...state,
        player: {
          ...state.player,
          damagedShip: action.payload,
        },
      };
    case "SET_IS_BATTLE":
      return {
        ...state,
        isBattle: action.payload,
      };
    case "SET_SCORE":
      const newScore = state.score;
      action.payload === "player" ? newScore[0]++ : newScore[1]++;
      return {
        ...state,
        score: newScore,
      };
    case "SET_PLAYER_NAME":
      return {
        ...state,
        playerName: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
