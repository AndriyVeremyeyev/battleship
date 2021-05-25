import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button, TextField, Modal } from "@material-ui/core";
import Field from "./Field";
import PlayAgain from "./PlayAgain";
import Legend from "./Legend";
import {
  setShip,
  setShipsCells,
  setShipsShadowsCells,
  setLegendLineOne,
  setLegendLineTwo,
  setShipsStatus,
  setWrongAttempts,
  setAttempts,
  // setShowComputer,
  setKilledCells,
  removeShipCell,
  setPossibleDirections,
  removePossibleDirections,
  setShipsCellsTotal,
  setShipsShadowsCellsTotal,
  removeShadows,
  setPlayAgain,
  setFirstTime,
  clearEverything,
  setDamagedShip,
  setIsBattle,
  setScore,
} from "./actions/index";
import {
  rows,
  columns,
  shipNames,
  direction,
  shipLengths,
  shipNicknames,
  generateFreeCells,
} from "./database";
import strings from "./strings";
import {
  TypeOneAction,
  TypeTwoAction,
  TypeThreeAction,
  TypeFourAction,
  TypeFiveAction,
  TypeSixAction,
  TypeSevenAction,
  TypeEightAction,
  TypeNineAction,
  TypeTenAction,
} from "./types";

type BattleProps = {
  setShip: (player: string, ship: string, position: string[]) => TypeTenAction;
  setShipsCells: (player: string, cell: string) => TypeSixAction;
  setShipsShadowsCells: (player: string, cell: string) => TypeSixAction;
  computer: any;
  setLegendLineOne: (legend: string) => TypeThreeAction;
  setLegendLineTwo: (legend: string) => TypeThreeAction;
  player: any;
  setShipsStatus: (
    player: string,
    ship: string,
    status: boolean
  ) => TypeEightAction;
  // setShowComputer: () => TypeOneAction;
  // showComputer: boolean;
  setKilledCells: (player: string, cell: string) => TypeSixAction;
  removeShipCell: (
    player: string,
    ship: string,
    cell: string
  ) => TypeNineAction;
  setWrongAttempts: (player: string, atempt: string) => TypeSixAction;
  setPossibleDirections: (cell: string) => TypeThreeAction;
  removePossibleDirections: () => TypeOneAction;
  setAttempts: (player: string) => TypeThreeAction;
  setShipsCellsTotal: (obj: any) => TypeFiveAction;
  setShipsShadowsCellsTotal: (player: string, obj: any) => TypeSevenAction;
  removeShadows: () => TypeOneAction;
  setPlayAgain: (status: boolean) => TypeTwoAction;
  playAgain: boolean;
  setFirstTime: (status: boolean) => TypeTwoAction;
  firstTime: boolean;
  clearEverything: () => TypeOneAction;
  setDamagedShip: (ship: string[]) => TypeFourAction;
  setIsBattle: (status: boolean) => TypeTwoAction;
  isBattle: boolean;
  setScore: (side: string) => TypeThreeAction;
  score: number[];
  playerName: string;
};

// const useStyles = makeStyles({
// });

const Battle: React.FC<BattleProps> = (props) => {
  // to generate computer map once battle is mounted

  // const classes = useStyles();

  const {
    setShip,
    setShipsCells,
    setShipsShadowsCells,
    computer,
    setLegendLineOne,
    setLegendLineTwo,
    player,
    setShipsStatus,
    // setShowComputer,
    // showComputer,
    setKilledCells,
    removeShipCell,
    setWrongAttempts,
    setPossibleDirections,
    removePossibleDirections,
    setAttempts,
    setShipsCellsTotal,
    setShipsShadowsCellsTotal,
    removeShadows,
    setPlayAgain,
    playAgain,
    setFirstTime,
    firstTime,
    clearEverything,
    setDamagedShip,
    setIsBattle,
    isBattle,
    setScore,
    score,
    playerName,
  } = props;
  const [firstRender, setFirstRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    generateComputerMap();
    setFirstRender(true);
  }, []);

  // to monitor changes in
  useEffect(() => {
    drawPossibleDirections();
  }, [player.shipsCells]);

  useEffect(() => {
    if (Object.values(player.shipsStatus).every((status) => status))
      removeShadows();
    if (
      Object.values(player.shipsStatus).every((status) => status) &&
      !firstTime
    )
      setIsBattle(true);
    if (
      Object.values(player.shipsStatus).every((status) => !status) &&
      player.attempts &&
      !firstTime
    ) {
      setLegendLineOne(strings.battle.lose);
      setLegendLineTwo("");
      setPlayAgain(true);
      setIsBattle(false);
      setScore("computer");
    }
    // removed player.damagedShip
  }, [player.shipsStatus, firstTime]);

  useEffect(() => {
    if (
      Object.values(computer.shipsStatus).every((status) => !status) &&
      computer.attempts &&
      !firstTime
    ) {
      setLegendLineOne(strings.battle.win);
      setLegendLineTwo("");
      setPlayAgain(true);
      setScore("player");
    }
  }, [computer.shipsStatus, firstTime]);

  useEffect(() => {
    if (player.ships.battleShip.length === 4) setFirstTime(false);
  }, [player.ships.battleShip]);

  const [playerAttempt, setPlayerAttempt] = useState("");

  // Why we need this??
  useEffect(() => {
    if (firstRender) {
      setTimeout(() => checkComputerAttempt(), 2000);
    }
  }, [player.damagedShip.length]);

  const oneMoreTimeGame = () => {
    setPlayAgain(false);
    clearEverything();
    generateComputerMap();
    setLegendLineOne(strings.battle.keepPlaying);
    setLegendLineTwo(strings.battle.placeStartPoint);
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // multifunctional methods necessary for player and computer as well

  // method to generate random position on map
  const randomPosition = () => {
    const randomLetter = rows[Math.floor(Math.random() * rows.length)];
    const randomNumber = columns[Math.floor(Math.random() * columns.length)];
    return randomLetter + randomNumber;
  };

  // method to determine number part of cell consist of 1 or 2 digits (e.g d9 or d10)
  const considerCellNumber = (cell: string) => {
    return cell.length === 3 ? cell[1] + cell[2] : cell[1];
  };

  // method to calculate length of ship based on it's name
  const calculateShipLength = (ship: string) => {
    let shipLength = 1;
    if (ship[0] === "b") shipLength = 4;
    if (ship[0] === "c") shipLength = 3;
    if (ship[0] === "d") shipLength = 2;
    return shipLength;
  };

  // method to determine possible ship directions based on starting point and free cells around
  const whereTurnShip = (
    obj: any,
    ship: string,
    firstPoint: string,
    shipDirections: string[]
  ) => {
    const shipLength = calculateShipLength(ship);
    const number = considerCellNumber(firstPoint);
    for (let i = 1; i < shipLength; i++) {
      if (!obj[`${firstPoint[0]}${Number(number) - i}`])
        shipDirections = shipDirections.filter((x) => x !== "up");
      if (!obj[`${firstPoint[0]}${Number(number) + i}`])
        shipDirections = shipDirections.filter((x) => x !== "down");
      if (
        !obj[`${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`]
      )
        shipDirections = shipDirections.filter((x) => x !== "left");
      if (
        !obj[`${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`]
      )
        shipDirections = shipDirections.filter((x) => x !== "right");
    }
    return shipDirections;
  };

  // method to create neighbour cells array considering non existing cells
  const createNeighbourCellsArray = (cell: string, all = true) => {
    const number = considerCellNumber(cell);
    // create empty board to know which cells are exist
    const board = generateFreeCells({});
    // create array of all possble neigbour cells
    let neighbourCells = [
      upperNeighbour(cell),
      downNeighbour(cell),
      leftNeighbour(cell),
      rightNeighbour(cell),
    ];

    if (all)
      neighbourCells = [
        ...neighbourCells,
        `${String.fromCharCode(cell[0].charCodeAt(0) - 1)}${
          Number(number) - 1
        }`,
        `${String.fromCharCode(cell[0].charCodeAt(0) - 1)}${
          Number(number) + 1
        }`,
        `${String.fromCharCode(cell[0].charCodeAt(0) + 1)}${
          Number(number) - 1
        }`,
        `${String.fromCharCode(cell[0].charCodeAt(0) + 1)}${
          Number(number) + 1
        }`,
      ];
    // return only filtered existing cells
    return neighbourCells.filter((pos) => board[pos]);
  };

  // create array of ship cells together with shadows based on ship array
  const fillShipArrayWithShadows = (shipPosition: string[]) => {
    let shipPositionWithShadows: string[] = [];
    shipPosition.forEach((pos: string) => {
      const neighbourCells = createNeighbourCellsArray(pos);
      shipPositionWithShadows = [
        ...shipPositionWithShadows,
        pos,
        ...neighbourCells,
      ];
    });
    // return only unique cells
    return [...new Set(shipPositionWithShadows)];
  };

  // method to return corresponding object based on string
  const whatTheSide = (side: string) => (side === "player" ? player : computer);

  // methods to determine neighbour cells
  const upperNeighbour = (cell: string) => {
    const number = considerCellNumber(cell);
    return `${cell[0]}${Number(number) + 1}`;
  };
  const downNeighbour = (cell: string) => {
    const number = considerCellNumber(cell);
    return `${cell[0]}${Number(number) - 1}`;
  };
  const leftNeighbour = (cell: string) => {
    const number = considerCellNumber(cell);
    return `${String.fromCharCode(cell[0].charCodeAt(0) - 1)}${number}`;
  };
  const rightNeighbour = (cell: string) => {
    const number = considerCellNumber(cell);
    return `${String.fromCharCode(cell[0].charCodeAt(0) + 1)}${number}`;
  };

  // method to determine what the ship based on catched cell, returns ship name
  const whatTheShip = (side: string, value: string) => {
    const sideObj = whatTheSide(side);
    let currShip = "";
    shipNames.forEach((ship) => {
      if (sideObj[ship].includes(value)) currShip = ship;
    });
    return currShip;
  };

  // method to determine what the ship index based on ship name
  const whatTheShipIndex = (ship: string, shipNames: string[]) => {
    return shipNames.findIndex((currShip) => currShip === ship);
  };

  // method to check was ship completely destroyed or not
  const isShipDestroyed = (side: string, ship: string) => {
    const sideObj = whatTheSide(side);
    return sideObj[ship].length === 1 ? true : false;
  };

  // method to remove cell from attempt from corresponding ship array
  // and check was ship completely destroyed or not
  const removeCellFromShip = (side: string, value: string) => {
    const currentShip = whatTheShip(side, value);
    const currentIndex: number = whatTheShipIndex(currentShip, shipNames);
    removeShipCell(side, currentShip, value);
    if (isShipDestroyed(side, currentShip)) {
      if (side === "player") {
        setLegendLineOne(
          strings.battle.yourShipDestroyed.replace(
            "{}",
            shipNicknames[currentIndex]
          )
        );
        setShipsStatus("player", currentShip, false);
      } else {
        setLegendLineOne(
          strings.battle.youDestroyedShip.replace(
            "{}",
            shipNicknames[currentIndex]
          )
        );
        setShipsStatus("computer", currentShip, false);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // generate computer ships and all related methods to computer methods

  // method to generate starting point, only checks if point is not occupied
  const generateStartingPoint = (obj: any) => {
    // generate first attempt of ship starting point
    let startingPoint = randomPosition();
    // if starting point is occupied we need to generate another one
    while (!obj[startingPoint]) {
      startingPoint = randomPosition();
    }
    return startingPoint;
  };

  // method to fill ship array based on choosen direction
  const fillShipArray = (ship: string, arr: string[], direction: string) => {
    const number = considerCellNumber(arr[0]);
    const shipLength = calculateShipLength(ship);
    if (direction === "up") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(`${arr[0][0]}${Number(number) - i}`);
      }
    }
    if (direction === "down") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(`${arr[0][0]}${Number(number) + i}`);
      }
    }
    if (direction === "left") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(
          `${String.fromCharCode(arr[0][0].charCodeAt(0) - i)}${number}`
        );
      }
    }
    if (direction === "right") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(
          `${String.fromCharCode(arr[0][0].charCodeAt(0) + i)}${number}`
        );
      }
    }
    return arr;
  };

  // method to generate ship position based on current condition of map cells
  const generateShip = (ship: string, obj: any) => {
    // generate first cell of first ship
    let firstCell = generateStartingPoint(obj);
    let shipPosition = [];
    shipPosition.push(firstCell);
    // if it's not 1cell ship make sure that you can turn ship somewhere
    if (ship[0] !== "v") {
      let shipPossibleDirections = whereTurnShip(
        obj,
        ship,
        firstCell,
        direction
      );
      while (shipPossibleDirections.length === 0) {
        firstCell = generateStartingPoint(obj);
        shipPossibleDirections = whereTurnShip(obj, ship, firstCell, direction);
      }
      shipPosition[0] = firstCell;
      // choose random direction of ship based on possible directions
      const shipDirection =
        shipPossibleDirections[
          Math.floor(Math.random() * shipPossibleDirections.length)
        ];
      // add rest of ship coordinates to array to have full shape of ship
      shipPosition = fillShipArray(ship, shipPosition, shipDirection);
    }
    return shipPosition;
  };

  // method to generate complete computer map of ships
  const generateComputerMap = () => {
    // object to storage ships positions
    const ships = generateFreeCells({});
    // object to storage ships positions with ships shadows
    const shipsShadows = generateFreeCells({});
    shipNames.forEach((ship) => {
      const shipPosition = generateShip(ship, shipsShadows);
      setShip("computer", ship, shipPosition);
      setShipsStatus("computer", ship, true);
      const shipPositionWithArrays = fillShipArrayWithShadows(shipPosition);
      shipPosition.forEach((pos: string) => (ships[pos] = false));
      shipPositionWithArrays.forEach(
        (pos: string) => (shipsShadows[pos] = false)
      );
    });
    // pass objects with information to corresponding reducers
    setShipsCellsTotal(ships);
    setShipsShadowsCellsTotal("computer", shipsShadows);
  };

  // method to generate random computer attempt considering is this cell occupied with previous random or with shadow of guessed ship
  const generateComputerAttempt = () => {
    let currentAttempt = randomPosition();
    while (
      computer.wrongAttempts[currentAttempt] ||
      !player.shipsShadowsCells[currentAttempt]
    )
      currentAttempt = randomPosition();
    return currentAttempt;
  };

  // method how computer is going to guess next player ship cell based on
  // quantity of already guessed cells
  const guessNextPlayerShipCell = (ship: string[]) =>
    ship.length === 1
      ? guessBasedOnOneCell(ship[0])
      : guessBasedOnTwoCells(ship);

  // method to add cells to damaged ship
  const addCellToDamagedShip = (cell: string) => {
    const { damagedShip } = player;
    if (damagedShip.length === 0) {
      setDamagedShip([cell]);
    } else {
      const direction = determineShipDirection(damagedShip[0], cell);
      const damagedShipCopy = damagedShip;
      let necessaryIndex;
      if (direction === strings.battle.vertical)
        necessaryIndex = damagedShip.findIndex(
          (currentCell: string) =>
            Number(considerCellNumber(cell)) <
            Number(considerCellNumber(currentCell))
        );
      if (direction === strings.battle.horizontal)
        necessaryIndex = damagedShip.findIndex(
          (currentCell: string) =>
            cell.charCodeAt(0) < currentCell.charCodeAt(0)
        );
      if (necessaryIndex === -1) necessaryIndex = damagedShip.length;
      damagedShipCopy.splice(necessaryIndex, 0, cell);
      setDamagedShip(damagedShipCopy);
    }
  };

  // method to determine ship direction based on ship coordinates
  const determineShipDirection = (firstCell: string, lastCell: string) => {
    return firstCell[0] === lastCell[0]
      ? strings.battle.vertical
      : strings.battle.horizontal;
  };

  // method for computer attempt after player attempt
  const checkComputerAttempt = () => {
    const { damagedShip } = player;
    const currentAttempt =
      damagedShip.length === 0
        ? generateComputerAttempt()
        : guessNextPlayerShipCell(damagedShip);
    setWrongAttempts("computer", currentAttempt);
    setAttempts("computer");
    setLegendLineOne(strings.battle.computerTurn.replace("{}", currentAttempt));
    setLegendLineTwo("");
    // check if ship was damaged or not
    if (!player.shipsCells[currentAttempt]) {
      // if ship was damaged
      setLegendLineTwo(strings.battle.computerCatched);
      setKilledCells("player", currentAttempt);
      const damagedShipName: string = whatTheShip("player", currentAttempt);
      removeCellFromShip("player", currentAttempt);
      // check if ship was completely destroyed or not
      if (isShipDestroyed("player", damagedShipName)) {
        // if completely destroyed we just looking for new random cell
        const destroyedShipShadows = fillShipArrayWithShadows([
          ...damagedShip,
          currentAttempt,
        ]);
        const playerShipsShadowsCellsCopy = player.shipsShadowsCells;
        destroyedShipShadows.forEach(
          (cell: string) => (playerShipsShadowsCellsCopy[cell] = false)
        );
        setShipsShadowsCellsTotal("player", playerShipsShadowsCellsCopy);
        setDamagedShip([]);
        if (damagedShipName[0] === "v")
          setTimeout(() => checkComputerAttempt(), 2000);
      } else {
        addCellToDamagedShip(currentAttempt);
      }
    } else {
      setTimeout(() => {
        setLegendLineOne(strings.battle.computerMissed);
        setLegendLineTwo(strings.battle.yourTurn);
        setPlayerTurn(true);
      }, 2000);
    }
  };

  // method to provide random neighbour cell based on one cell
  const guessBasedOnOneCell = (cell: string) => {
    // we need to filter array of cells to make sure that we not tried this cell before and it's not lying on other ship shadow
    const neighbourCells = createNeighbourCellsArray(cell, false);
    const filteredneighbourCells = neighbourCells.filter(
      (cell) => !computer.wrongAttempts[cell] && player.shipsShadowsCells[cell]
    );
    // take random cell from filtered array
    let randomNeigbourCell =
      filteredneighbourCells[
        Math.floor(Math.random() * filteredneighbourCells.length)
      ];
    return randomNeigbourCell;
  };

  // guessing next player cell if we have 2 cells of damaged ship
  const guessBasedOnTwoCells = (ship: string[]) => {
    const direction = determineShipDirection(ship[0], ship[ship.length - 1]);
    const neighbourCells = [];
    if (direction === strings.battle.vertical) {
      neighbourCells.push(
        `${ship[0][0]}${Number(considerCellNumber(ship[0])) - 1}`
      );
      neighbourCells.push(
        `${ship[0][0]}${Number(considerCellNumber(ship[ship.length - 1])) + 1}`
      );
    }
    if (direction === strings.battle.horizontal) {
      const thisCellNumber = considerCellNumber(ship[0]);
      neighbourCells.push(
        `${String.fromCharCode(ship[0].charCodeAt(0) - 1)}${thisCellNumber}`
      );
      neighbourCells.push(
        `${String.fromCharCode(
          ship[ship.length - 1].charCodeAt(0) + 1
        )}${thisCellNumber}`
      );
    }
    const filteredneighbourCells = neighbourCells.filter(
      (cell) => !computer.wrongAttempts[cell] && player.shipsShadowsCells[cell]
    );
    return filteredneighbourCells.length === 1
      ? filteredneighbourCells[0]
      : filteredneighbourCells[
          Math.floor(Math.random() * filteredneighbourCells.length)
        ];
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // methods for player playing

  // method to place player's ship on map
  const placePlayerShipOnMap = (cellNumber: string) => {
    const { ships } = player;
    let currentShip = "";
    let index = 0;
    if (!ships.battleShip.length || ships.battleShip.length < 4)
      currentShip = shipNames[0];
    else if (!ships.cruiserFirst.length || ships.cruiserFirst.length < 3) {
      currentShip = shipNames[1];
      index = 1;
    } else if (!ships.cruiserSecond.length || ships.cruiserSecond.length < 3) {
      currentShip = shipNames[2];
      index = 2;
    } else if (
      !ships.destroyerFirst.length ||
      ships.destroyerFirst.length < 2
    ) {
      currentShip = shipNames[3];
      index = 3;
    } else if (
      !ships.destroyerSecond.length ||
      ships.destroyerSecond.length < 2
    ) {
      currentShip = shipNames[4];
      index = 4;
    } else if (
      !ships.destroyerThird.length ||
      ships.destroyerThird.length < 2
    ) {
      currentShip = shipNames[5];
      index = 5;
    } else if (!ships.vedetteFirst.length || ships.vedetteFirst.length < 1) {
      currentShip = shipNames[6];
      index = 6;
    } else if (!ships.vedetteSecond.length || ships.vedetteSecond.length < 1) {
      currentShip = shipNames[7];
      index = 7;
    } else if (!ships.vedetteThird.length || ships.vedetteThird.length < 1) {
      currentShip = shipNames[8];
      index = 8;
    } else if (!ships.vedetteForth.length || ships.vedetteForth.length < 1) {
      currentShip = shipNames[9];
      index = 9;
    }

    if (
      (player.shipsCells[cellNumber] && !ships[currentShip].length) ||
      (player.shipsCells[cellNumber] && player.possibleDirections[cellNumber])
    ) {
      if (
        (index === 0 && ships[currentShip]?.length < shipLengths[index]) ||
        (index > 0 &&
          ships[shipNames[index - 1]]?.length === shipLengths[index - 1] &&
          ships[currentShip]?.length < shipLengths[index])
      ) {
        setShip("player", shipNames[index], [cellNumber]);
        setShipsCells("player", cellNumber);
        if (ships[currentShip]?.length === shipLengths[index] - 1) {
          const currentShipShadow = fillShipArrayWithShadows([
            ...ships[currentShip],
            cellNumber,
          ]);
          currentShipShadow.forEach((cell) =>
            setShipsShadowsCells("player", cell)
          );
        }
        if (ships[currentShip]?.length === 0 && index < 6) {
          const directions = whereTurnShip(
            player.shipsShadowsCells,
            currentShip,
            cellNumber,
            direction
          );
          directions.forEach((dir) =>
            fillPossibleDirection(currentShip, [cellNumber], dir)
          );
        }
        if (ships[currentShip]?.length === 1 && index < 6) {
          removePossibleDirections();
          const dir = determineDirection(ships[currentShip][0], cellNumber);
          fillPossibleDirection(currentShip, [ships[currentShip][0]], dir);
        }
      }
    } else if (
      player.shipsCells[cellNumber] &&
      ships[currentShip].length &&
      !player.possibleDirections[cellNumber]
    ) {
      setLegendLineOne("Please, choose cell from ship shadow");
      setLegendLineTwo("");
    }
  };

  // method to check was attempt wrong or not
  const checkPlayerAttempt = (value: string) => {
    const correctedValue = value.toLowerCase();
    if (!playerTurn) {
      setLegendLineOne(strings.battle.notYourTurn);
      setLegendLineTwo(strings.battle.wait);
    } else {
      setLegendLineOne(
        strings.battle.yourAttempt.replace("{}", correctedValue)
      );
      setLegendLineTwo("");
      if (player.wrongAttempts[value]) {
        setLegendLineTwo(strings.battle.alreadyTried);
      } else if (computer.shipsCells[correctedValue] === undefined) {
        setLegendLineTwo(strings.battle.cellNotExist);
      } else {
        setWrongAttempts("player", correctedValue);
        setAttempts("player");
        if (!computer.shipsCells[correctedValue]) {
          const currentShip = whatTheShip("computer", value);
          if (isShipDestroyed("computer", currentShip)) {
            setLegendLineTwo(strings.battle.oneMoreTry);
          } else {
            setLegendLineTwo(strings.battle.youCatched);
          }
          setKilledCells("computer", correctedValue);
          removeCellFromShip("computer", correctedValue);
        } else {
          setLegendLineTwo(strings.battle.youMissed);
          setPlayerTurn(false);
          setTimeout(() => {
            checkComputerAttempt();
          }, 2000);
        }
      }
    }
  };

  // method to fill possible directions
  const fillPossibleDirection = (
    ship: string,
    cell: string[],
    direction: string
  ) => {
    const shipPosition = fillShipArray(ship, cell, direction);
    shipPosition.forEach((shipCell: string, cellIndex: number) => {
      if (cellIndex > 0) setPossibleDirections(shipCell);
    });
  };

  // method to determine ship direction based on started and second points
  const determineDirection = (cellFirst: string, cellSecond: string) => {
    const cellFirstNumber = considerCellNumber(cellFirst);
    const cellSecondNumber = considerCellNumber(cellSecond);
    return cellFirst[0] === cellSecond[0]
      ? Number(cellFirstNumber) > Number(cellSecondNumber)
        ? "up"
        : "down"
      : String.fromCharCode(cellFirst[0].charCodeAt(0) - 1) === cellSecond[0]
      ? "left"
      : "right";
  };

  // method to draw possible directions of ship once start position is determined
  // right now only provides information in legend
  const drawPossibleDirections = () => {
    shipNames.forEach((ship, index) => {
      if (player.ships[ship]?.length === shipLengths[index]) {
        if (index < shipNames.length - 1) {
          setLegendLineOne(
            strings.battle.completed.replace("{}", shipNicknames[index])
          );
          setLegendLineTwo(
            strings.battle.proposition.replace("{}", shipNicknames[index + 1])
          );
        } else {
          setLegendLineOne(strings.battle.placementCompleted);
          setLegendLineTwo("");
        }
        setShipsStatus("player", ship, true);
      }
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // front-end methods

  // const killPlayer = () => {
  //   shipNames.forEach((ship) => setShipsStatus("player", ship, false));
  //   setFirstTime(false);
  //   setAttempts("player");
  //   setOpen(true);
  // };

  // const killComputer = () => {
  //   shipNames.forEach((ship) => setShipsStatus("computer", ship, false));
  //   setFirstTime(false);
  //   setAttempts("computer");
  //   setOpen(true);
  // };

  return (
    <Fragment>
      <Grid
        container
        style={{ marginBottom: 20 }}
        direction="column"
        alignItems="center"
      >
        <Typography style={{ color: "white" }} variant="h5">
          Score:
        </Typography>
        <Typography style={{ color: "white" }} variant="h5">
          {score[0]}:{score[1]}
        </Typography>
        {playAgain && !firstTime ? (
          <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlayAgain oneMoreGame={oneMoreTimeGame} handleOpen={setOpen} />
          </Modal>
        ) : null}
      </Grid>
      <Grid
        container
        direction="row"
        spacing={5}
        justify="center"
        style={{ backgroundColor: "white" }}
      >
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4">{playerName}</Typography>
            <Typography
              style={{ marginTop: 20 }}
              variant="h6"
            >{`Attempts: ${player.attempts}`}</Typography>
            <Field side={"player"} placeShipOnMap={placePlayerShipOnMap} />
            {isBattle ? (
              <React.Fragment>
                <Grid item style={{ marginTop: 40 }}>
                  <Grid container direction="row" spacing={2} justify="center">
                    <Grid item>
                      <TextField
                        variant="outlined"
                        style={{ width: 70, height: 10 }}
                        onChange={(event) =>
                          setPlayerAttempt(event.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.keyCode === 13)
                            checkPlayerAttempt(playerAttempt);
                        }}
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 10 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => checkPlayerAttempt(playerAttempt)}
                      >
                        Enter cell
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: 10 }}>
                  <Legend side={player} />
                </Grid>
              </React.Fragment>
            ) : null}
            {/* <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={killPlayer}
                style={{ marginTop: 20 }}
              >
                Kill player
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4">Computer</Typography>
            <Typography
              style={{ marginTop: 20 }}
              variant="h6"
            >{`Attempts: ${computer.attempts}`}</Typography>
            <Field side={"computer"} />
            {/* <Grid item style={{ marginTop: 100 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={killComputer}
                style={{ marginTop: 20 }}
              >
                Kill computer
              </Button>
            </Grid> */}
            {/* <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={setShowComputer}
              >
                {showComputer ? "Hide Ships" : "Show Ships"}
              </Button>
            </Grid> */}
            <Grid item style={{ marginTop: 97 }}>
              {isBattle ? <Legend side={computer} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const {
    player,
    computer,
    // showComputer,
    playAgain,
    firstTime,
    isBattle,
    score,
    playerName,
    playerTurn,
  } = state;
  return {
    player,
    computer,
    // showComputer,
    playAgain,
    firstTime,
    isBattle,
    score,
    playerName,
    playerTurn,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setShip: (player: string, ship: string, position: string[]) =>
    dispatch(setShip(player, ship, position)),
  setShipsCells: (player: string, cell: string) =>
    dispatch(setShipsCells(player, cell)),
  setShipsShadowsCells: (player: string, cell: string) =>
    dispatch(setShipsShadowsCells(player, cell)),
  setLegendLineTwo: (legend: string) => dispatch(setLegendLineTwo(legend)),
  setLegendLineOne: (legend: string) => dispatch(setLegendLineOne(legend)),
  /* setShowComputer: () => dispatch(setShowComputer()), */
  setShipsStatus: (player: string, ship: string, status: boolean) =>
    dispatch(setShipsStatus(player, ship, status)),
  setKilledCells: (player: string, cell: string) =>
    dispatch(setKilledCells(player, cell)),
  removeShipCell: (player: string, ship: string, cell: string) =>
    dispatch(removeShipCell(player, ship, cell)),
  setWrongAttempts: (player: string, attempt: string) =>
    dispatch(setWrongAttempts(player, attempt)),
  setPossibleDirections: (cell: string) =>
    dispatch(setPossibleDirections(cell)),
  removePossibleDirections: () => dispatch(removePossibleDirections()),
  setAttempts: (player: string) => dispatch(setAttempts(player)),
  setShipsCellsTotal: (obj: any) => dispatch(setShipsCellsTotal(obj)),
  setShipsShadowsCellsTotal: (player: string, obj: any) =>
    dispatch(setShipsShadowsCellsTotal(player, obj)),
  removeShadows: () => dispatch(removeShadows()),
  setPlayAgain: (status: boolean) => dispatch(setPlayAgain(status)),
  setFirstTime: (status: boolean) => dispatch(setFirstTime(status)),
  clearEverything: () => dispatch(clearEverything()),
  setDamagedShip: (ship: string[]) => dispatch(setDamagedShip(ship)),
  setIsBattle: (status: boolean) => dispatch(setIsBattle(status)),
  setScore: (side: string) => dispatch(setScore(side)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
