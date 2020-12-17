const initialState = {
  playerShips: {
    filledPositions: [],
    battleship: [],
    cruiserFirst: [],
    cruiserSecond: [],
    destroyerFirst: [],
    destroyerSecond: [],
    destroyerThird: [],
    vedetteFirst: null,
    vedetteSecond: null,
    vedetteThird: null,
    vedetteForth: null,
  },
  computerShips: {
    filledPositions: [],
    battleship: [],
    cruiserFirst: [],
    cruiserSecond: [],
    destroyerFirst: [],
    destroyerSecond: [],
    destroyerThird: [],
    vedetteFirst: null,
    vedetteSecond: null,
    vedetteThird: null,
    vedetteForth: null,
  },
  test: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILLED_POSITIONS":
      return {
        ...state,
        computerShips: {
          ...state.computerShips,
          filledPositions: action.payload,
        },
      };
    case "SET_COMPUTER_BATTLESHIP":
      return {
        ...state,
        computerShips: {
          ...state.computerShips,
          battleship: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
