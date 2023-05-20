import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "src/app/Shared/assets/styles/Theme/Global.js";
import { theme } from "src/app/Shared/assets/styles/Theme/Theme.js";

import Login from "./Shared/components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Login />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
