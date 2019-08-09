import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactComponent as ExpandIcon } from "../expand-arrow.svg";
import { ReactComponent as CollapseIcon } from "../expand-button.svg";
import Bet from "../Bet";
import "./_betslip.scss";

function BetSlip({ betSlip }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={
        "BetSlip " + (expanded ? "BetSlip__expanded" : "BetSlip__collapsed")
      }
    >
      <div className="BetSlip--header" onClick={e => setExpanded(!expanded)}>
        <div className="BetSlip--name">BetSlip({betSlip.length})</div>

        <div className="BetSlip--toggle">
          {expanded ? (
            <ExpandIcon title="expand" height={15} width={15} />
          ) : (
            <CollapseIcon title="collapse" height={15} width={15} />
          )}
        </div>
      </div>

      {expanded ? (
        <div className="BetSlip--content">
          {betSlip.map(id => (
            <Bet key={id} id={id} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

BetSlip.defaultProps = {
  betSlip: []
};

BetSlip.propTypes = {
  betSlip: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};

export default connect(state => ({ betSlip: state.betSlip }))(BetSlip);
