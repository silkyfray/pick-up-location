import React from "react";
import "./App.scss";
import PickUpInput from "../PickUpInput/PickUpInput";

function App() {
  return (
    <div className="App">
      <div className="SearchWrapper">
        <PickUpInput minCharsToSearch={2} />
      </div>
    </div>
  );
}

export default App;
