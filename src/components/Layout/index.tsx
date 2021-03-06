import {Container, createMuiTheme, ThemeProvider} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import {ToastContainer} from "react-toastify";
import PropTypes from "prop-types";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#d82129",
    },
  },
});

export const Layout: FunctionComponent = ({children}) => {
  return (
    <Container maxWidth={false} style={{padding: 0}}>
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

Layout.propTypes = {
  children: PropTypes.any,
};
