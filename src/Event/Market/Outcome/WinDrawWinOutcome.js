import React from "react";
import PropTypes from "prop-types";
import "./_winDrowWinOutcome.scss";
import Price from "../../../Price";

function WinDrawWinOutcome({ name, type, price, suspended, displayable }) {
  if (suspended) {
    return (
      <div className="WinDrawWinOutcome WinDrawWinOutcome__suspended">
        <div className="WindrawWinOutcome--suspended" title="Suspended">
          Susp
        </div>
      </div>
    );
  }

  return (
    <div className="WinDrawWinOutcome" title={name}>
      {displayable ? (
        <>
          <div className="WinDrawWinOutcome--name">{type}</div>
          <div className="WinDrawWinOutcome--price">
            <Price price={price} />
          </div>
        </>
      ) : (
        "-"
      )}
    </div>
  );
}

WinDrawWinOutcome.defaultProps = {
  name: "",
  type: "",
  suspended: false,
  price: {}
};

WinDrawWinOutcome.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  suspended: PropTypes.bool,
  displayable: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    den: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

export default WinDrawWinOutcome;
