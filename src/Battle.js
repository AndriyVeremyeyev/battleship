import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { setFilledPositions, setComputerBattleship } from "./actions/index";
import { rows, columns, ships, direction, freeCells } from "./database";

const Battle = ({
  computerShips,
  setFilledPositions,
  setComputerBattleship,
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
    if (ship === "battleship") shipLength = 4;
    if (ship === "cruiser") shipLength = 3;
    if (ship === "destroyer") shipLength = 2;
    return shipLength;
  };

  const placeShipOnMap = (ship, arr, direction) => {
    console.log(direction);
    const number = arr[0].length === 3 ? arr[0][1] + arr[0][2] : arr[0][1];
    const shipLength = calculateShipLength(ship);
    if (direction === "up") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(`${arr[0][0]}${Number(arr[0][1]) - i}`);
      }
    }
    if (direction === "down") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(`${arr[0][0]}${Number(arr[0][1]) + i}`);
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
    for (let i = 1; i < shipLength; i++) {
      if (!freeCells[`${firstPoint[0]}${Number(firstPoint[1]) - i}`])
        shipDirection = shipDirection.filter((x) => x !== "up");
      if (!freeCells[`${firstPoint[0]}${Number(firstPoint[1]) + i}`])
        shipDirection = shipDirection.filter((x) => x !== "down");
      if (
        !freeCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${
            firstPoint[1]
          }`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "left");
      if (
        !freeCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${
            firstPoint[1]
          }`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "right");
    }

    return shipDirection;
  };

  const addShipToDatabase = (shipPosition) => {
    shipPosition.forEach((x) => {
      freeCells[x] = false;
      if (freeCells[`${x[0]}${Number(x[1]) + 1}`])
        freeCells[`${x[0]}${Number(x[1]) + 1}`] = false;
      if (freeCells[`${x[0]}${Number(x[1]) - 1}`])
        freeCells[`${x[0]}${Number(x[1]) - 1}`] = false;
      if (freeCells[`${x[0]}${Number(x[1]) + 1}`])
        freeCells[`${x[0]}${Number(x[1]) + 1}`] = false;
      if (freeCells[`${x[0]}${Number(x[1]) - 1}`])
        freeCells[`${x[0]}${Number(x[1]) - 1}`] = false;
      if (freeCells[`${String.fromCharCode(x[0].charCodeAt(0) - 1)}${x[1]}`])
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${x[1]}`
        ] = false;
      if (freeCells[`${String.fromCharCode(x[0].charCodeAt(0) + 1)}${x[1]}`])
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${x[1]}`
        ] = false;
      if (
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) - 1}`
        ]
      )
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) - 1}`
        ] = false;
      if (
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) + 1}`
        ]
      )
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(x[1]) + 1}`
        ] = false;
      if (
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) - 1}`
        ]
      )
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) - 1}`
        ] = false;
      if (
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) + 1}`
        ]
      )
        freeCells[
          `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(x[1]) + 1}`
        ] = false;
    });
  };

  const generateShip = (ship) => {
    // generate first cell of first ship
    let firstShipCell = randomPosition();
    let shipPosition = [];
    let shipPossibleDirections = direction;
    // make sure that cell is not occupied
    while (!freeCells[firstShipCell]) {
      firstShipCell = randomPosition();
    }
    console.log(firstShipCell);
    // add cell to array of ship coordinats
    shipPosition.push(firstShipCell);
    // check how we can turn the ship on map

    // if ship is vedette we don't need to turn it and to add more cells
    if (ship !== "vedette") {
      shipPossibleDirections = whereTurnShip(
        ship,
        firstShipCell,
        shipPossibleDirections
      );
      console.log(shipPossibleDirections);
      // choose random direction of ship
      const shipDirection =
        shipPossibleDirections[
          Math.floor(Math.random() * shipPossibleDirections.length)
        ];
      // add rest of ship coordinates to array
      shipPosition = placeShipOnMap(ship, shipPosition, shipDirection);
    }
    console.log(shipPosition);
    // add ship to database of free cells to consider ship posiiton and ship borders
    addShipToDatabase(shipPosition);
    console.log(freeCells);
  };

  const generateComputer = () => {
    generateShip("battleship");
    generateShip("cruiser");
    generateShip("cruiser");
    for (let i = 1; i <= 3; i++) {
      generateShip("destroyer");
    }
    for (let i = 1; i <= 4; i++) {
      generateShip("vedette");
    }
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
                          style={cellStyle}
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
        {ships.map((x) => {
          return (
            <Grid item key={x} style={shipStyle} onClick={() => console.log(x)}>
              <Grid container direction="row" justify="center">
                <Typography variant="subtitle1">{x}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { computerShips } = state;
  return { computerShips };
};

const mapDispatchToProps = (dispatch) => ({
  setComputerBattleship: (position) =>
    dispatch(setComputerBattleship(position)),
  setFilledPositions: (database) => dispatch(setFilledPositions(database)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
