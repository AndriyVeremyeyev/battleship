import React from "react";
import { connect } from "react-redux";
import { Button, Grid, TextField } from "@material-ui/core";
import {
  setPageStatus,
  setLegendLineOne,
  setLegendLineTwo,
} from "./actions/index";
import { shipTypes } from "./database";
import strings from "./strings";

type EnterNameProps = {
  setPageStatus: any;
  setLegendLineOne: any;
  setLegendLineTwo: any;
};

const EnterName: React.FC<EnterNameProps> = (props) => {
  const { setPageStatus, setLegendLineOne, setLegendLineTwo } = props;

  const handleOnClick = () => {
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
      style={{ marginTop: 30 }}
    >
      <TextField
        variant="outlined"
        style={{ width: 200, height: 10 }}
      ></TextField>
      <Grid item style={{ marginTop: 90 }}>
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setPageStatus: (pageStatus: string) => dispatch(setPageStatus(pageStatus)),
  setLegendLineOne: (legend: string) => dispatch(setLegendLineOne(legend)),
  setLegendLineTwo: (lelend: string) => dispatch(setLegendLineTwo(lelend)),
});

export default connect(null, mapDispatchToProps)(EnterName);
