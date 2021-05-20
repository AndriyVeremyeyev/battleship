import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import strings from "./strings";
import { setPageStatus } from "./actions";
import { TypeThreeAction } from "./types";

type PlayAgainProps = {
  oneMoreGame: () => void;
  setPageStatus: (pageStatus: string) => TypeThreeAction;
  handleOpen: (status: boolean) => void;
};

const PlayAgain: React.FC<PlayAgainProps> = (props) => {
  const { oneMoreGame, setPageStatus, handleOpen } = props;

  const handleGameEnd = () => {
    setPageStatus("farewall");
    handleOpen(false);
  };

  const handleKeepPlaying = () => {
    handleOpen(false);
    oneMoreGame();
  };

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          height: 150,
          width: 300,
          border: "1px solid black",
          backgroundColor: "white",
        }}
      >
        <Typography variant="subtitle1" style={{ marginBottom: 20 }}>
          {strings.playAgain.question}
        </Typography>
        <Grid container direction="row" spacing={5} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleKeepPlaying}
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleGameEnd}>
              No
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPageStatus: (pageStatus: string) => dispatch(setPageStatus(pageStatus)),
});

export default connect(null, mapDispatchToProps)(PlayAgain);
