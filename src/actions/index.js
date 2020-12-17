export const setComputerBattleship = (position) => {
  return {
    type: "SET_COMPUTER_BATTLESHIP",
    payload: position,
  };
};

export const setTestingPurposes = () => {
  return {
    type: "SET_TESTING_PURPOSES",
  };
};
