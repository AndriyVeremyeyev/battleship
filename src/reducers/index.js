const initialState = {
  playerShips: {
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
    case "SET_COMPUTER_BATTLESHIP":
      console.log(action.payload);
      return {
        ...state,
        computerShips: {
          ...state.computerShips,
          battleship: action.payload,
        },
      };
    case "SET_TESTING_PURPOSES":
      return {
        ...state,
        test: !state.test,
      };
    default:
      return state;
  }
};

export default reducer;
