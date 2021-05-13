import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import strings from "./strings";

type PlayAgainProps = {
  oneMoreGame: any;
};

const PlayAgain: React.FC<PlayAgainProps> = (props) => {
  const { oneMoreGame } = props;
  return (
    <Grid item>
      <Typography variant="subtitle1" style={{ marginBottom: 20 }}>
        {strings.playAgain.question}
      </Typography>
      <Grid container direction="row" spacing={5} justify="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={oneMoreGame}>
            Yes
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("Don't want to play");
            }}
          >
            No
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayAgain;
