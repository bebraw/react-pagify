'use strict';

var React = require('react');

var segmentize = require('./segmentize');


var Paginator = React.createClass({
    displayName: 'Paginator',

    propTypes: {
        onSelect: React.PropTypes.func,
        page: React.PropTypes.number,
        beginPages: React.PropTypes.number,
        endPages: React.PropTypes.number,
        className: React.PropTypes.string,
        ellipsesClassName: React.PropTypes.string,
    },
    getDefaultProps() {
        return {
            onSelect: noop,
            className: 'pagify-pagination',
            ellipsesClassName: ''
        };
    },
    render() {
        var onSelect = this.props.onSelect;
        var page = this.props.page;

        var segments = segmentize(this.props);
        segments = segments.reduce(function(a, b) {
            return a.concat(-1).concat(b);
        });

        var items = segments.map((num, i) => {
            if (num >= 0) {
                return (
                    <li
                        key={'pagination-' + i}
                        onClick={onSelect.bind(null, num)}
                        className={num === page && 'selected'}
                    >
                        <a href='#' onClick={this.preventDefault}>
                            {num + 1}
                        </a>
                    </li>
                );
            }

            return (
                <li
                    key={'pagination-' + i}
                    className={this.props.ellipsesClassName}
                >
                    &hellip;
                </li>
            );
        });

        return (
            <ul className={this.props.className}>
                {items}
            </ul>
        );
    },

    preventDefault(e) {
        e.preventDefault();
    },
});

function paginate(data, o) {
    data = data || [];

    var page = o.page || 0;
    var perPage = o.perPage;

    var amountOfPages = Math.ceil(data.length / perPage);
    var startPage = page < amountOfPages? page: 0;

    return {
        amount: amountOfPages,
        data: data.slice(startPage * perPage, startPage * perPage + perPage),
        page: startPage
    };
}

function noop() {}

Paginator.paginate = paginate;

module.exports = Paginator;
