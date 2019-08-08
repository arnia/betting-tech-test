import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/store";
import App from "./App";

import "./_variables.scss";
import "./_reset.scss";

import Events from "./EventsPage";
import EventOverview from "./EventOverview";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Events} />
          <Route exact path="/:eventId" component={EventOverview} />
          <Route render={() => "Not found"} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
