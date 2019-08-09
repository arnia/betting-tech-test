import React, { useState } from "react";
import PropTypes from "prop-types";
import useDidUpdateEffect from "../../utils/useDidUpdateEffect";
import { ReactComponent as ExpandIcon } from "../expand-arrow.svg";
import { ReactComponent as CollapseIcon } from "../expand-button.svg";
import { ReactComponent as LoadingIcon } from "../loading.svg";
import "./_eventClass.scss";

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
              <ExpandIcon title="collapse" height={30} width={30} />
            ) : (
              <CollapseIcon title="expand" height={30} width={30} />
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
