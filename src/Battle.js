import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  setComputerShip,
  setComputerCells,
  changeColor,
} from "./actions/index";
import { rows, columns, shipNames, shipTypes, direction } from "./database";

const Battle = ({
  setComputerShip,
  setComputerCells,
  freeCells,
  changeColor,
  color,
}) => {
  const cellStyle = {
    height: 50,
    width: 50,
    border: "solid",
    borderWidth: 0.5,
  };

  const shipStyle = {
    height: 50,
    width: 100,
    border: "solid",
    borderWidth: 0.5,
    paddingTop: 10,
  };

  const vasya = (number) => {
    console.log(number);
  };

  const randomPosition = () => {
    const randomLetter = rows[Math.floor(Math.random() * rows.length)];
    const randomNumber = columns[Math.floor(Math.random() * columns.length)];
    return randomLetter + randomNumber;
  };

  const calculateShipLength = (ship) => {
    let shipLength = 1;
    if (ship[0] === "b") shipLength = 4;
    if (ship[0] === "c") shipLength = 3;
    if (ship[0] === "d") shipLength = 2;
    return shipLength;
  };

  const placeShipOnMap = (ship, arr, direction) => {
    console.log(direction);
    const number = arr[0].length === 3 ? arr[0][1] + arr[0][2] : arr[0][1];
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

  const whereTurnShip = (ship, firstPoint, shipDirection) => {
    const shipLength = calculateShipLength(ship);
    const number =
      firstPoint.length === 3 ? firstPoint[1] + firstPoint[2] : firstPoint[1];
    for (let i = 1; i < shipLength; i++) {
      // console.log("Up:", !freeCells[`${firstPoint[0]}${Number(number) - i}`]);
      if (!freeCells[`${firstPoint[0]}${Number(number) - i}`])
        shipDirection = shipDirection.filter((x) => x !== "up");
      // console.log("Down:", !freeCells[`${firstPoint[0]}${Number(number) + i}`]);
      if (!freeCells[`${firstPoint[0]}${Number(number) + i}`])
        shipDirection = shipDirection.filter((x) => x !== "down");
      // console.log(
      //   "Left:",
      //   `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`
      // );
      // console.log(
      //   "Left:",
      //   !freeCells[
      //     `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`
      //   ]
      // );
      if (
        !freeCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "left");
      // console.log(
      //   "Right:",
      //   `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`
      // );
      // console.log(
      //   "Right:",
      //   !freeCells[
      //     `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`
      //   ]
      // );
      if (
        !freeCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "right");
    }

    return shipDirection;
  };

  const addShipToDatabase = (shipPosition) => {
    shipPosition.forEach((x) => {
      if (freeCells[x]) setComputerCells(x);
      // if (freeCells[`${x[0]}${Number(x[1]) + 1}`])
      //   setComputerCells([`${x[0]}${Number(x[1]) + 1}`]);
      // if (freeCells[`${x[0]}${Number(x[1]) - 1}`])
      //   freeCells[`${x[0]}${Number(x[1]) - 1}`] = false;
      // if (freeCells[`${x[0]}${Number(x[1]) + 1}`])
      //   freeCells[`${x[0]}${Number(x[1]) + 1}`] = false;
      // if (freeCells[`${x[0]}${Number(x[1]) - 1}`])
      //   freeCells[`${x[0]}${Number(x[1]) - 1}`] = false;
      // if (freeCells[`${String.fromCharCode(x[0].charCodeAt(0) - 1)}${x[1]}`])
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${x[1]}`
      //   ] = false;
      // if (freeCells[`${String.fromCharCode(x[0].charCodeAt(0) + 1)}${x[1]}`])
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${x[1]}`
      //   ] = false;
      // if (
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) - 1}`
      //   ]
      // )
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) - 1}`
      //   ] = false;
      // if (
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) + 1}`
      //   ]
      // )
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) + 1}`
      //   ] = false;
      // if (
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) - 1}`
      //   ]
      // )
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) - 1}`
      //   ] = false;
      // if (
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) + 1}`
      //   ]
      // )
      //   freeCells[
      //     `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) + 1}`
      //   ] = false;
    });
  };

  const generateShip = (ship) => {
    // generate first cell of first ship
    let firstShipCell = randomPosition();
    let shipPosition = [];
    let shipPossibleDirections = whereTurnShip(ship, firstShipCell, direction);
    let whileNumber = 0;
    console.log(shipPossibleDirections.length);
    // make sure that cell is not occupied and you can turn ship somewhere
    console.log(`First option of first cell of ${ship}:`, firstShipCell);
    console.log(!freeCells[firstShipCell]);
    // Object.values(freeCells).forEach((x) => console.log(x));
    if (ship[0] === "v") {
      while (!freeCells[firstShipCell]) {
        firstShipCell = randomPosition();
      }
    } else {
      while (
        !freeCells[firstShipCell] ||
        (freeCells[firstShipCell] && shipPossibleDirections.length === 0)
      ) {
        firstShipCell = randomPosition();
        shipPossibleDirections = whereTurnShip(
          ship,
          firstShipCell,
          shipPossibleDirections
        );
        whileNumber++;
        if (whileNumber > 10) return;
      }
    }
    shipPosition.push(firstShipCell);
    console.log(`Last option of first cell of ${ship}:`, firstShipCell);
    // add cell to array of ship coordinats
    // check how we can turn the ship on map

    // if ship is vedette we don't need to turn it and to add more cells
    if (ship[0] !== "v") {
      console.log(shipPossibleDirections);
      // choose random direction of ship
      const shipDirection =
        shipPossibleDirections[
          Math.floor(Math.random() * shipPossibleDirections.length)
        ];
      // add rest of ship coordinates to array
      shipPosition = placeShipOnMap(ship, shipPosition, shipDirection);
    }
    setComputerShip(ship, shipPosition);
    console.log(shipPosition);
    // console.log("Object in state", freeCells);
    // add ship to database of free cells to consider ship posiiton and ship borders
    addShipToDatabase(shipPosition);
  };

  const generateComputer = () => {
    generateShip("battleship");
    // shipNames.forEach((ship) => generateShip(ship));
  };

  const map = (player, button = false) => {
    return (
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4">{player}</Typography>
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
                      const nameClass = `${player}${cellNumber}`;
                      return (
                        <Grid
                          item
                          key={cellNumber}
                          style={{
                            ...cellStyle,
                            backgroundColor:
                              player === "computer" && freeCells[`${y}${x}`]
                                ? "white"
                                : "grey",
                          }}
                          className={nameClass}
                          onClick={() => vasya(cellNumber)}
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
          {button ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={generateComputer}
            >
              Generate Computer
            </Button>
          ) : null}
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={5} justify="center">
        {map("player")}
        {map("computer", true)}
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 20 }}
      >
        {shipTypes.map((x) => {
          return (
            <Grid item key={x} style={shipStyle} onClick={() => console.log(x)}>
              <Grid container direction="row" justify="center">
                <Typography variant="subtitle1">{x}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid
          item
          style={{
            height: 100,
            width: 100,
            marginTop: 20,
            border: "solid",
            borderWidth: 0.5,
            backgroundColor: color ? "green" : "red",
          }}
        ></Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={changeColor}
        >
          Change color
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const {
    computer: { freeCells },
  } = state;
  return { freeCells };
};

const mapDispatchToProps = (dispatch) => ({
  setComputerShip: (ship, position) =>
    dispatch(setComputerShip(ship, position)),
  setComputerCells: (cell) => dispatch(setComputerCells(cell)),
  changeColor: () => dispatch(changeColor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
