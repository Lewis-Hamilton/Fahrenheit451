import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import Axios from "axios";
import { setVideos } from "./redux/slice/videoSlice";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    Axios.get("https://susanwabbajacksucks.herokuapp.com/api/video").then(
      (response) => {
        dispatch(setVideos(response.data));
      }
    );
  }, []);

  return (
    <Router>
      <Switch>
        <Navigation>
          <Route exact path='/' component={Home} />
          <Route exact path='/videos' component={Dashboard} />
          <Route exact path='/watch/:id' component={VideoPlayer} />
        </Navigation>
      </Switch>
    </Router>
  );
};

export default App;
