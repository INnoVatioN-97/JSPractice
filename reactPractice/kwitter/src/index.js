import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./styles.css";

// index.js import 설정
// IE9의 경우
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

// IE11의 경우
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

//index.js import 설정
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);