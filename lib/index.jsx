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
        showPrevNext: React.PropTypes.bool,
        className: React.PropTypes.string,
        ellipsesClassName: React.PropTypes.string,
        prevClassName: React.PropTypes.string,
        nextClassName: React.PropTypes.string,
        prevButton: React.PropTypes.node,
        nextButton: React.PropTypes.node
    },
    getDefaultProps() {
        return {
            onSelect: noop,
            showPrevNext: false,
            className: 'pagify-pagination',
            ellipsesClassName: '',
            prevClassName: 'pagify-prev',
            nextClassName: 'pagify-next'
        };
    },
    render() {
        var {
            onSelect,
            page,
            ellipsesClassName,
            className,
            showPrevNext,
            prevClassName,
            nextClassName
        } = this.props;

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
                    className={ellipsesClassName}
                >
                    &hellip;
                </li>
            );
        });

        var prevButton = (
            <li
                onClick={onSelect.bind(null, page - 1)}
                className={prevClassName}
            >
                <a href='#' onClick={this.preventDefault}>
                    {this.props.prevButton ? this.props.prevButton : 'Previous'}
                </a>
            </li>
        );

        var isFirstPage = page === 0;
        var isLastPage = page === segments[segments.length - 1];

        var nextButton = (
            <li
                onClick={onSelect.bind(null, page + 1)}
                className={nextClassName}
            >
                <a href='#' onClick={this.preventDefault}>
                    {this.props.nextButton ? this.props.nextButton : 'Next'}
                </a>
            </li>
        );

        return (
            <ul className={className}>
                {showPrevNext && !isFirstPage && prevButton}
                {items}
                {showPrevNext && !isLastPage && nextButton}
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
