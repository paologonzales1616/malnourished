import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "./core/utils/Store";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import DatasetPage from "./pages/dataset";
import AccountPage from "./pages/account";
import PredictionPage from "./pages/prediction";
import VisualizationPage from "./pages/visualization"

const App = () => {
  return (
    <Router>
      <Store>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/dataset" component={DatasetPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/prediction" component={PredictionPage} />
          <Route path="/visualization" component={VisualizationPage} />
        </Switch>
      </Store>
    </Router>
  );
};

export default App;
