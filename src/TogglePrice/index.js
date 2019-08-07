import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./_togglePrice.scss";

const options = [
  { value: true, label: "Show prices in 'decimal' format" },
  { value: false, label: "Show prices in 'fraction' format" }
];

function TogglePriceFormat({ showDecimalPrices, toggle }) {
  return options.map(o => (
    <div className="TogglePrice--option" key={o.value}>
      <input
        id={`radio${o.value}`}
        type="radio"
        value={o.value}
        checked={o.value === showDecimalPrices}
        name="decimalFormt"
        onChange={e => toggle()}
      />
      <label htmlFor={`radio${o.value}`}>{o.label}</label>
    </div>
  ));
}

TogglePriceFormat.propTypes = {
  showDecimalPrices: PropTypes.bool,
  toggle: PropTypes.func.isRequired
};

export default connect(
  ({ settings }) => ({
    showDecimalPrices: settings.showDecimalPrices
  }),
  dispatch => ({
    toggle: () => dispatch({ type: "TOGGLE_PRICE_FORMAT" })
  })
)(TogglePriceFormat);
