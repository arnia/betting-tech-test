import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import EventClass from "./EventClass";
import Event from "./Event";
import "./_app.scss";

function eventsSelector({ events }) {
  return {
    loading: events.loading,
    groupedByClass: _.toPairs(_.groupBy(events.data, e => e.classId))
  };
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_EVENTS" });
  }, []);

  const { loading, groupedByClass } = useSelector(eventsSelector);

  if (loading) {
    return <div className="App">...loading</div>;
  }

  return (
    <div className="App">
      {groupedByClass.map(([classID, byClassEvents], index) => (
        <EventClass
          key={classID}
          name={_.get(byClassEvents, "[0].className", "")}
          expanded={index === 0}
        >
          {byClassEvents.map(event => (
            <Event
              key={event.eventId}
              name={event.name}
              eventId={event.eventId}
            />
          ))}
        </EventClass>
      ))}
    </div>
  );
}

export default App;
