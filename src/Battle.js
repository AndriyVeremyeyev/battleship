import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import cross from "./images/01.jpg";
import {
  setShip,
  setShipsCells,
  setShipsShadowsCells,
  setLegendLineOne,
  setLegendLineTwo,
  setShipsStatus,
  setWrongAttempts,
  setAttempts,
  setShowComputer,
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

const Battle = ({
  setShip,
  setShipsCells,
  setShipsShadowsCells,
  computer,
  setLegendLineOne,
  setLegendLineTwo,
  player,
  setShipsStatus,
  setShowComputer,
  showComputer,
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
}) => {
  // to generate computer map once battle is mounted
  const [firstRender, setFirstRender] = useState(false);

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
      !firstTime
    ) {
      setLegendLineOne("Unfortunately you lost the game");
      setLegendLineTwo("");
      setPlayAgain(true);
      setIsBattle(false);
      setScore("player");
    }
  }, [player.shipsStatus, firstTime, player.damagedShip]);

  useEffect(() => {
    if (
      Object.values(computer.shipsStatus).every((status) => !status) &&
      !firstTime
    ) {
      setLegendLineOne("Congratulations! You won the game");
      setLegendLineTwo("");
      setPlayAgain(true);
      setScore("computer");
    }
  }, [computer.shipsStatus, firstTime]);

  useEffect(() => {
    if (player.battleShip.length === 4) setFirstTime(false);
  }, [player.battleShip]);

  const [playerAttempt, setPlayerAttempt] = useState("");

  useEffect(() => {
    if (firstRender) {
      setTimeout(() => checkComputerAttempt(), 2000);
    }
  }, [player.damagedShip.length]);

  const cellStyle = {
    height: 50,
    width: 50,
    border: "solid",
    borderWidth: 0.5,
    cursor: "pointer",
  };

  const oneMoreTimeGame = () => {
    clearEverything();
    generateComputerMap();
    setPlayAgain(false);
    setLegendLineOne("Glad that you decided to keep playing in the game");
    setLegendLineTwo(
      "Choose cell on player map to place start point of Battleship"
    );
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
  const considerCellNumber = (cell) => {
    return cell.length === 3 ? cell[1] + cell[2] : cell[1];
  };

  // method to calculate length of ship based on it's name
  const calculateShipLength = (ship) => {
    let shipLength = 1;
    if (ship[0] === "b") shipLength = 4;
    if (ship[0] === "c") shipLength = 3;
    if (ship[0] === "d") shipLength = 2;
    return shipLength;
  };

  // method to determine possible ship directions based on starting point and free cells around
  const whereTurnShip = (obj, ship, firstPoint, shipDirections) => {
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
  const createNeighbourCellsArray = (cell, all = true) => {
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
  const fillShipArrayWithShadows = (shipPosition) => {
    let shipPositionWithShadows = [];
    shipPosition.forEach((pos) => {
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
  const whatTheSide = (side) => (side === "player" ? player : computer);

  // methods to determine neighbour cells
  const upperNeighbour = (cell) => {
    const number = considerCellNumber(cell);
    return `${cell[0]}${Number(number) + 1}`;
  };
  const downNeighbour = (cell) => {
    const number = considerCellNumber(cell);
    return `${cell[0]}${Number(number) - 1}`;
  };
  const leftNeighbour = (cell) => {
    const number = considerCellNumber(cell);
    return `${String.fromCharCode(cell[0].charCodeAt(0) - 1)}${number}`;
  };
  const rightNeighbour = (cell) => {
    const number = considerCellNumber(cell);
    return `${String.fromCharCode(cell[0].charCodeAt(0) + 1)}${number}`;
  };

  // method to determine what the ship based on catched cell, returns ship name
  const whatTheShip = (side, value) => {
    const sideObj = whatTheSide(side);
    let currShip = null;
    shipNames.forEach((ship) => {
      if (sideObj[ship].includes(value)) currShip = ship;
    });
    return currShip;
  };

  // method to determine what the ship index based on ship name
  const whatTheShipIndex = (ship) => {
    let index;
    shipNames.forEach((currShip, currIndex) => {
      if (currShip === ship) index = currIndex;
    });
    return index;
  };

  // method to check was ship completely destroyed or not
  const isShipDestroyed = (side, ship) => {
    const sideObj = whatTheSide(side);
    return sideObj[ship].length === 1 ? true : false;
  };

  // method to remove cell from attempt from corresponding ship array
  // and check was ship completely destroyed or not
  const removeCellFromShip = (side, value) => {
    const currentShip = whatTheShip(side, value);
    const currentIndex = whatTheShipIndex(currentShip);
    removeShipCell(side, currentShip, value);
    if (isShipDestroyed(side, currentShip)) {
      if (side === "player") {
        setLegendLineOne(
          `Oops. Your ${shipNicknames[currentIndex]} was completely destroyed`
        );
        setShipsStatus("player", currentShip, false);
      } else {
        setLegendLineOne(
          `Congratulations! You completely destroyed ${shipNicknames[currentIndex]}`
        );
        setShipsStatus("computer", currentShip, false);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // generate computer ships and all related methods to computer methods

  // method to generate starting point, only checks if point is not occupied
  const generateStartingPoint = (obj) => {
    // generate first attempt of ship starting point
    let startingPoint = randomPosition();
    // if starting point is occupied we need to generate another one
    while (!obj[startingPoint]) {
      startingPoint = randomPosition();
    }
    return startingPoint;
  };

  // method to fill ship array based on choosen direction
  const fillShipArray = (ship, arr, direction) => {
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
  const generateShip = (ship, obj) => {
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
      shipPosition.forEach((pos) => (ships[pos] = false));
      shipPositionWithArrays.forEach((pos) => (shipsShadows[pos] = false));
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
  const guessNextPlayerShipCell = (ship) =>
    ship.length === 1
      ? guessBasedOnOneCell(ship[0])
      : guessBasedOnTwoCells(ship);

  // method to add cells to damaged ship
  const addCellToDamagedShip = (cell) => {
    const { damagedShip } = player;
    if (damagedShip.length === 0) {
      setDamagedShip([cell]);
    } else {
      const direction = determineShipDirection(damagedShip[0], cell);
      const damagedShipCopy = damagedShip;
      let necessaryIndex;
      if (direction === "vertical")
        necessaryIndex = damagedShip.findIndex(
          (currentCell) =>
            Number(considerCellNumber(cell)) <
            Number(considerCellNumber(currentCell))
        );
      if (direction === "horizontal")
        necessaryIndex = damagedShip.findIndex(
          (currentCell) => cell.charCodeAt(0) < currentCell.charCodeAt(0)
        );
      if (necessaryIndex === -1) necessaryIndex = damagedShip.length;
      damagedShipCopy.splice(necessaryIndex, 0, cell);
      setDamagedShip(damagedShipCopy);
    }
  };

  // method to determine ship direction based on ship coordinates
  const determineShipDirection = (firstCell, lastCell) => {
    return firstCell[0] === lastCell[0] ? "vertical" : "horizontal";
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
    setLegendLineOne(`Now is computer's turn. Attempt is: ${currentAttempt}`);
    // check if ship was damaged or not
    if (!player.shipsCells[currentAttempt]) {
      // if ship was damaged
      setLegendLineTwo(`Computer catched some of your ships`);
      setKilledCells("player", currentAttempt);
      const damagedShipName = whatTheShip("player", currentAttempt);
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
          (cell) => (playerShipsShadowsCellsCopy[cell] = false)
        );
        setShipsShadowsCellsTotal("player", playerShipsShadowsCellsCopy);
        setDamagedShip([]);
        if (damagedShipName[0] === "v")
          setTimeout(() => checkComputerAttempt(), 2000);
      } else {
        addCellToDamagedShip(currentAttempt);
      }
    } else {
      setLegendLineTwo("Computer missed all of your ships");
    }
  };

  // method to provide random neighbour cell based on one cell
  const guessBasedOnOneCell = (cell) => {
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
  const guessBasedOnTwoCells = (ship) => {
    const direction = determineShipDirection(ship[0], ship[ship.length - 1]);
    const neighbourCells = [];
    if (direction === "vertical") {
      neighbourCells.push(
        `${ship[0][0]}${Number(considerCellNumber(ship[0])) - 1}`
      );
      neighbourCells.push(
        `${ship[0][0]}${Number(considerCellNumber(ship[ship.length - 1])) + 1}`
      );
    }
    if (direction === "horizontal") {
      const thisCellNumber = considerCellNumber(ship[0]);
      neighbourCells.push(
        `${String.fromCharCode(ship[0].charCodeAt(0) - 1)}${thisCellNumber}`
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

  useEffect(() => {
    console.log("player possibleDirections", player.possibleDirections);
  }, [player.possibleDirections]);

  useEffect(() => {
    console.log("player shipsCells", player.shipsCells);
  }, [player.shipsCells]);

  useEffect(() => {
    console.log("player shipsShadowCells", player.shipsShadowCells);
  }, [player.shipsShadowCells]);

  // method to place player's ship on map
  const placePlayerShipOnMap = (cellNumber) => {
    shipNames.forEach((ship, index) => {
      // check if cell is not occupied already
      if (player.shipsCells[cellNumber]) {
        if (
          (index === 0 && player[ship]?.length < shipLengths[index]) ||
          (index > 0 &&
            player[shipNames[index - 1]]?.length === shipLengths[index - 1] &&
            player[ship]?.length < shipLengths[index])
        ) {
          setShip("player", shipNames[index], [cellNumber]);
          setShipsCells("player", cellNumber);
          if (player[ship]?.length === shipLengths[index] - 1) {
            const currentShipShadow = fillShipArrayWithShadows([
              ...player[ship],
              cellNumber,
            ]);
            currentShipShadow.forEach((cell) =>
              setShipsShadowsCells("player", cell)
            );
          }
          if (player[ship]?.length === 0 && index < 6) {
            const directions = whereTurnShip(
              player.shipsShadowsCells,
              ship,
              cellNumber,
              direction
            );
            directions.forEach((dir) =>
              fillPossibleDirection(ship, [cellNumber], dir)
            );
          }
          if (player[ship]?.length === 1 && index < 6) {
            removePossibleDirections();
            const dir = determineDirection(player[ship][0], cellNumber);
            fillPossibleDirection(ship, [player[ship][0]], dir);
          }
        }
      }
    });
  };

  // method to check was attempt wrong or not
  const checkPlayerAttempt = (value) => {
    const correctedValue = value.toLowerCase();
    setLegendLineTwo("");
    setAttempts("player");
    if (player.wrongAttempts[value]) {
      setLegendLineOne("You already tried this cell");
      setLegendLineTwo("Please provide cell from existing range of cells");
    } else if (computer.shipsCells[correctedValue] === undefined) {
      setLegendLineOne("Provided cell doesn't exist");
      setLegendLineTwo("Please provide cell from existing range of cells");
    } else {
      setWrongAttempts("player", correctedValue);
      if (!computer.shipsCells[correctedValue]) {
        setLegendLineOne("Nice job. You catch the ship");
        setLegendLineTwo("You have one more try to catch enemy ship");
        setKilledCells("computer", correctedValue);
        removeCellFromShip("computer", correctedValue);
      } else {
        setLegendLineOne("You missed any of ships");
        setLegendLineTwo("");
        setTimeout(() => {
          checkComputerAttempt();
        }, 2000);
      }
    }
  };

  // method to fill possible directions
  const fillPossibleDirection = (ship, cell, direction) => {
    const shipPosition = fillShipArray(ship, cell, direction);
    shipPosition.forEach((shipCell, cellIndex) => {
      if (cellIndex > 0) setPossibleDirections(shipCell);
    });
  };

  // method to determine ship direction based on started and second points
  const determineDirection = (cellFirst, cellSecond) => {
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
      if (player[ship]?.length === shipLengths[index]) {
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

  const killPlayer = () => {
    shipNames.forEach((ship) => setShipsStatus("player", ship, false));
    setFirstTime(false);
  };

  const killComputer = () => {
    shipNames.forEach((ship) => setShipsStatus("computer", ship, false));
    setFirstTime(false);
  };

  const shipsCondition = (side) => {
    const condition = (ship, index) => {
      let response = "";
      if (side[ship].length === shipLengths[index]) response = "undamaged";
      else if (side[ship].length === 0) response = "destroyed";
      else response = "damaged";
      return response;
    };

    return (
      <React.Fragment>
        {shipNicknames.map((ship, index) => {
          return (
            <Typography
              key={`shipsCondition${ship}${index}`}
              variant="subtitle2"
            >{`${index + 1}.${ship}: ${condition(
              shipNames[index],
              index
            )}`}</Typography>
          );
        })}
      </React.Fragment>
    );
  };

  const showPlayAgainBlock = () => {
    return (
      <Grid item>
        <Typography variant="subtitle1" style={{ marginBottom: 20 }}>
          Do you want to play one more time?
        </Typography>
        <Grid container direction="row" spacing={5} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={oneMoreTimeGame}
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("Don't want to play");
              }}
            >
              No
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const map = (side) => {
    return (
      <React.Fragment>
        <Typography variant="h4">{side}</Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          {columns.map((x) => {
            return (
              <Grid item key={x}>
                <Grid container direction="row">
                  {rows.map((y) => {
                    const cellNumber = `${y}${x}`;
                    const cellColor = () => {
                      if (side === "player") {
                        if (player.shipsCells && !player.shipsCells[`${y}${x}`])
                          return "#696969";
                        if (
                          (player.possibleDirections &&
                            player.possibleDirections[`${y}${x}`]) ||
                          computer.wrongAttempts[`${y}${x}`]
                        )
                          return "#D3D3D3";
                        if (!player.shipsShadowsCells[`${y}${x}`])
                          return "#DCDCDC";
                      }
                      if (side === "computer") {
                        if (showComputer) {
                          if (!computer.shipsCells[`${y}${x}`])
                            return "#696969";
                          if (!computer.shipsShadowsCells[`${y}${x}`])
                            return "#D3D3D3";
                        } else {
                          if (player.wrongAttempts[`${y}${x}`])
                            return "#D3D3D3";
                        }
                      }
                      return null;
                    };
                    return (
                      <Grid
                        item
                        key={cellNumber}
                        style={{
                          ...cellStyle,
                          backgroundColor: cellColor(),
                          backgroundSize: "cover",
                          backgroundImage: `url(${
                            (side === "computer" &&
                              computer.killedCells[cellNumber] === true) ||
                            (side === "player" &&
                              player.killedCells[cellNumber] === true)
                              ? cross
                              : null
                          })`,
                        }}
                        onClick={
                          side === "player"
                            ? () => placePlayerShipOnMap(cellNumber)
                            : null
                        }
                      >
                        {cellNumber}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Grid
        container
        style={{ marginBottom: 20 }}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h5">Score:</Typography>
          <Typography variant="h5">
            {score[0]}:{score[1]}
          </Typography>
        </Grid>
        {playAgain && !firstTime ? showPlayAgainBlock() : null}
      </Grid>
      <Grid container direction="row" spacing={5} justify="center">
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {map("player")}
            {isBattle ? (
              <React.Fragment>
                <Grid item style={{ marginTop: 20 }}>
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
                  <Typography
                    style={{ marginTop: 20 }}
                    variant="h6"
                  >{`Quantity of your attempts: ${player.attempts}`}</Typography>
                </Grid>
                <Grid item style={{ marginTop: 20 }}>
                  {shipsCondition(player)}
                </Grid>
              </React.Fragment>
            ) : null}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={killPlayer}
                style={{ marginTop: 20 }}
              >
                Kill player
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {map("computer")}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={killComputer}
                style={{ marginTop: 20 }}
              >
                Kill computer
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={setShowComputer}
              >
                {showComputer ? "Hide Ships" : "Show Ships"}
              </Button>
            </Grid>
          </Grid>
          <Typography
            style={{ marginTop: 20 }}
            variant="h6"
          >{`Quantity of computer attempts: ${computer.attempts}`}</Typography>
          <Grid item>{shipsCondition(computer)}</Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const {
    player,
    computer,
    showComputer,
    playAgain,
    firstTime,
    isBattle,
    score,
  } = state;
  return {
    player,
    computer,
    showComputer,
    playAgain,
    firstTime,
    isBattle,
    score,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setShip: (player, ship, position) =>
    dispatch(setShip(player, ship, position)),
  setShipsCells: (player, cell, status) =>
    dispatch(setShipsCells(player, cell, status)),
  setShipsShadowsCells: (player, cell, status) =>
    dispatch(setShipsShadowsCells(player, cell, status)),
  setLegendLineTwo: (lelend) => dispatch(setLegendLineTwo(lelend)),
  setLegendLineOne: (lelend) => dispatch(setLegendLineOne(lelend)),
  setShowComputer: () => dispatch(setShowComputer()),
  setShipsStatus: (player, ship, status) =>
    dispatch(setShipsStatus(player, ship, status)),
  setKilledCells: (player, cell) => dispatch(setKilledCells(player, cell)),
  removeShipCell: (player, ship, cell) =>
    dispatch(removeShipCell(player, ship, cell)),
  setWrongAttempts: (player, attempt) =>
    dispatch(setWrongAttempts(player, attempt)),
  setPossibleDirections: (cell) => dispatch(setPossibleDirections(cell)),
  removePossibleDirections: () => dispatch(removePossibleDirections()),
  setAttempts: (player) => dispatch(setAttempts(player)),
  setShipsCellsTotal: (obj) => dispatch(setShipsCellsTotal(obj)),
  setShipsShadowsCellsTotal: (player, obj) =>
    dispatch(setShipsShadowsCellsTotal(player, obj)),
  removeShadows: () => dispatch(removeShadows()),
  setPlayAgain: (status) => dispatch(setPlayAgain(status)),
  setFirstTime: (status) => dispatch(setFirstTime(status)),
  clearEverything: () => dispatch(clearEverything()),
  setDamagedShip: (ship) => dispatch(setDamagedShip(ship)),
  setIsBattle: (status) => dispatch(setIsBattle(status)),
  setScore: (side) => dispatch(setScore(side)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
