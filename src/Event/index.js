import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactComponent as LoadingIcon } from "./loading.svg";
import "./_event.scss";
import MarketList from "./Market/MarketList";

function Event({
  name,
  eventId,
  marketIds,
  loading,
  markets,
  getPrimaryMarkets,
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
          {!_.isEmpty(markets) ? (
            <div className="Event--market">
              <MarketList markets={markets} />
            </div>
          ) : (
            <a
              href="#"
              alt="showMarket"
              className="Event--showMarket"
              onClick={e => {
                e.preventDefault();
                getPrimaryMarkets();
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

Event.defaultProps = {
  marketIds: []
};

Event.propTypes = {
  name: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  marketIds: PropTypes.arrayOf(PropTypes.number),
  getPrimaryMarkets: PropTypes.func.isRequired,
  scores: PropTypes.shape({
    home: PropTypes.number,
    away: PropTypes.number
  })
};

export default connect(
  (state, props) => {
    // is loading when at least of the markets is loading
    const loading = _.every(
      props.marketIds.map(marketId =>
        _.get(state, `markets['${marketId}'].loading`, false)
      )
    );

    const markets = props.marketIds
      .filter(id => _.get(state, `markets['${id}'].loading`) === false)
      .map(id => _.get(state, `markets['${id}'].data`));

    return { loading, markets };
  },
  (dispatch, props) => ({
    getPrimaryMarkets: () =>
      dispatch({ type: "GET_PRIMARY_MARKETS", marketIds: props.marketIds })
  })
)(Event);
