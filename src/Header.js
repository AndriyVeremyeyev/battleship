import React, { useEffect } from "react";
import { connect } from "react-redux";
import strings from "./strings";
import { setLegendLineOne, setLegendLineTwo } from "./actions/index";
import { Grid, Typography } from "@material-ui/core";

const Header = ({
  legendLineOne,
  legendLineTwo,
  setLegendLineOne,
  setLegendLineTwo,
}) => {
  useEffect(() => {
    setLegendLineOne(strings.startGame.greeting);
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h2">{strings.header.title}</Typography>
      <Grid
        item
        style={{
          border: "solid",
          borderWidth: 1,
          height: 70,
          width: 500,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <Typography variant="h6">{legendLineOne}</Typography>
          <Typography variant="h6">{legendLineTwo}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { legendLineOne, legendLineTwo } = state;
  return {
    legendLineOne,
    legendLineTwo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLegendLineOne: (legend) => dispatch(setLegendLineOne(legend)),
  setLegendLineTwo: (legend) => dispatch(setLegendLineTwo(legend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
