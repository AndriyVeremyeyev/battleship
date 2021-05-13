import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { rows, columns } from "./database";
import { makeStyles } from "@material-ui/styles";
import cross from "./images/01.jpg";

const useStyles = makeStyles({
  cell: {
    height: 60,
    width: 60,
    border: "1px #DCDCDC solid",
    borderWidth: 0.5,
    cursor: "pointer",
    boxShadow: "2.4px 2.4px 3.2px rgba(0, 0, 0, 0.15)",
    padding: 2,
    "&:hover": {
      boxShadow: "4.8px 4.8px 6.4px rgba(0, 0, 0, 0.15)",
      fontWeight: "bold",
    },
  },
});

type FieldProps = {
  player: any;
  computer: any;
  side: string;
  showComputer: any;
  placeShipOnMap: any;
};

const Field: React.FC<FieldProps> = (props) => {
  const { player, computer, showComputer, side, placeShipOnMap } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: 20, gridGap: 5 }}
    >
      {columns.map((x) => {
        return (
          <Grid item key={x}>
            <Grid container direction="row" style={{ gridGap: 5 }}>
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
                    if (!player.shipsShadowsCells[`${y}${x}`]) return "#DCDCDC";
                  }
                  if (side === "computer") {
                    if (showComputer) {
                      if (!computer.shipsCells[`${y}${x}`]) return "#696969";
                      if (!computer.shipsShadowsCells[`${y}${x}`])
                        return "#D3D3D3";
                    } else {
                      if (player.wrongAttempts[`${y}${x}`]) return "#D3D3D3";
                    }
                  }
                  return null;
                };
                return (
                  <Grid
                    item
                    key={cellNumber}
                    className={classes.cell}
                    style={{
                      // @ts-ignore
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
                        ? () => placeShipOnMap(cellNumber)
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
  );
};

const mapStateToProps = (state: any) => {
  const { player, computer, showComputer } = state;
  return { player, computer, showComputer };
};

export default connect(mapStateToProps)(Field);
