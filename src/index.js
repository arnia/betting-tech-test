import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/store";

import "./_variables.scss";
import "./_reset.scss";

import App from "./pages/App";
import Events from "./pages/Events";
import EventView from "./pages/EventView";

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
