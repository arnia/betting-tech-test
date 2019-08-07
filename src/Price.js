import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Price({ price, decimal, dispatch, ...props }) {
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
    decimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    den: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default connect(({ settings }) => ({
  decimal: settings.showDecimalPrices
}))(React.memo(Price));
