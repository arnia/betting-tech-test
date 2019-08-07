import React, { useMemo } from "react";
import _ from "lodash";
import { ReactComponent as InfoIcon } from "./info.svg";
import StandardOutcome from "./Outcome/StandardOutcome";
import WinDrawWinOutcome from "./Outcome/WinDrawWinOutcome";
import "./_market.scss";

function Market({ name, outcomesData, type, notes }) {
  const ordoredOutcomes = useMemo(
    () => _.orderBy(_.values(outcomesData), ["displayOrder"]),
    [outcomesData]
  );

  return (
    <div className="Market">
      <div className="Market--header">{name}</div>

      {notes ? (
        <div className="Market--notes">
          <InfoIcon height={18} width={18} />
          <span className="Market--notes-bullet">&bull;</span>
          <span>{notes}</span>
        </div>
      ) : null}

      {type === "standard"
        ? ordoredOutcomes.map(outcome => (
            <StandardOutcome
              key={outcome.outcomeId}
              name={outcome.name}
              price={outcome.price}
              suspended={outcome.status.suspended}
              displayable={outcome.status.displayable}
            />
          ))
        : null}

      {type === "win-draw-win" ? (
        <div className="Market--win-draw-win">
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
      ) : null}
    </div>
  );
}

Market.defaultProps = {
  outcomesData: {},
  name: ""
};

export default Market;
