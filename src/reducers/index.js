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
  test: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPUTER_CELLS":
      return {
        ...state,
        computerShips: {
          ...state.computerShips,
          freeCells: {
            ...state.computerShips.freeCells,
            [action.payload]: !state.computerShips.freeCells[action.payload],
          },
        },
      };
    case "SET_COMPUTER_SHIP":
      console.log(action);
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
    default:
      return state;
  }
};

export default reducer;
