import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import EventClass from "./EventClass";
import Event from "./Event";
import "./_app.scss";

function App() {
  const [groupedByClass, setGroupedByClass] = useState([]);

  useEffect(() => {
    const w = new WebSocket("ws://localhost:8889");

    w.addEventListener("message", e => {
      const wEventDTO = JSON.parse(e.data);

      if (wEventDTO.type === "LIVE_EVENTS_DATA") {
        const grouped = _.groupBy(wEventDTO.data, e => e.classId);
        setGroupedByClass(grouped);
      }
    });

    w.onopen = () => {
      w.send(JSON.stringify({ type: "getLiveEvents", primaryMarkets: false }));
    };
  }, []);

  const eventTypes = useMemo(() => {
    return _.toPairs(groupedByClass || []);
  }, [groupedByClass]);

  console.log(groupedByClass);

  return (
    <div className="App">
      {eventTypes.map(([classID, byClassEvents], index) => (
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
