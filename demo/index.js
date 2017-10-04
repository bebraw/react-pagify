import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import App from './App.jsx';

const app = document.getElementsByClassName('demonstration')[0];

ReactDOM.hydrate(<App />, app);

hljs.initHighlightingOnLoad();
