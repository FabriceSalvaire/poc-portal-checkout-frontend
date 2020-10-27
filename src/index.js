// -*- mode: rjsx; -*-

/**************************************************************************************************/

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/**************************************************************************************************/

// Application is wrapped in <div id='app'></div>
const wrapper = document.getElementById('app');
if (wrapper)
    ReactDOM.render(<App />, wrapper);
else
    console.log('Element id=app not found in the dom');
