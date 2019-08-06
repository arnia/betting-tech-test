import React from "react";
import PropTypes from "prop-types";
import "./_event.scss";
import { useDispatch, useSelector } from "react-redux";

function marketSelector(marketId) {
  return state => {
    const market = state.markets[marketId] || {};
    return {
      loading: market.loading || false,
      market: market.data || {}
    };
  };
}

function Event({ name, eventId, primaryMarketId }) {
  const dispatch = useDispatch();

  function getMarket() {
    dispatch({ type: "GET_MARKET", marketId: primaryMarketId });
  }

  const { loading, market } = useSelector(marketSelector(primaryMarketId));

  return (
    <div className="Event">
      <div className="Event--name">
        <b>{name}</b>
      </div>

      {loading ? (
        <span>...loading</span>
      ) : (
        <button onClick={getMarket}>getmarket</button>
      )}
    </div>
  );
}

Event.propTypes = {
  name: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  primaryMarketId: PropTypes.number.isRequired
};

export default React.memo(Event);
