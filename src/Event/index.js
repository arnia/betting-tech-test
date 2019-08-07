import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactComponent as LoadingIcon } from "./loading.svg";
import "./_event.scss";

function Event({
  name,
  eventId,
  primaryMarketId,
  loading,
  market,
  getMarket,
  scores
}) {
  return (
    <div className="Event">
      <div className="Event--header">
        <div className="Event--name">
          <b>{name}</b>
        </div>

        <div className="Event--scores">
          <span>{_.get(scores, "home", 0)}</span>-
          <span>{_.get(scores, "away", 0)}</span>
        </div>
      </div>
      {loading ? (
        <div className="Event--loading">
          <LoadingIcon height={30} width={30} />
        </div>
      ) : (
        <>
          {market ? (
            <div className="Event--market">market</div>
          ) : (
            <a
              href="#"
              alt="showMarket"
              className="Event--showMarket"
              onClick={e => {
                e.preventDefault();
                getMarket();
              }}
            >
              show market
            </a>
          )}
        </>
      )}
    </div>
  );
}

Event.propTypes = {
  name: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  primaryMarketId: PropTypes.number.isRequired,
  scores: PropTypes.shape({
    home: PropTypes.number,
    away: PropTypes.number
  })
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
