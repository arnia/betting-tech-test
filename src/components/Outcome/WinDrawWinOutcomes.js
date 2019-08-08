import React from "react";
import PropTypes from "prop-types";
import "./_winDrowWinOutcome.scss";
import Outcome from "./Outcome";

function WinDrawWinOutcomes({ ordoredOutcomes }) {
  return (
    <div className="WinDrawWinOutcome">
      {ordoredOutcomes.map(outcome => (
        <Outcome
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

WinDrawWinOutcomes.defaultProps = {
  ordoredOutcomes: []
};

WinDrawWinOutcomes.propTypes = {
  ordoredOutcomes: PropTypes.arrayOf(PropTypes.shape({}))
};

export default WinDrawWinOutcomes;
