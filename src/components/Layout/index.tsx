import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { FunctionComponent } from "react";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#d82129",
    },
  },
});

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <Container maxWidth='xl'>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Container>
  );
};
