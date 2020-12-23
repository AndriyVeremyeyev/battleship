import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  setShip,
  setShipsCells,
  setShipsShadowsCells,
  setLegendLineOne,
  setLegendLineTwo,
} from "./actions/index";
import {
  rows,
  columns,
  shipNames,
  direction,
  shipTypes,
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
}) => {
  useEffect(() => {
    drawPossibleDirections();
  }, [player]);

  useEffect(() => {
    setTimeout(() => {
      setLegendLineTwo(strings.battle.proposition.replace("{}", shipTypes[0]));
    }, 2000);
  }, [setLegendLineTwo]);

  const { shipsCells, shipsShadowsCells } = computer;

  const cellStyle = {
    height: 50,
    width: 50,
    border: "solid",
    borderWidth: 0.5,
    cursor: "pointer",
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

  const placePlayerShipOnMap = (cellNumber) => {
    if (player.battleShip?.length < 4 && player.shipsCells[cellNumber]) {
      setShip("player", shipNames[0], [cellNumber]);
      setShipsCells("player", cellNumber);
    }

    if (
      player.battleShip?.length === 4 &&
      player.cruiserFirst?.length < 3 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[1], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.cruiserFirst?.length === 3 &&
      player.cruiserSecond?.length < 3 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[2], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.cruiserSecond?.length === 3 &&
      player.destroyerFirst?.length < 2 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[3], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.destroyerFirst?.length === 2 &&
      player.destroyerSecond?.length < 2 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[4], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.destroyerSecond?.length === 2 &&
      player.destroyerThird?.length < 2 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[5], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.destroyerThird?.length === 2 &&
      player.vedetteFirst?.length < 1 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[6], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.vedetteFirst?.length === 1 &&
      player.vedetteSecond?.length < 1 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[7], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.vedetteSecond?.length === 1 &&
      player.vedetteThird?.length < 1 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[8], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    if (
      player.vedetteThird?.length === 1 &&
      player.vedetteForth?.length < 1 &&
      player.shipsCells[cellNumber]
    ) {
      setShip("player", shipNames[9], [cellNumber]);
      setShipsCells("player", cellNumber);
    }
    console.log(player);
  };

  const replaceLegends = (nameOne, nameTwo) => {
    setLegendLineOne(strings.battle.completed.replace("{}", nameOne));
    setLegendLineTwo(strings.battle.proposition.replace("{}", nameTwo));
  };

  const drawPossibleDirections = () => {
    shipNames.forEach((ship, index) => {
      if (player[ship]?.length === shipLengths[index]) {
        if (index < shipNames.length - 1)
          replaceLegends(shipNicknames[index], shipNicknames[index + 1]);
        else {
          setLegendLineOne(strings.battle.placementCompleted);
          setLegendLineTwo("");
        }
      }
    });
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
      if (!shipsShadowsCells[`${firstPoint[0]}${Number(number) - i}`])
        shipDirection = shipDirection.filter((x) => x !== "up");
      if (!shipsShadowsCells[`${firstPoint[0]}${Number(number) + i}`])
        shipDirection = shipDirection.filter((x) => x !== "down");
      if (
        !shipsShadowsCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) - i)}${number}`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "left");
      if (
        !shipsShadowsCells[
          `${String.fromCharCode(firstPoint[0].charCodeAt(0) + i)}${number}`
        ]
      )
        shipDirection = shipDirection.filter((x) => x !== "right");
    }

    return shipDirection;
  };

  const setCertainShadow = (cell) => {
    if (shipsShadowsCells[cell]) setShipsShadowsCells(cell);
  };

  const addShipToDatabase = (shipPosition) => {
    shipPosition.forEach((x) => {
      const number = x.length === 3 ? x[1] + x[2] : x[1];
      setShipsCells("computer", x);
      setCertainShadow();

      setShipsShadowsCells(x);
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
    let shipPossibleDirections = whereTurnShip(ship, firstShipCell, direction);
    console.log(shipPossibleDirections.length);
    // make sure that cell is not occupied and you can turn ship somewhere
    console.log(`First option of first cell of ${ship}:`, firstShipCell);
    console.log(!shipsShadowsCells[firstShipCell]);
    // Object.values(freeCells).forEach((x) => console.log(x));
    if (ship[0] === "v") {
      while (!shipsShadowsCells[firstShipCell]) {
        firstShipCell = randomPosition();
      }
    } else {
      while (
        !shipsShadowsCells[firstShipCell] ||
        (shipsShadowsCells[firstShipCell] &&
          shipPossibleDirections.length === 0)
      ) {
        firstShipCell = randomPosition();
        shipPossibleDirections = whereTurnShip(ship, firstShipCell, direction);
        console.log(firstShipCell, shipPossibleDirections);
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
    setShip("computer", ship, shipPosition);
    console.log(shipPosition);
    console.log("Object in state", shipsCells);
    // add ship to database of free cells to consider ship posiiton and ship borders
    addShipToDatabase(shipPosition);
  };

  const generateComputer = () => {
    console.log("vasya");
  };

  const map = (side, button = false) => {
    return (
      <Grid item>
        <Grid container direction="column" alignItems="center">
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
                        if (side === "computer" && !shipsCells[`${y}${x}`]) {
                          return "#696969";
                        }
                        if (
                          side === "computer" &&
                          !shipsShadowsCells[`${y}${x}`]
                        ) {
                          return "#D3D3D3";
                        }
                        if (
                          side === "player" &&
                          player.shipsCells &&
                          !player.shipsCells[`${y}${x}`]
                        )
                          return "#696969";
                        return null;
                      };
                      return (
                        <Grid
                          item
                          key={cellNumber}
                          style={{
                            ...cellStyle,
                            backgroundColor: cellColor(),
                          }}
                          onClick={
                            side === "player"
                              ? () => placePlayerShipOnMap(cellNumber)
                              : () => console.log(cellNumber)
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
          {button ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={generateComputer}
            >
              Generate computer
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
      <Grid container direction="row" justify="center">
        {shipNames.map((ship, index) => {
          return (
            <Button
              key={`${index}${ship}`}
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={() => generateShip(ship)}
            >
              {ship}
            </Button>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { player, computer } = state;
  return { player, computer };
};

const mapDispatchToProps = (dispatch) => ({
  setShip: (player, ship, position) =>
    dispatch(setShip(player, ship, position)),
  setShipsCells: (player, cell) => dispatch(setShipsCells(player, cell)),
  setShipsShadowsCells: (cell) => dispatch(setShipsShadowsCells(cell)),
  setLegendLineTwo: (lelend) => dispatch(setLegendLineTwo(lelend)),
  setLegendLineOne: (lelend) => dispatch(setLegendLineOne(lelend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
