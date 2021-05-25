import React from "react";
import { Typography } from "@material-ui/core";
import { shipNames, shipLengths, shipNicknames } from "./database";
import strings from "./strings";

type LegendProps = {
  side: any;
};

const Legend: React.FC<LegendProps> = (props) => {
  const { side } = props;

  const condition = (ship: string, index: number) => {
    let response = "";
    if (side.ships[ship].length === shipLengths[index])
      response = strings.battle.undamaged;
    else if (side.ships[ship].length === 0) response = strings.battle.destroyed;
    else response = strings.battle.damaged;
    return response;
  };

  return (
    <React.Fragment>
      <Typography
        style={{ marginTop: 20 }}
        variant="h6"
      >{`Quantity of attempts: ${side.attempts}`}</Typography>
      {shipNicknames.map((ship, index) => {
        return (
          <Typography
            key={`shipsCondition${ship}${index}`}
            variant="subtitle2"
          >{`${index + 1}.${ship}: ${condition(
            shipNames[index],
            index
          )}`}</Typography>
        );
      })}
    </React.Fragment>
  );
};

export default Legend;
