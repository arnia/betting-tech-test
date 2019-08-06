import React from "react";
import PropTypes from "prop-types";
import "./_event.scss";

function Event({ name, eventId }) {
  return (
    <div className="Event">
      <div className="Event--name">
        <b>{name}</b>
      </div>
    </div>
  );
}

Event.propTypes = {
  name: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired
};

export default Event;
