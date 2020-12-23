const generateFreeCells = (obj) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      obj[`${rows[i]}${columns[j]}`] = true;
    }
  }
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
export const shipTypes = ["battleShip", "cruiser", "destroyer", "vedette"];
export const direction = ["up", "down", "left", "right"];
export const freeCells = {};

generateFreeCells(freeCells);
