import React from "react";
import PropTypes from "prop-types";
import "./_standardOutcome.scss";
import Price from "../../../Price";

function StandardOutcome({ name, price, suspended, displayable }) {
  if (suspended) {
    return (
      <div className="StandardOutcome StandardOutcome__suspended">
        <div className="StandardOutcome--name">{name}</div>
        <div className="StandardOutcome--price StandardOutcome--price__suspended">
          Susp
        </div>
      </div>
    );
  }

  return (
    <div className="StandardOutcome">
      <div className="StandardOutcome--name">{name}</div>
      {displayable ? (
        <div className="StandardOutcome--price StandardOutcome--price__value">
          <Price price={price} />
        </div>
      ) : (
        <div className="StandardOutcome--price StandardOutcome--price__no-value">
          -
        </div>
      )}
    </div>
  );
}

StandardOutcome.defaultProps = {
  name: "",
  suspended: false,
  displayable: true,
  price: {}
};

StandardOutcome.propTypes = {
  name: PropTypes.string,
  suspended: PropTypes.bool,
  displayable: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    den: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

export default StandardOutcome;
