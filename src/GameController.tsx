import React, { Fragment } from "react";
import { connect } from "react-redux";
// import { setPageStatus } from "./actions/index";

import Header from "./Header";
import Battle from "./Battle";
import StartGame from "./StartGame";

type GameControllerProps = {
  pageStatus: string;
};

const GameController: React.FC<GameControllerProps> = (props) => {
  const { pageStatus } = props;
  const mode = () => {
    switch (pageStatus) {
      case "battle":
        return <Battle />;
      default:
        return <StartGame />;
    }
  };
  return (
    <Fragment>
      <Header />
      {mode()}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const { pageStatus } = state;
  return {
    pageStatus,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   setPageStatus: (pageStatus) => dispatch(setPageStatus(pageStatus)),
// });

export default connect(mapStateToProps)(GameController);
