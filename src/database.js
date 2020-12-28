export const generateFreeCells = (obj, status = true) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      obj[`${rows[i]}${columns[j]}`] = status;
    }
  }
  return obj;
};

export const generateShipsStatus = (obj) => {
  shipNames.forEach((ship) => (obj[ship] = false));
  return obj;
};

export const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
export const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const shipNames = [
  "battleShip",
  "cruiserFirst",
  "cruiserSecond",
  "destroyerFirst",
  "destroyerSecond",
  "destroyerThird",
  "vedetteFirst",
  "vedetteSecond",
  "vedetteThird",
  "vedetteForth",
];
export const shipTypes = ["Battleship", "Cruiser", "Destroyer", "Vedette"];
export const shipNicknames = [
  "Battleship",
  "1st Cruiser",
  "2nd Cruiser",
  "1st Destroyer",
  "2nd Destroyer",
  "3rd Destroyer",
  "1th Vedette",
  "2nd Vedette",
  "3rd Vedette",
  "4th Vedette",
];
export const shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
export const direction = ["up", "down", "left", "right"];
export const freeCells = {};

generateFreeCells(freeCells);
