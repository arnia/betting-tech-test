import React from "react";
import PropTypes from "prop-types";
import "./_standardOutcome.scss";
import Outcome from "./Outcome";

function StandardOutcomes({ ordoredOutcomes }) {
  return (
    <div>
      {ordoredOutcomes.map(outcome => (
        <div className="StandardOutcome" key={outcome.outcomeId}>
          <div className="StandardOutcome--name">{outcome.name}</div>

          <div className="StandardOutcome--outcome">
            <Outcome
              price={outcome.price}
              suspended={outcome.status.suspended}
              displayable={outcome.status.displayable}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

StandardOutcomes.defaultProps = {
  ordoredOutcomes: []
};

StandardOutcomes.propTypes = {
  ordoredOutcomes: PropTypes.arrayOf(PropTypes.shape({}))
};

export default StandardOutcomes;
