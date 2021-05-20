import React from "react";
import GameController from "./GameController";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const App: React.FC = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Roboto",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GameController />
    </ThemeProvider>
  );
};

export default App;
