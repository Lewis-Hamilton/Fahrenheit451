import { Container } from "@material-ui/core";
import React from "react";

interface Props {
  children: JSX.Element;
}

const ThemeProvider = (props: Props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default ThemeProvider;
