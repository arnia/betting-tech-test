import React from "react";
import PropTypes from "prop-types";
import Outcome from "../Outcome/Outcome";
import _ from "lodash";
import { connect } from "react-redux";
import "./_bet.scss";

function Bet({ id, outcome, market, event, removeFromBetSlip }) {
  return (
    <div className="Bet">
      <div className="Bet--header">
        <div className="Bet--event-name">{_.get(event, "data.name", "")}</div>

        <div className="Bet--remove" onClick={removeFromBetSlip}>
          &#10006;
        </div>
      </div>

      <div className="Bet--row">
        <div className="Bet--col">
          <div className="Bet--market-name">
            {_.get(market, "data.name", "")}
          </div>

          <div className="Bet--outcome-name">
            {_.get(outcome, "data.name", "")}
          </div>
        </div>

        <div className="Bet--col">
          <Outcome
            id={outcome.data.outcomeId}
            price={outcome.data.price}
            suspended={outcome.data.status.suspended}
            displayable={outcome.data.status.displayable}
          />
        </div>
      </div>
    </div>
  );
}

Bet.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  outcome: PropTypes.shape({}),
  market: PropTypes.shape({}),
  event: PropTypes.shape({}),
  removeFromBetSlip: PropTypes.func.isRequired
};

export default connect(
  (state, props) => {
    const outcome = state.outcomes[props.id] || { data: {} };
    const market = state.markets[outcome.data.marketId];
    const event = state.events[outcome.data.eventId];

    return { outcome, market, event };
  },
  (dispatch, props) => ({
    removeFromBetSlip: () => {
      if (props.id) {
        dispatch({ type: "BET_SLIP_REMOVE", outcomeId: props.id });
        dispatch({ type: "UNSUBSCRIBE", to: "outcome", id: props.id });
      }
    }
  })
)(React.memo(Bet));
