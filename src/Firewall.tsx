import React from "react";
import { Box } from "@material-ui/core";
import farewell from "./images/goodbuy.jpg";

const Firewall: React.FC = () => {
  return (
    <Box
      style={{
        height: "50vh",
        width: "100vw",
        backgroundImage: `url(${farewell})`,
        backgroundSize: "cover",
      }}
    ></Box>
  );
};

export default Firewall;
