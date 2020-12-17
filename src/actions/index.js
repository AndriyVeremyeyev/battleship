export const setFilledPositions = (database) => {
  return {
    type: "SET_FILLED_POSITIONS",
    payload: database,
  };
};

export const setComputerBattleship = (position) => {
  return {
    type: "SET_COMPUTER_BATTLESHIP",
    payload: position,
  };
};
