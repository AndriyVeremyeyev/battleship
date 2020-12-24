import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setLegendLineOne,
  setPageStatus,
  setLegendLineTwo,
} from "./actions/index";
import { shipTypes } from "./database";
import strings from "./strings";
import { Grid, Button } from "@material-ui/core";

const StartGame = ({ setPageStatus, setLegendLineOne, setLegendLineTwo }) => {
  useEffect(() => {
    setLegendLineOne(strings.startGame.greeting);
  }, [setLegendLineOne]);

  const startButtonOnClick = () => {
    setPageStatus(strings.battle.title);
    setLegendLineOne(strings.battle.greeting);
    setLegendLineTwo(strings.battle.proposition.replace("{}", shipTypes[0]));
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: 800 }}
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
    </Grid>
  );
};

// const mapStateToProps = (state) => {
//   const { pageStatus } = state;
//   return {
//     pageStatus,
//   };
// };

const mapDispatchToProps = (dispatch) => ({
  setPageStatus: (pageStatus) => dispatch(setPageStatus(pageStatus)),
  setLegendLineOne: (legend) => dispatch(setLegendLineOne(legend)),
  setLegendLineTwo: (lelend) => dispatch(setLegendLineTwo(lelend)),
});

export default connect(null, mapDispatchToProps)(StartGame);
