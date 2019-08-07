import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./_event.scss";

function Event({ name, eventId, primaryMarketId, loading, market, getMarket }) {
  return (
    <div className="Event">
      <div className="Event--name">
        <b>{name}</b>
      </div>

      {loading ? (
        <div className="Event--loading">...loading</div>
      ) : (
        <>
          {market ? (
            <div className="Event--market">market</div>
          ) : (
            <button className="Event--showMarket" onClick={getMarket}>
              getmarket
            </button>
          )}
        </>
      )}
    </div>
  );
}

Event.propTypes = {
  name: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  primaryMarketId: PropTypes.number.isRequired
};

export default connect(
  (state, props) => {
    const market = state.markets[props.primaryMarketId] || {};
    return {
      loading: market.loading || false,
      market: market.data
    };
  },
  (dispatch, props) => ({
    getMarket: () =>
      dispatch({ type: "GET_MARKET", marketId: props.primaryMarketId })
  })
)(Event);
