import React from "react";
import { connect } from "react-redux";
import strings from "./strings";
import { Grid, Typography } from "@material-ui/core";

type HeaderProps = {
  legendLineOne: string;
  legendLineTwo: string;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { legendLineOne, legendLineTwo } = props;
  return (
    <Grid container direction="column" alignItems="center">
      <Typography style={{ color: "white", marginTop: 50 }} variant="h2">
        {strings.header.title}
      </Typography>
      <Grid
        item
        style={{
          border: "solid",
          borderWidth: 1,
          height: 80,
          width: 600,
          marginTop: 20,
          marginBottom: 20,
          color: "white",
          backgroundColor: "fade(#FFFFFF, 50%)",
        }}
      >
        <Grid
          container
          direction="column"
          style={{ marginTop: 10 }}
          alignItems="center"
        >
          <Typography variant="subtitle1">{legendLineOne}</Typography>
          <Typography variant="subtitle1">{legendLineTwo}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => {
  const { legendLineOne, legendLineTwo } = state;
  return {
    legendLineOne,
    legendLineTwo,
  };
};

export default connect(mapStateToProps)(Header);
