import React from "react";
import {
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + "/home.jpg"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
  }));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}><CssBaseline /><div>
      <h1>Hello World</h1>
    </div></div>
  )
}
export default Home;
