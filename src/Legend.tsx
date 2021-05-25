import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { shipNames, shipLengths, shipNicknames } from "./database";
import strings from "./strings";
import { makeStyles } from "@material-ui/core";

type LegendProps = {
  side: any;
  player?: string;
};

const useStyles = makeStyles({
  tableRow: {
    height: 10,
  },
  tableCell: { padding: 10 },
});

const Legend: React.FC<LegendProps> = (props) => {
  const { side, player } = props;
  const classes = useStyles();

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
      <Table style={{ marginTop: "3rem", width: "18rem" }}>
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell} style={{ width: "2rem" }}>
              #
            </TableCell>
            <TableCell className={classes.tableCell} style={{ width: "10rem" }}>
              Ship
            </TableCell>
            <TableCell className={classes.tableCell} style={{ width: "6rem" }}>
              Condition
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipNicknames.map((ship, index) => {
            return (
              <TableRow
                className={classes.tableRow}
                key={`${
                  player === "player" ? "player" : "computer"
                }TableRow${index}`}
              >
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "2rem" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "10rem" }}
                >
                  {ship}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "6rem" }}
                >
                  {condition(shipNames[index], index)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Legend;
