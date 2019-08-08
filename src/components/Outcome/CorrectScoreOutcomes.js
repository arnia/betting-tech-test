import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Outcome from "./Outcome";
import "./_correctScore.scss";

function CorrectScoreOutcomes({ ordoredOutcomes }) {
  const grouped = _.groupBy(ordoredOutcomes, o => o.type || "loading");
  const maxCount = _.max(_.values(grouped).map(p => p.length));

  return (
    <div className="CorrectScoreOutcomes">
      <div className="CorrectScoreOutcomes--header">
        {_.keys(grouped).map(type => (
          <span key={type}>{type}</span>
        ))}
      </div>

      {_.range(maxCount).map(row => (
        <div key={row} className="CorrectScoreOutcomes--row">
          {_.keys(grouped).map(col => {
            const outcome = grouped[col][row];
            const home = _.get(outcome, "score.home", "0");
            const away = _.get(outcome, "score.away", "0");
            return outcome ? (
              <Outcome
                key={outcome.outcomeId}
                name={`${home}-${away}`}
                price={outcome.price}
                suspended={outcome.status.suspended}
                displayable={outcome.status.displayable}
              />
            ) : (
              <Outcome key={row + "" + col} suspended />
            );
          })}
        </div>
      ))}
    </div>
  );
}

CorrectScoreOutcomes.defaultProps = {
  ordoredOutcomes: []
};

CorrectScoreOutcomes.propTypes = {
  ordoredOutcomes: PropTypes.arrayOf(PropTypes.shape({}))
};

export default React.memo(CorrectScoreOutcomes);
