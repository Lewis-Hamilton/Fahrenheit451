import React from "react";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import VideoPlayer from "./components/VideoPlayer";
import AdminDashboard from "./components/Admin/dashboard";
import SearchResults from "./components/SearchResults";

const App = () => {
  return (
    <Router>
      <Switch>
        <Navigation>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/videos' component={Dashboard} />
          <Route exact path='/watch/:id' component={VideoPlayer} />
          <Route exact path='/search' component={SearchResults} /> 
          <Route exact path='/admin/dashboard' component={AdminDashboard} />
        </Navigation>
      </Switch>
    </Router>
  );
};

export default App;
