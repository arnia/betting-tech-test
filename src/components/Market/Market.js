import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { ReactComponent as InfoIcon } from "../info.svg";
import { ReactComponent as LoadingIcon } from "../loading.svg";
import useDidUpdateEffect from "../../utils/useDidUpdateEffect";

import { ReactComponent as ExpandIcon } from "../expand-arrow.svg";
import { ReactComponent as CollapseIcon } from "../expand-button.svg";
import Subscribe from "../Subscribe";

import OutcomeList from "../Outcome/OutcomeList";

import "./_market.scss";

function Market({
  marketId,
  market,
  expanded,
  loading,
  loadingOutcomes,
  loadMarket
}) {
  const [showOutcomes, setShowOutcomes] = useState(expanded);

  useDidUpdateEffect(() => {
    setShowOutcomes(expanded);
  }, [expanded]);

  // Load the market on mount
  useEffect(() => {
    if (_.isEmpty(market)) {
      loadMarket();
    }
  }, []);

  if (loading) {
    return (
      <div className="Market--header">
        <div className="Market--loading">
          <LoadingIcon width={30} height={30} />
        </div>
      </div>
    );
  }

  return (
    <div className="Market">
      <div
        className="Market--header"
        onClick={() => setShowOutcomes(!showOutcomes)}
      >
        <div className="Market--name">
          <Subscribe className="Market--subscribe" to="market" id={marketId} />

          {market.name}
        </div>
        <div>
          {loadingOutcomes ? (
            <div className="loading">
              <LoadingIcon height={30} width={30} />
            </div>
          ) : (
            <>
              {showOutcomes ? (
                <ExpandIcon title="expand" height={20} width={20} />
              ) : (
                <CollapseIcon title="collapse" height={20} width={20} />
              )}
            </>
          )}
        </div>
      </div>

      {showOutcomes && !_.isEmpty(market) ? (
        <>
          {market.notes ? (
            <div className="Market--notes">
              <InfoIcon height={18} width={18} />
              <span className="Market--notes-bullet">&bull;</span>
              <span>{market.notes}</span>
            </div>
          ) : null}

          <OutcomeList marketId={marketId} />
        </>
      ) : null}
    </div>
  );
}

Market.defaultProps = {
  market: {},
  expanded: false
};

Market.propTypes = {
  marketId: PropTypes.number.isRequired,
  market: PropTypes.shape({}),
  expanded: PropTypes.bool,
  loadMarket: PropTypes.func.isRequired
};

export default connect(
  (state, props) => {
    const market = state.markets[props.marketId];

    return {
      loading: market && market.loading,
      loadingOutcomes: market && market.loadedOutcomes,
      market: (market && market.data) || {}
    };
  },
  (dispatch, props) => ({
    loadMarket: () => dispatch({ type: "GET_MARKET", marketId: props.marketId })
  })
)(Market);
