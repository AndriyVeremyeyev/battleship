import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLegendLineOne, setPageStatus } from "./actions/index";
import strings from "./strings";
import { Grid, Button, Link, Box, Typography } from "@material-ui/core";
import titleImage from "./images/title-image.jpg";

type StartGameProps = {
  setPageStatus: any;
  setLegendLineOne: any;
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
    <Grid container direction="column" justify="center" alignItems="center">
      <Box
        style={{
          height: 1000,
          width: "100%",
          backgroundImage: `url(${titleImage})`,
          backgroundSize: "cover",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={startButtonOnClick}
          >
            {strings.startGame.button}
          </Button>
        </Grid>
      </Box>
      <Link
        href="https://en.wikipedia.org/wiki/Battleship_(game)"
        target="_blank"
      >
        <Typography variant="h6"> More about the Game</Typography>
      </Link>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPageStatus: (pageStatus: string) => dispatch(setPageStatus(pageStatus)),
  setLegendLineOne: (legend: string) => dispatch(setLegendLineOne(legend)),
});

export default connect(null, mapDispatchToProps)(StartGame);
