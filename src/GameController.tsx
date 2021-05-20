import React, { Fragment } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Battle from "./Battle";
import StartGame from "./StartGame";
import EnterName from "./EnterName";
import Farewall from "./Firewall";

type GameControllerProps = {
  pageStatus: string;
};

const GameController: React.FC<GameControllerProps> = (props) => {
  const { pageStatus } = props;
  const mode = () => {
    switch (pageStatus) {
      case "enterName":
        return <EnterName />;
      case "battle":
        return <Battle />;
      case "farewall":
        return <Farewall />;
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

export default connect(mapStateToProps)(GameController);
