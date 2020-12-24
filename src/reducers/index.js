import { generateFreeCells, generateShipsStatus } from "../database";

const initialState = {
  pageStatus: "startGame",
  legendLineOne: "",
  legendLineTwo: "",
  player: {
    input: false,
    shipsCells: generateFreeCells({}),
    shipsShadowsCells: generateFreeCells({}),
    shipsStatus: generateShipsStatus({}),
    possibleDirections: {},
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
    shipsCells: generateFreeCells({}),
    shipsShadowsCells: generateFreeCells({}),
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        computer: {
          ...state.computer,
          shipsShadowsCells: {
            ...state.computer.shipsShadowsCells,
            [action.payload]: false,
          },
        },
      };
    case "SET_POSSIBLE_DIRECTIONS":
      return {
        ...state,
        player: {
          possibleDirections: action.payload,
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
    default:
      return state;
  }
};

export default reducer;
