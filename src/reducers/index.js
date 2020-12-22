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
    freeCells: generateFreeCells({}),
    battleship: [],
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
    freeCells: generateFreeCells({}),
    battleship: [],
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
    case "SET_COMPUTER_CELLS":
      return {
        ...state,
        computer: {
          ...state.computer,
          freeCells: {
            ...state.computer.freeCells,
            [action.payload]: false,
          },
        },
      };
    case "SET_COMPUTER_SHIP":
      return {
        ...state,
        computer: {
          ...state.computer,
          [action.payload.ship]: [
            ...state.computer[action.payload.ship],
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
