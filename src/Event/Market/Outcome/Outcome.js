import React from "react";
import PropTypes from "prop-types";
import Price from "../../../Price";
import "./_outcome.scss";

function Outcome({ name, price, suspended, displayable }) {
  if (suspended) {
    return (
      <div className="Outcome Outcome__suspended">
        <div className="Outcome--price">Susp</div>
      </div>
    );
  }

  return (
    <div className="Outcome" title={name}>
      {displayable ? (
        <>
          {name ? <div className="Outcome--name">{name}</div> : null}
          <div className="Outcome--price Outcome--price__value">
            <Price price={price} />
          </div>
        </>
      ) : (
        <div className="Outcome--price Outcome--price__no-value">-</div>
      )}
    </div>
  );
}

Outcome.defaultProps = {
  name: "",
  suspended: false,
  displayable: true,
  price: {}
};

Outcome.propTypes = {
  name: PropTypes.string,
  suspended: PropTypes.bool,
  displayable: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    den: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

export default Outcome;
