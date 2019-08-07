import React, { useMemo, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import StandardOutcome from "./StandardOutcome";
import WinDrawWinOutcome from "./WinDrawWinOutcome";
import "./_outcomeList.scss";

function OutcomeList({
  marketId,
  outcomesData,
  marketType,
  showLoadMore,
  loadOutcomes
}) {
  useEffect(() => {
    loadOutcomes();
  }, []);

  const ordoredOutcomes = useMemo(
    () => _.orderBy(outcomesData, ["displayOrder"]),
    [outcomesData]
  );

  if (marketType === "standard") {
    return (
      <div className="OutcomeList--standard">
        {ordoredOutcomes.map(outcome => (
          <StandardOutcome
            key={outcome.outcomeId}
            name={outcome.name}
            price={outcome.price}
            suspended={outcome.status.suspended}
            displayable={outcome.status.displayable}
          />
        ))}
      </div>
    );
  }

  if (marketType === "win-draw-win") {
    return (
      <div className="OutcomeList--win-draw-win">
        {ordoredOutcomes.map(outcome => (
          <WinDrawWinOutcome
            key={outcome.outcomeId}
            name={outcome.name}
            type={outcome.type}
            price={outcome.price}
            suspended={outcome.status.suspended}
            displayable={outcome.status.displayable}
          />
        ))}
      </div>
    );
  }

  return null;
}

export default connect(
  (state, props) => {
    const market = state.markets[props.marketId] || {};

    return {
      marketType: _.get(market, "data.type"),
      outcomesData: _.values(_.get(market, "data.outcomesData.data", {}))
    };
  },
  (dispatch, props) => ({
    loadOutcomes: () => {
      dispatch({
        type: "GET_OUTCOMES",
        marketId: props.marketId
      });
    }
  })
)(OutcomeList);
