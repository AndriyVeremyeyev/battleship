import { rows, columns } from "../database";

const generateFreeCells = (obj) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      obj[`${rows[i]}${columns[j]}`] = true;
    }
  }
  return obj;
};

const initialState = {
  pageStatus: "startGame",
  legendLineOne: "",
  legendLineTwo: "",
  player: {
    shipsCells: generateFreeCells({}),
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
  color: false,
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
    default:
      return state;
  }
};

export default reducer;
