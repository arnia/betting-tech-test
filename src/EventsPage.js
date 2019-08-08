import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import EventClass from "./EventClass";
import Event from "./Event";
import "./_app.scss";

function toEventsModel(events) {
  const filtered = _.toPairs(
    _.groupBy(events, e => (e.data ? e.data.classId : "withErrors"))
  ).filter(([key]) => key !== "withErrors");

  return filtered.map(([key, evts]) => [
    key,
    _.orderBy(evts, ["displayOrder"])
  ]);
}

function LiveEventsPage({ loading, events, getEvents }) {
  useEffect(() => {
    getEvents();
  }, []);

  const groupedByClass = useMemo(() => toEventsModel(events), [events]);

  return groupedByClass.map(([classID, byClassEvents], index) => (
    <EventClass
      key={classID}
      name={_.get(byClassEvents, "[0].data.className", "")}
      expanded={index === 0}
      loading={loading}
    >
      {byClassEvents.map(({ eventId, data: event }) => (
        <Event
          key={eventId}
          name={
            <NavLink title="Go to event's page" to={`/${eventId}`}>
              {event.name}
            </NavLink>
          }
          scores={event.scores}
          eventId={eventId}
          marketIds={event.markets}
          alwaysShowMarkets
        />
      ))}
    </EventClass>
  ));
}

export default connect(
  ({ events, eventsLoading }) => {
    return { events, loading: eventsLoading };
  },

  dispatch => ({
    getEvents: () => dispatch({ type: "GET_EVENTS" })
  })
)(React.memo(LiveEventsPage));
