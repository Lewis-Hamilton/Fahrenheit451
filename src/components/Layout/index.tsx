import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

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
      <ThemeProvider theme={theme}>
        <>
          {children}
          <ToastContainer
            position='bottom-left'
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      </ThemeProvider>
    </Container>
  );
};
