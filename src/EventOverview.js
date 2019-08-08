import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Event from "./Event";
import "./_app.scss";

function EventOverview({ loading, data, errorMessage, getEvent }) {
  useEffect(() => {
    getEvent();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (loading) {
    return <div>...loading</div>;
  }

  return "TODO";
}

export default connect(
  (state, props) => {
    const eventId = _.get(props, "match.params.eventId", "");

    const event = _.get(state, `events['${eventId}']`, {});

    return event;
  },
  (dispatch, props) => ({
    getEvent: () => {
      const eventId = _.get(props, "match.params.eventId", "");
      dispatch({ type: "GET_EVENT", eventId });
    }
  })
)(EventOverview);
