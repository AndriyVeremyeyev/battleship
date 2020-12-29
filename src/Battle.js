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
  setInput,
  setSillyButtons,
  setShipsStatus,
  setWrongAttempts,
  setAttempts,
  setShowComputer,
  setKilledCells,
  removeShipCell,
  setPossibleDirections,
  removePossibleDirections,
} from "./actions/index";
import {
  rows,
  columns,
  shipNames,
  direction,
  shipLengths,
  shipNicknames,
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
  setSillyButtons,
  setInput,
  sillyButtons,
  setShipsStatus,
  setShowComputer,
  showComputer,
  setKilledCells,
  removeShipCell,
  setWrongAttempts,
  setPossibleDirections,
  removePossibleDirections,
}) => {
  const [value, setValue] = useState("");

  const cellStyle = {
    height: 50,
    width: 50,
    border: "solid",
    borderWidth: 0.5,
    cursor: "pointer",
  };

  // method to check was attempt wrong or not
  // need to refactor for computer attempt as well
  const checkPlayerAttempt = (value) => {
    setLegendLineTwo("");
    if (computer.shipsCells[value] === undefined) {
      setLegendLineOne("Provided cell doesn't exist");
      setLegendLineTwo("Please provide cell from existing range of cells");
      setAttempts("player");
    } else {
      if (!computer.shipsCells[value]) {
        setLegendLineOne("You catch the ship");
        setKilledCells("computer", value);
        checkShip(value);
      } else {
        if (!computer.wrongAttempts.some((cell) => cell)) {
          setLegendLineOne("You missed any of ships");
          setWrongAttempts("player", value);
          setAttempts("player");
        }
      }
    }
  };

  // method to remove cell from attempt from corresponding ship array
  // and check was ship completely destroyed or not
  const checkShip = (value) => {
    shipNames.forEach((ship, index) => {
      if (computer[ship].includes(value)) {
        console.log(computer[ship]);
        removeShipCell("computer", ship, value);
        console.log(computer[ship].length);
        if (computer[ship].length === 1) {
          setLegendLineOne(
            `Congratulations! You completely destroyed ${shipNicknames[index]}`
          );
        }
      }
    });
  };

  // method to generate random position on map
  const randomPosition = () => {
    const randomLetter = rows[Math.floor(Math.random() * rows.length)];
    const randomNumber = columns[Math.floor(Math.random() * columns.length)];
    return randomLetter + randomNumber;
  };

  // method to calculate length of ship based on it's name
  const calculateShipLength = (ship) => {
    let shipLength = 1;
    if (ship[0] === "b") shipLength = 4;
    if (ship[0] === "c") shipLength = 3;
    if (ship[0] === "d") shipLength = 2;
    return shipLength;
  };

  // method to place player's ship on map
  const placePlayerShipOnMap = (cellNumber) => {
    shipNames.forEach((ship, index) => {
      if (player.shipsCells[cellNumber]) {
        if (
          (index === 0 && player[ship]?.length < shipLengths[index]) ||
          (index > 0 &&
            player[shipNames[index - 1]]?.length === shipLengths[index - 1] &&
            player[ship]?.length < shipLengths[index])
        ) {
          setShip("player", shipNames[index], [cellNumber]);
          setShipsCells("player", cellNumber);
          if (player[ship]?.length === 0 && index < 6) {
            const directions = whereTurnShip(
              player,
              ship,
              cellNumber,
              direction
            );
            directions.forEach((dir) => {
              const shipPos = fillShipArray(ship, [cellNumber], dir);
              shipPos.forEach((cell, cellIndex) => {
                if (cellIndex > 0) setPossibleDirections(cell);
              });
            });
          }
          if (player[ship]?.length === 1 && index < 6) {
            removePossibleDirections();
            const dir = determineDirection(player[ship][0], cellNumber);
            const shipPos = fillShipArray(ship, [player[ship][0]], dir);
            console.log(dir);
            console.log(shipPos);
            shipPos.forEach((cell, cellIndex) => {
              if (cellIndex > 1) setPossibleDirections(cell);
            });
          }
        }
      }
    });
  };

  // method to determine number part of cell consist of 1 or 2 digits (e.g d9 or d10)
  const excludeCellNumber = (cell) => {
    return cell.length === 3 ? cell[1] + cell[2] : cell[1];
  };

  // method to determine ship direction based on started and second points
  const determineDirection = (cellFirst, cellSecond) => {
    const cellFirstNumber = excludeCellNumber(cellFirst);
    const cellSecondNumber = excludeCellNumber(cellSecond);
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

  // to monitor changes in
  useEffect(() => {
    drawPossibleDirections();
  }, [player.shipsCells]);

  // method to fill ship array based on choosen direction
  const fillShipArray = (ship, arr, direction) => {
    // console.log(direction);
    const number = excludeCellNumber(arr[0]);
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

  // method to determine possible ship directions based on free cells
  // reorganize to be universal for player and for computer as well
  const whereTurnShip = (side, ship, firstPoint, shipDirections) => {
    const shipLength = calculateShipLength(ship);
    const number = excludeCellNumber(firstPoint);
    for (let i = 1; i < shipLength; i++) {
      if (!side.shipsShadowsCells[`${firstPoint[0]}${Number(number) - i}`])
        shipDirections = shipDirections.filter((x) => x !== "up");
      if (!side.shipsShadowsCells[`${firstPoint[0]}${Number(number) + i}`])
        shipDirections = shipDirections.filter((x) => x !== "down");
      if (
        !side.shipsShadowsCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`
        ]
      )
        shipDirections = shipDirections.filter((x) => x !== "left");
      if (
        !side.shipsShadowsCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`
        ]
      )
        shipDirections = shipDirections.filter((x) => x !== "right");
    }

    return shipDirections;
  };

  const setCertainShadow = (cell) => {
    if (computer.shipsShadowsCells[cell])
      setShipsShadowsCells("computer", cell);
  };

  // method to add ship to database together with it's shadow
  const addShipToDatabase = (shipPosition) => {
    shipPosition.forEach((x) => {
      const number = x.length === 3 ? x[1] + x[2] : x[1];
      setShipsCells("computer", x);
      setCertainShadow();

      setShipsShadowsCells("computer", x);
      setCertainShadow(`${x[0]}${Number(number) + 1}`);

      const neighbourCells = [
        `${x[0]}${Number(number) + 1}`,
        `${x[0]}${Number(number) - 1}`,
        `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${number}`,
        `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${number}`,
        `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(number) - 1}`,
        `${String.fromCharCode(x[0].charCodeAt(0) - 1)}${Number(number) + 1}`,
        `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(number) - 1}`,
        `${String.fromCharCode(x[0].charCodeAt(0) + 1)}${Number(number) + 1}`,
      ];

      neighbourCells.forEach((cell) => setCertainShadow(cell));
    });
  };

  const generateShip = (ship) => {
    // generate first cell of first ship
    let firstShipCell = randomPosition();
    let shipPosition = [];
    let shipPossibleDirections = whereTurnShip(
      computer,
      ship,
      firstShipCell,
      direction
    );
    // console.log(shipPossibleDirections.length);
    // make sure that cell is not occupied and you can turn ship somewhere
    // console.log(`First option of first cell of ${ship}:`, firstShipCell);
    // console.log(!computer.shipsShadowsCells[firstShipCell]);
    // Object.values(freeCells).forEach((x) => console.log(x));
    if (ship[0] === "v") {
      while (!computer.shipsShadowsCells[firstShipCell]) {
        firstShipCell = randomPosition();
      }
    } else {
      while (
        !computer.shipsShadowsCells[firstShipCell] ||
        (computer.shipsShadowsCells[firstShipCell] &&
          shipPossibleDirections.length === 0)
      ) {
        firstShipCell = randomPosition();
        shipPossibleDirections = whereTurnShip(
          computer,
          ship,
          firstShipCell,
          direction
        );
        // console.log(firstShipCell, shipPossibleDirections);
      }
    }
    shipPosition.push(firstShipCell);
    // console.log(`Last option of first cell of ${ship}:`, firstShipCell);
    // add cell to array of ship coordinats
    // check how we can turn the ship on map

    // if ship is vedette we don't need to turn it and to add more cells
    if (ship[0] !== "v") {
      // console.log(shipPossibleDirections);
      // choose random direction of ship
      const shipDirection =
        shipPossibleDirections[
          Math.floor(Math.random() * shipPossibleDirections.length)
        ];
      // add rest of ship coordinates to array
      shipPosition = fillShipArray(ship, shipPosition, shipDirection);
    }
    setShip("computer", ship, shipPosition);
    // console.log(shipPosition);
    // console.log("Object in state", computer.shipsCells);
    // add ship to database of free cells to consider ship posiiton and ship borders
    addShipToDatabase(shipPosition);
  };

  const generateComputer = () => {
    setSillyButtons();
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
                          player.possibleDirections &&
                          player.possibleDirections[`${y}${x}`]
                        )
                          return "#D3D3D3";
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
                            side === "computer" &&
                            computer.killedCells[cellNumber] === true
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
      <Grid container direction="row" spacing={5} justify="center">
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {map("player")}
            {Object.values(player.shipsStatus).every((x) => x) ? (
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
                >{`Quantity of attempts: ${player.attempts}`}</Typography>
              </Grid>
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
            {showComputer ? (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  onClick={generateComputer}
                >
                  Generate computer
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" spacing={1}>
        {sillyButtons
          ? shipNames.map((ship, index) => {
              return (
                <Grid item key={`${index}${ship}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20 }}
                    onClick={() => generateShip(ship)}
                  >
                    {ship}
                  </Button>
                </Grid>
              );
            })
          : null}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { player, computer, sillyButtons, showComputer } = state;
  return { player, computer, sillyButtons, showComputer };
};

const mapDispatchToProps = (dispatch) => ({
  setShip: (player, ship, position) =>
    dispatch(setShip(player, ship, position)),
  setShipsCells: (player, cell) => dispatch(setShipsCells(player, cell)),
  setShipsShadowsCells: (player, cell) =>
    dispatch(setShipsShadowsCells(player, cell)),
  setLegendLineTwo: (lelend) => dispatch(setLegendLineTwo(lelend)),
  setLegendLineOne: (lelend) => dispatch(setLegendLineOne(lelend)),
  setInput: () => dispatch(setInput()),
  setSillyButtons: () => dispatch(setSillyButtons()),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
