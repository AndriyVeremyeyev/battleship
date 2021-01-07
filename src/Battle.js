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
  removeShips,
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
  removeShips,
}) => {
  // to generate computer map once battle is mounted
  useEffect(() => {
    generateComputerMap();
  }, []);

  // to monitor changes in
  useEffect(() => {
    drawPossibleDirections();
  }, [player.shipsCells]);

  useEffect(() => {
    if (Object.values(player.shipsStatus).every((ship) => ship))
      removeShadows("player");
    if (Object.values(player.shipsStatus).every((ship) => !ship)) {
      setLegendLineOne("Congratulations! You won the game");
      setLegendLineTwo("");
      setPlayAgain();
      console.log(playAgain);
    }
  }, [player.shipsStatus]);

  const [value, setValue] = useState("");

  const cellStyle = {
    height: 50,
    width: 50,
    border: "solid",
    borderWidth: 0.5,
    cursor: "pointer",
  };

  const oneMoreTimeGame = () => {
    removeShips("player");
    removeShips("computer");
    removeShadows("computer");
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

  // create array of ship cells together with shadows based on ship array
  const fillShipArrayWithShadows = (shipPosition, obj) => {
    const shipPositionWithShadows = [];
    shipPosition.forEach((pos) => {
      const number = considerCellNumber(pos);
      const neighbourCells = [
        pos,
        `${pos[0]}${Number(number) + 1}`,
        `${pos[0]}${Number(number) - 1}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) - 1)}${number}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) + 1)}${number}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) - 1)}${Number(number) - 1}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) - 1)}${Number(number) + 1}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) + 1)}${Number(number) - 1}`,
        `${String.fromCharCode(pos[0].charCodeAt(0) + 1)}${Number(number) + 1}`,
      ];
      neighbourCells.forEach((cell) => {
        if (obj[cell]) shipPositionWithShadows.push(cell);
      });
    });
    // return only unique cells
    return [...new Set(shipPositionWithShadows)];
  };

  // method to return corresponding object based on string
  const whatTheSide = (side) => {
    return side === "player" ? player : computer;
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // generate computer ships and all related methods

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
      const shipPositionWithArrays = fillShipArrayWithShadows(
        shipPosition,
        shipsShadows
      );
      shipPosition.forEach((pos) => (ships[pos] = false));
      shipPositionWithArrays.forEach((pos) => (shipsShadows[pos] = false));
    });
    // pass objects with information to corresponding reducers
    setShipsCellsTotal(ships);
    setShipsShadowsCellsTotal(shipsShadows);
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  // methods for player playing

  // method to place player's ship on map
  const placePlayerShipOnMap = (cellNumber) => {
    shipNames.forEach((ship, index) => {
      // check if cell is not occupied already
      if (player.shipsShadowsCells[cellNumber]) {
        if (
          (index === 0 && player[ship]?.length < shipLengths[index]) ||
          (index > 0 &&
            player[shipNames[index - 1]]?.length === shipLengths[index - 1] &&
            player[ship]?.length < shipLengths[index])
        ) {
          setShip("player", shipNames[index], [cellNumber]);
          setShipsCells("player", cellNumber);
          if (player[ship]?.length === shipLengths[index] - 1) {
            const currentShipShadow = fillShipArrayWithShadows(
              [...player[ship], cellNumber],
              player.shipsShadowsCells
            );
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
    console.log("player attempt");
    const correctedValue = value.toLowerCase();
    setLegendLineTwo("");
    setAttempts("player");
    if (computer.shipsCells[correctedValue] === undefined) {
      setLegendLineOne("Provided cell doesn't exist");
      setLegendLineTwo("Please provide cell from existing range of cells");
    } else {
      if (!computer.shipsCells[correctedValue]) {
        setLegendLineOne("Nice job. You catch the ship");
        setLegendLineTwo("You have one more try to catch enemy ship");
        setKilledCells("computer", correctedValue);
        checkShip("computer", correctedValue);
      } else {
        setLegendLineOne("You missed any of ships");
        setLegendLineTwo("");
        if (!player.wrongAttempts[value])
          setWrongAttempts("player", correctedValue);
        setTimeout(() => {
          checkComputerAttempt();
        }, 2000);
      }
    }
  };

  // method for computer attempt after player attempt
  const checkComputerAttempt = () => {
    console.log("computer attempt");
    let computerAttempt = randomPosition();
    console.log(computer.wrongAttempts);
    while (computer.wrongAttempts[computerAttempt]) {
      console.log(computerAttempt);
      computerAttempt = randomPosition();
    }
    console.log(computerAttempt);
    setWrongAttempts("computer", computerAttempt);
    setAttempts("computer");
    setLegendLineOne(`Now is computer's turn. Attempt is: ${computerAttempt}`);
    if (!player.shipsCells[computerAttempt]) {
      setLegendLineTwo(`Computer catched some of your ships`);
      setKilledCells("player", computerAttempt);
      checkShip("player", computerAttempt);
      setTimeout(() => {
        checkComputerAttempt();
      }, 2000);
    } else {
      setLegendLineTwo("Computer missed all of your ships");
      if (!computer.wrongAttempts[computerAttempt])
        setWrongAttempts("computer", computerAttempt);
    }
  };

  // method to remove cell from attempt from corresponding ship array
  // and check was ship completely destroyed or not
  const checkShip = (side, value) => {
    const sideObj = whatTheSide(side);
    shipNames.forEach((ship, index) => {
      if (sideObj[ship].includes(value)) {
        removeShipCell(side, ship, value);
        if (sideObj[ship].length === 1) {
          if (side === "player")
            setLegendLineOne(
              `Oops. Your ${shipNicknames[index]} was completely destroyed`
            );
          else
            setLegendLineOne(
              `Congratulations! You completely destroyed ${shipNicknames[index]}`
            );
        }
      }
    });
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
              onClick={console.log("Don't want to play")}
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
        {playAgain ? showPlayAgainBlock() : null}
      </Grid>
      <Grid container direction="row" spacing={5} justify="center">
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {map("player")}
            {Object.values(player.shipsStatus).every((x) => x) ? (
              <React.Fragment>
                <Grid item style={{ marginTop: 20 }}>
                  <Grid container direction="row" spacing={2} justify="center">
                    <Grid item>
                      <TextField
                        variant="outlined"
                        style={{ width: 70, height: 10 }}
                        onChange={(event) => setValue(event.target.value)}
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 10 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => checkPlayerAttempt(value)}
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
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {map("computer")}
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
  const { player, computer, showComputer, playAgain } = state;
  return { player, computer, showComputer, playAgain };
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
  setShipsShadowsCellsTotal: (obj) => dispatch(setShipsShadowsCellsTotal(obj)),
  removeShadows: (player) => dispatch(removeShadows(player)),
  setPlayAgain: () => dispatch(setPlayAgain()),
  removeShips: (player) => dispatch(removeShips(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
