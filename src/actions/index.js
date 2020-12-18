export const setComputerCells = (database) => {
  return {
    type: "SET_COMPUTER_CELLS",
    payload: database,
  };
};

export const setComputerShip = (ship, position) => {
  return {
    type: "SET_COMPUTER_SHIP",
    payload: { ship, position },
  };
};
