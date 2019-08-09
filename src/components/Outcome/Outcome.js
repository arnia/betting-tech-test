import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Price from "../Price";
import "./_outcome.scss";

function Outcome({ name, price, id, suspended, displayable, addToBetSlip }) {
  if (suspended) {
    return (
      <div className="Outcome Outcome__suspended">
        <div className="Outcome--price">Susp</div>
      </div>
    );
  }

  return (
    <div className="Outcome">
      {displayable ? (
        <>
          {name ? <div className="Outcome--name">{name}</div> : null}
          <div
            className="Outcome--price Outcome--price__value"
            title="Add to bet slip"
            onClick={addToBetSlip}
          >
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  suspended: PropTypes.bool,
  displayable: PropTypes.bool,
  price: PropTypes.shape({
    decimal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    den: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  addToBetSlip: PropTypes.func.isRequired
};

export default connect(
  null,
  (dispatch, props) => ({
    addToBetSlip: () => {
      if (props.id) {
        dispatch({ type: "BET_SLIP_ADD", outcomeId: props.id });
      }
    }
  })
)(Outcome);
