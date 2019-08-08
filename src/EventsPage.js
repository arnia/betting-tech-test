import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import EventClass from "./EventClass";
import Event from "./Event";
import "./_app.scss";

function LiveEventsPage({ loading, groupedByClass, getEvents }) {
  useEffect(() => {
    getEvents();
  }, []);

  if (loading) {
    return <div className="App">...loading</div>;
  }

  return groupedByClass.map(([classID, byClassEvents], index) => (
    <EventClass
      key={classID}
      name={_.get(byClassEvents, "[0].className", "")}
      expanded={index === 0}
    >
      {byClassEvents.map(event => (
        <Event
          key={event.eventId}
          name={event.name}
          scores={event.scores}
          eventId={event.eventId}
          marketIds={event.markets}
          alwaysShowMarkets
        />
      ))}
    </EventClass>
  ));
}

export default connect(
  ({ events }) => ({
    loading: events.loading,
    groupedByClass: _.toPairs(_.groupBy(events.data, e => e.classId))
  }),
  dispatch => ({
    getEvents: () => dispatch({ type: "GET_EVENTS" })
  })
)(LiveEventsPage);
