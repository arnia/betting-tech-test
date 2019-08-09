import React from "react";
import TogglePriceFormat from "../../components/TogglePrice";
import BetSlip from "../../components/BetSlip";
import "./_app.scss";

function App({ children }) {
  return (
    <div className="App">
      <div className="App--toggle-price-format">
        <TogglePriceFormat />
      </div>

      {children}

      <div className="App--betSlip">
        <BetSlip />
      </div>
    </div>
  );
}

export default App;
