import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactComponent as SubscribeIcon } from "./subscribe.svg";
import { ReactComponent as SubscribedIcon } from "./subscribed.svg";
import "./_subscribe.scss";

function Subscribe({
  isSubscribed,
  to,
  id,
  className,
  subscribe,
  unsubscribe,
  show
}) {
  const [subscribed, setSubscribe] = useState(isSubscribed);

  function handleToggle(e) {
    e.stopPropagation();

    setSubscribe(!subscribed);

    if (subscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  }

  if (!show) {
    return null;
  }

  return (
    <span className={"Subscribe " + className}>
      {subscribed ? (
        <span title="Unsubscribe">
          <SubscribedIcon onClick={handleToggle} width={17} height={17} />
        </span>
      ) : (
        <span title="Subscribe">
          <SubscribeIcon onClick={handleToggle} width={17} height={17} />
        </span>
      )}
    </span>
  );
}

Subscribe.defaultProps = {
  className: ""
};

Subscribe.propTypes = {
  to: PropTypes.oneOf(["event", "market", "outcome"]).isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
  isSubscribed: PropTypes.bool,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired
};

export default connect(
  (state, props) => {
    const obj = _.get(state, props.to + "s." + props.id, {});

    // check if there is a subscription on any parent
    let show = true;
    if (!_.isEmpty(obj.data)) {
      const marketId = obj.data.marketId;
      if (marketId && marketId !== props.id) {
        const subscriptionToMarket = _.get(
          state.markets,
          marketId + ".subscribed",
          false
        );
        show = !subscriptionToMarket;
      }

      const eventId = obj.data.eventId;
      if (eventId && eventId !== props.id) {
        const subscriptionToEvent = _.get(
          state.events,
          eventId + ".subscribed",
          false
        );

        show = show && !subscriptionToEvent;
      }
    }

    return { isSubscribed: obj.subscribed, show };
  },
  (dispatch, props) => ({
    subscribe: () =>
      dispatch({ type: "SUBSCRIBE", to: props.to, id: props.id }),
    unsubscribe: () =>
      dispatch({ type: "UNSUBSCRIBE", to: props.to, id: props.id })
  })
)(Subscribe);
