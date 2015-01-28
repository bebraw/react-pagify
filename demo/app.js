'use strict';

require('highlight.js/styles/github.css');
require('react-ghfork/style.css');
require('./demo.css');
require('../style.css');

var React = require('react');
var Fork = require('react-ghfork');

var Paginate = require('../index.jsx');

var readme = require('../README.md');


module.exports = React.createClass({
    render() {
        return <article>
            <Fork project='bebraw/react-pagify'></Fork>
            <Paginate></Paginate>
            <div dangerouslySetInnerHTML={{__html: readme}}></div>
        </article>;
    },
});
