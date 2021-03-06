import React from "react";
import {TitleComponent} from "../Title/TitleComponent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const pushToRoute = (route: string) => {
    history.push(route);
  };

  return (
    <div
      style={{
        position: "fixed",
        overflow: "hidden",
        height: "100%", width:
          "100%",
        backgroundImage: "url(\"/banner.png\")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <TitleComponent title="Home" />
      <Grid style={{paddingTop: "20%", textAlign: "center"}}>
        <Grid item>
          <Typography variant="h1" component="h2" gutterBottom>
            Susan Wabbajack Sucks
          </Typography>
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() => pushToRoute("/videos")}
            variant="outlined"
          >
            Start Watching Now
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
