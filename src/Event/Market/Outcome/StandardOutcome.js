import React from "react";
import PropTypes from "prop-types";
import "./_standardOutcome.scss";
import Price from "../../../Price";

function StandardOutcome({ name, price, suspended }) {
  return (
    <div className="StandardOutcome">
      <div className="StandardOutcome--name">{name}</div>

      <div className="StandardOutcome--price">
        <Price price={price} />
      </div>
    </div>
  );
}

StandardOutcome.defaultProps = {
  name: "",
  suspended: false,
  price: {}
};

StandardOutcome.propTypes = {
  name: PropTypes.string,
  suspended: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.string,
    num: PropTypes.string,
    den: PropTypes.string
  })
};

export default StandardOutcome;
