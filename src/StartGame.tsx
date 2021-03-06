import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLegendLineOne, setPageStatus } from "./actions/index";
import strings from "./strings";
import { Grid, Button, Link, Typography } from "@material-ui/core";
import { TypeThreeAction } from "./types";

type StartGameProps = {
  setPageStatus: (pageStatus: string) => TypeThreeAction;
  setLegendLineOne: (legend: string) => TypeThreeAction;
};

const StartGame: React.FC<StartGameProps> = (props) => {
  const { setPageStatus, setLegendLineOne } = props;

  useEffect(() => {
    setLegendLineOne(strings.startGame.greeting);
  }, [setLegendLineOne]);

  const startButtonOnClick = () => {
    setPageStatus(strings.enterName.title);
    setLegendLineOne(strings.enterName.text);
  };

  return (
    <Grid
      container
      style={{ height: "33vh" }}
      direction="column"
      alignItems="center"
      justify="space-between"
    >
      <Button
        variant="contained"
        style={{ marginTop: 300, backgroundColor: "white" }}
        onClick={startButtonOnClick}
      >
        {strings.startGame.button}
      </Button>
      <Link
        href="https://en.wikipedia.org/wiki/Battleship_(game)"
        target="_blank"
        style={{ color: "white" }}
      >
        <Typography style={{ fontSize: "1.1rem" }}>
          {strings.startGame.about}
        </Typography>
      </Link>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPageStatus: (pageStatus: string) => dispatch(setPageStatus(pageStatus)),
  setLegendLineOne: (legend: string) => dispatch(setLegendLineOne(legend)),
});

export default connect(null, mapDispatchToProps)(StartGame);
