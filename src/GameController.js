import React from "react";
import { connect } from "react-redux";
// import { setPageStatus } from "./actions/index";

import Header from "./Header";
import Battle from "./Battle";
import StartGame from "./StartGame";

const GameController = ({ pageStatus }) => {
  const mode = () => {
    switch (pageStatus) {
      case "battle":
        return <Battle />;
      default:
        return <StartGame />;
    }
  };
  return (
    <React.Fragment>
      <Header />
      {mode()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { pageStatus } = state;
  return {
    pageStatus,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   setPageStatus: (pageStatus) => dispatch(setPageStatus(pageStatus)),
// });

export default connect(mapStateToProps)(GameController);
