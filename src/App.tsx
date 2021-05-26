import React from "react";
import GameController from "./GameController";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { lime, brown } from "@material-ui/core/colors";

const App: React.FC = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Roboto",
    },
    palette: {
      primary: {
        light: brown[100],
        main: brown[300],
        dark: brown[700],
      },
      secondary: {
        light: lime[100],
        main: lime[400],
        dark: lime[800],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GameController />
    </ThemeProvider>
  );
};

export default App;
