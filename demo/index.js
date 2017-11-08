import React from "react";
import ReactDOM from "react-dom";
import hljs from "highlight.js";
import App from "./App.jsx";

import "react-ghfork/gh-fork-ribbon.css";
import "purecss/build/pure.css";
import "./main.css";
import "../style.css";

const app = document.getElementsByClassName("demonstration")[0];

ReactDOM.hydrate(<App />, app);

hljs.initHighlightingOnLoad();
