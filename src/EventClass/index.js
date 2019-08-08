import React, { useState } from "react";
import PropTypes from "prop-types";
import useDidUpdateEffect from "../utils/useDidUpdateEffect";
import "./_eventClass.scss";
import { ReactComponent as ExpandIcon } from "../expand-arrow.svg";
import { ReactComponent as CollapseIcon } from "../expand-button.svg";
// TODO: move this
import { ReactComponent as LoadingIcon } from "../Event/Market/loading.svg";

function EventClass({ name, loading, children, expanded }) {
  const [showChildren, setShowChildren] = useState(expanded);

  useDidUpdateEffect(() => {
    setShowChildren(expanded);
  }, [expanded]);

  return (
    <div className="EventClass">
      <div
        className="EventClass--header"
        onClick={() => setShowChildren(!showChildren)}
      >
        <div className="EventClass--name">
          {name}
          {loading ? (
            <div className="EventClass--loading">
              <LoadingIcon height={30} width={30} />
            </div>
          ) : null}
        </div>
        <div>
          <div className="EventClass--toggleIcon">
            {showChildren ? (
              <ExpandIcon title="expand" height={30} width={30} />
            ) : (
              <CollapseIcon title="collapse" height={30} width={30} />
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
