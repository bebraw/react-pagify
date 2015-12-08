'use strict';

var React = require('react');

var np = require('./np');
var segmentize = require('./segmentize');


var Paginator = React.createClass({
    displayName: 'Paginator',

    propTypes: {
        onSelect: React.PropTypes.func,
        page: React.PropTypes.number,
        beginPages: React.PropTypes.number,
        endPages: React.PropTypes.number,
        showPrevNext: React.PropTypes.bool,
        alwaysShowPrevNext: React.PropTypes.bool,
        className: React.PropTypes.string,
        ellipsesClassName: React.PropTypes.string,
        prevClassName: React.PropTypes.string,
        nextClassName: React.PropTypes.string,
        activeClassName: React.PropTypes.string,
        inactiveClassName: React.PropTypes.string,
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
            nextClassName: 'pagify-next',
            activeClassName: 'selected',
            inactiveClassName: 'pagify-disabled'
        };
    },
    render() {
        var {
            onSelect,
            page,
            ellipsesClassName,
            className,
            showPrevNext,
            alwaysShowPrevNext,
            prevClassName,
            nextClassName,
            activeClassName,
            inactiveClassName,
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
                        className={num === page && activeClassName || ''}
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

        var lastPage = segments[segments.length - 1];

        var isFirstPage = page === 0;
        var isLastPage = page === lastPage;

        prevClassName += np.maybeAddInactive(isFirstPage, alwaysShowPrevNext,
                                             inactiveClassName);
        nextClassName += np.maybeAddInactive(isLastPage, alwaysShowPrevNext,
                                             inactiveClassName);

        var prevButton = (
            <li
                onClick={onSelect.bind(null, np.prev(page))}
                className={prevClassName}
            >
                <a href='#' onClick={this.preventDefault}>
                    {this.props.prevButton ? this.props.prevButton : 'Previous'}
                </a>
            </li>
        );

        var nextButton = (
            <li
                onClick={onSelect.bind(null, np.next(page, lastPage))}
                className={nextClassName}
            >
                <a href='#' onClick={this.preventDefault}>
                    {this.props.nextButton ? this.props.nextButton : 'Next'}
                </a>
            </li>
        );

        return (
            <ul className={className}>
                {(alwaysShowPrevNext || (showPrevNext && !isFirstPage)) && prevButton}
                {items}
                {(alwaysShowPrevNext || (showPrevNext && !isLastPage)) && nextButton}
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
