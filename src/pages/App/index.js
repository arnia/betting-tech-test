import React from "react";
import TogglePriceFormat from "../../components/TogglePrice";
import "./_app.scss";

function App({ children }) {
  return (
    <div className="App">
      <div className="App--toggle-price-format">
        <TogglePriceFormat />
      </div>

      {children}
    </div>
  );
}

export default App;
