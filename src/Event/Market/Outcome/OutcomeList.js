import React, { useMemo, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import StandardOutcomes from "./StandardOutcomes";
import WinDrawWinOutcomes from "./WinDrawWinOutcomes";
import CorrectScoreOutcomes from "./CorrectScoreOutcomes";
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
        <StandardOutcomes ordoredOutcomes={ordoredOutcomes} />
      </div>
    );
  }

  if (marketType === "win-draw-win") {
    return (
      <div className="OutcomeList--win-draw-win">
        <WinDrawWinOutcomes ordoredOutcomes={ordoredOutcomes} />
      </div>
    );
  }

  if (marketType === "correct-score") {
    return (
      <div>
        <CorrectScoreOutcomes ordoredOutcomes={ordoredOutcomes} />
      </div>
    );
  }

  return null;
}

export default connect(
  (state, props) => {
    const market = state.markets[props.marketId] || {};
    const outcomesData = (market.data.outcomes || []).map(outcomeId =>
      _.get(state, `outcomes['${outcomeId}'].data`, {
        outcomeId,
        name: "loading...",
        status: {
          displayable: false
        }
      })
    );

    return {
      marketType: _.get(market, "data.type"),
      outcomesData
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
