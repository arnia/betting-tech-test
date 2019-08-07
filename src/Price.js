import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Price({ price, decimal, ...props }) {
  if (decimal) {
    return <span {...props}>{price.decimal}</span>;
  }

  return (
    <span {...props}>
      {price.den}/{price.num}
    </span>
  );
}

Price.defaultProps = {
  decimal: false
};

Price.propTypes = {
  decimal: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.string,
    num: PropTypes.string,
    den: PropTypes.string
  }).isRequired
};

export default connect(({ settings }) => ({
  decimal: settings.showDecimalPrices
}))(React.memo(Price));
