import React, { useMemo } from "react";
import _ from "lodash";
import { ReactComponent as InfoIcon } from "./info.svg";
import StandardOutcome from "./Outcome/StandardOutcome";
import "./_market.scss";

function Market({ name, outcomesData, type, notes }) {
  const ordoredOutcomes = useMemo(
    () => _.orderBy(_.values(outcomesData), ["displayOrder"]),
    [outcomesData]
  );

  if (type === "standard") {
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

        {ordoredOutcomes.map(outcome => (
          <StandardOutcome
            key={outcome.outcomeId}
            name={outcome.name}
            price={outcome.price}
            suspended={outcome.status.suspended}
          />
        ))}
      </div>
    );
  }
  return null;
}

Market.defaultProps = {
  outcomesData: {},
  name: ""
};

export default Market;
