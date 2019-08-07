import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Market from "./Market";

function MarketList({ markets }) {
  const filteredMarkets = markets.filter(
    market => market.status.displayable && !_.isEmpty(market.outcomes)
  );

  return _.orderyBy(filteredMarkets, ["displayOrder"]).map(market => (
    <Market
      key={market.marketId}
      name={market.name}
      outcomesData={market.outcomesData}
    />
  ));
}

MarketList.defaultProps = {
  markets: []
};

MarketList.propTypes = {
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      outcomesData: PropTypes.shape({})
    })
  )
};

export default React.memo(MarketList);
