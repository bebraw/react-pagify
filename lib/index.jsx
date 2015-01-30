'use strict';

var React = require('react');

var segmentize = require('./segmentize');


var Paginator = React.createClass({
    render() {
        var onSelect = this.props.onSelect || noop;
        var page = this.props.page;

        var segments = segmentize(this.props);
        if(segments.length > 1) {
            segments = segments.reduce(function(a, b) {
                return a.concat(-1).concat(b);
            });
        }

        return <ul className='pagination'>{
            segments.map((num, i) =>
                num >= 0? <li
                    key={'pagination-' + i}
                    onClick={onSelect.bind(null, num)}
                    className={num === page && 'selected'}>
                    <a href='#' onClick={this.preventDefault}>
                        {num + 1}
                    </a>
                </li>: <li key={'pagination-' + i}>&hellip;</li>
            )
        }</ul>
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
