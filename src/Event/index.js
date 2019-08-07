import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./_event.scss";
import Market from "./Market/Market";

function Event({
  name,
  eventId,
  marketIds,
  loading,
  scores,
  alwaysShowMarkets,
  expandFirstMarket
}) {
  const [showMarketList, setShowMarketList] = useState(false);

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

      {alwaysShowMarkets || showMarketList ? (
        <div className="Event--market">
          {marketIds.map((id, i) => (
            <Market
              key={id}
              marketId={id}
              expanded={expandFirstMarket ? i === 0 : false}
            />
          ))}
        </div>
      ) : (
        <a
          href="#"
          alt="showMarket"
          className="Event--showMarket"
          onClick={e => {
            e.preventDefault();
            setShowMarketList(true);
          }}
        >
          show more
        </a>
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
  scores: PropTypes.shape({
    home: PropTypes.number,
    away: PropTypes.number
  }),
  alwaysShowMarkets: PropTypes.bool,
  expandFirstMarket: PropTypes.bool
};

export default connect((state, props) => {
  const marketIds = props.marketIds || [];

  // is loading when at least one of the markets is loading
  const loading = _.isEmpty(marketIds)
    ? false
    : _.every(
        marketIds.map(marketId =>
          _.get(state, `markets['${marketId}'].loading`, false)
        )
      );

  return { loading };
})(Event);
