import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import EventClass from "./EventClass";
import Event from "./Event";
import "./_app.scss";

function LiveEventsPage({ loading, groupedByClass, getEvents }) {
  useEffect(() => {
    getEvents();
  }, []);

  return groupedByClass.map(([classID, byClassEvents], index) => (
    <EventClass
      key={classID}
      name={_.get(byClassEvents, "[0].className", "")}
      expanded={index === 0}
    >
      {loading ? (
        <div className="App">...loading</div>
      ) : (
        byClassEvents.map(event => (
          <Event
            key={event.eventId}
            name={
              <NavLink title="Go to event's page" to={`/${event.eventId}`}>
                {event.name}
              </NavLink>
            }
            scores={event.scores}
            eventId={event.eventId}
            marketIds={event.markets}
            alwaysShowMarkets
          />
        ))
      )}
    </EventClass>
  ));
}

export default connect(
  ({ eventsWithPrimaryMarket }) => ({
    loading: eventsWithPrimaryMarket.loading,
    groupedByClass: _.toPairs(
      _.groupBy(eventsWithPrimaryMarket.data, e => e.classId)
    )
  }),
  dispatch => ({
    getEvents: () => dispatch({ type: "GET_EVENTS" })
  })
)(LiveEventsPage);
