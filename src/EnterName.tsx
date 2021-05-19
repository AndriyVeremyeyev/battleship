import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Grid, TextField } from "@material-ui/core";
import {
  setPageStatus,
  setLegendLineOne,
  setLegendLineTwo,
  setPlayerName,
} from "./actions/index";
import { shipTypes } from "./database";
import strings from "./strings";
import { makeStyles } from "@material-ui/styles";
import { ActionStringObj } from "./types";

const useStyles = makeStyles({
  input: {
    color: "white",
    width: 200,
    height: 50,
    border: "1px solid white",
  },
});

type EnterNameProps = {
  setPageStatus: (pageStatus: string) => ActionStringObj;
  setLegendLineOne: (legend: string) => ActionStringObj;
  setLegendLineTwo: (legend: string) => ActionStringObj;
  setPlayerName: (name: string) => ActionStringObj;
};

const EnterName: React.FC<EnterNameProps> = (props) => {
  const { setPageStatus, setLegendLineOne, setLegendLineTwo, setPlayerName } =
    props;
  const classes = useStyles();

  const [name, setName] = useState("");

  const handleOnClick = () => {
    if (name.length) {
      setPageStatus(strings.battle.title);
      setLegendLineOne(strings.battle.greeting);
      setLegendLineTwo(strings.battle.proposition.replace("{}", shipTypes[0]));
      setPlayerName(name);
    } else {
      setLegendLineTwo(strings.enterName.warning);
    }
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
        onChange={(event) => setName(event.target.value)}
        InputProps={{ className: classes.input }}
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
  setPlayerName: (name: string) => dispatch(setPlayerName(name)),
});

export default connect(null, mapDispatchToProps)(EnterName);
