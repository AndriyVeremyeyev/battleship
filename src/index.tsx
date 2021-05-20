import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import titleImage from "./images/title-image.jpg";
import { Box } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <Box
      style={{
        height: "50vh",
        width: "100vw",
        backgroundImage: `url(${titleImage})`,
        backgroundSize: "cover",
      }}
    >
      <App />
    </Box>
  </Provider>,
  document.getElementById("root")
);
