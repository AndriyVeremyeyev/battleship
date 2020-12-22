import React from "react";
import { connect } from "react-redux";
import { setPageStatus } from "./actions/index";
import strings from "./strings";
import { Grid, Typography, Button } from "@material-ui/core";

const StartGame = ({ pageStatus, setPageStatus }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: 1000 }}
    >
      <Grid item>
        <Typography variant="h4">{strings.startGame.greeting}</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={() => setPageStatus("battle")}
        >
          {strings.startGame.button}
          {console.log(pageStatus)}
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { pageStatus } = state;
  return {
    pageStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setPageStatus: (pageStatus) => dispatch(setPageStatus(pageStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
