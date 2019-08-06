import React, { useState } from "react";
import PropTypes from "prop-types";
import useDidUpdateEffect from "../utils/useDidUpdateEffect";
import "./_eventClass.scss";
import { ReactComponent as ExpandIcon } from "./expand-arrow.svg";
import { ReactComponent as CollapseIcon } from "./expand-button.svg";

function EventClass({ name, children, expanded }) {
  const [showChildren, setShowChildren] = useState(expanded);

  useDidUpdateEffect(() => {
    setShowChildren(expanded);
  }, [expanded]);

  return (
    <div className="EventClass">
      <div className="EventClass--header">
        <div className="EventClass--name">{name}</div>
        <div>
          <div
            className="EventClass--toggleIcon"
            onClick={() => setShowChildren(!showChildren)}
          >
            {showChildren ? (
              <CollapseIcon title="collapse" height={30} width={30} />
            ) : (
              <ExpandIcon title="expand" height={30} width={30} />
            )}
          </div>
        </div>
      </div>

      {showChildren ? (
        <div className="EventClass--event-list">{children}</div>
      ) : null}
    </div>
  );
}

EventClass.defaultProps = {
  count: 0,
  expanded: false
};

EventClass.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  children: PropTypes.node,
  expanded: PropTypes.bool
};

export default EventClass;
