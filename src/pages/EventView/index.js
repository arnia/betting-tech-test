import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Event from "../../components/Event";
import Subscribe from "../../components/Subscribe";
import "./_eventView.scss";

function EventView({ loading, data, errorMessage, getEvent }) {
  useEffect(() => {
    getEvent();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <div className="EventView">
      <Event
        name={
          <div className="EventView--name">
            <Subscribe
              className="EventView--subscribe"
              to="event"
              id={data.eventId}
            />
            {data.name}
          </div>
        }
        scores={data.scores}
        eventId={data.eventId}
        marketIds={data.markets}
        expandFirstNMarkets={10}
      />
    </div>
  );
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
      dispatch({ type: "GET_EVENT", eventId: Number(eventId) });
    }
  })
)(EventView);
