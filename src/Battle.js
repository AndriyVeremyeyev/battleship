import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { setComputerBattleship, setTestingPurposes } from "./actions/index";

const Battle = ({
  computerShips,
  setComputerBattleship,
  setTestingPurposes,
  test,
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

  const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ships = ["battleship", "cruiser", "destroyer", "vedette"];
  const direction = ["up", "down", "left", "right"];

  const vasya = (number) => {
    console.log(number);
  };

  const randomPosition = () => {
    const randomLetter = rows[Math.floor(Math.random() * rows.length)];
    const randomNumber = columns[Math.floor(Math.random() * columns.length)];
    return randomLetter + randomNumber;
  };

  const generateComputer = () => {
    const battleshipPosition = [];
    let firstBattleshipPoint = randomPosition();
    battleshipPosition.push(firstBattleshipPoint);
    console.log(computerShips);
    console.log(test);
    setComputerBattleship(battleshipPosition);
    setTestingPurposes();
    console.log(computerShips);
    console.log(test);
  };

  const map = (player, button = false) => {
    return (
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h4">{player}</Typography>
          <Typography variant="h5">{String(test)}</Typography>
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
  const { computerShips, test } = state;
  return { computerShips, test };
};

const mapDispatchToProps = (dispatch) => ({
  setComputerBattleship: (position) =>
    dispatch(setComputerBattleship(position)),
  setTestingPurposes: () => dispatch(setTestingPurposes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battle);
