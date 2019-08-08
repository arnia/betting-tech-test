import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/store";
import App from "./App";

import "./_variables.scss";
import "./_reset.scss";

import Events from "./Events";
import EventView from "./EventView";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Events} />
          <Route exact path="/:eventId" component={EventView} />
          <Route render={() => "Not found"} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
