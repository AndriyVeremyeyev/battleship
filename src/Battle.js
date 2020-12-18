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
          `${String.fromCharCode(arr[0][0].charCodeAt(0) - i)}${arr[0][1]}`
        );
      }
    }
    if (direction === "right") {
      for (let i = 1; i < shipLength; i++) {
        arr.push(
          `${String.fromCharCode(arr[0][0].charCodeAt(0) + i)}${arr[0][1]}`
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

  const generateComputer = () => {
    let battleshipPosition = [];
    let occupiedPositions = [];
    // generate first point of first ship - battleship
    let firstBattleshipPoint = randomPosition();
    console.log("First point of battleship", firstBattleshipPoint);
    battleshipPosition.push(firstBattleshipPoint);
    let battleshipDirection = direction;
    // check how is possible to position the battleship
    battleshipDirection = whereTurnShip(
      "battleship",
      firstBattleshipPoint,
      battleshipDirection
    );
    // generate direction of position of battleship
    const randomBattleshipDirection =
      battleshipDirection[
        Math.floor(Math.random() * battleshipDirection.length)
      ];
    // position battleship on map
    battleshipPosition = placeShipOnMap(
      "battleship",
      battleshipPosition,
      randomBattleshipDirection
    );
    console.log("Battleship coordinats", battleshipPosition);
    // setComputerBattleship(battleshipPosition);
    // add battleship to database of free cells
    addShipToDatabase(battleshipPosition);
    // setFilledPositions(occupiedPositions);

    // generate first point of first cruiser
    let cruiserFirstPoint = randomPosition();
    console.log("Cruiser First point before check", cruiserFirstPoint);
    while (freeCells[cruiserFirstPoint]) {
      cruiserFirstPoint = randomPosition();
    }
    console.log("Cruiser First point after check", cruiserFirstPoint);
    // check how is possible to position the first cruiser
    let cruiserFirstDirection = direction;
    let cruiserFirstPosition = [];
    cruiserFirstDirection = whereTurnShip(
      "cruiser",
      cruiserFirstPoint,
      cruiserFirstDirection
    );
    // generate direction of position of cruiser
    const randomCruiserFirstDirection =
      cruiserFirstDirection[
        Math.floor(Math.random() * cruiserFirstDirection.length)
      ];
    // position cruiser on map
    cruiserFirstPosition = placeShipOnMap(
      "cruiser",
      cruiserFirstPosition,
      randomCruiserFirstDirection
    );
    console.log("Cruiser coordinats", cruiserFirstPosition);
    console.log("Database of cells", freeCells);
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
