[![build status](https://secure.travis-ci.org/bebraw/react-pagify.png)](http://travis-ci.org/bebraw/react-pagify)
# react-pagify - Simple pagination for React

`react-pagify` provides a simple interface for pagination Consider the usage example below.

## Usage

```javascript
var Paginator = require('react-pagify');

require('react-pagify/style.css');


module.exports = React.createClass({
    getInitialState() {
        return {
            data: [
                ...
            ],
            pagination: {
                page: 0,
                perPage: 5
            },
        };
    },

    render() {
        var data = this.state.data || [];
        var pagination = this.state.pagination || {};
        var paginated = Paginator.paginate(data, pagination);

        return <article>
            <div className='per-page-container'>
                <span>Per page</span>
                <input
                    type='text'
                    defaultValue={pagination.perPage}
                    onChange={this.onPerPage}>
                </input>
            </div>

            <Paginator
                className='pagify-pagination'
                ellipsesClassName='pagify-ellipsis'
                page={paginated.page}
                pages={paginated.amount}
                beginPages={3}
                endPages={3}
                showPrevNext={true}
                onSelect={this.onSelect}>
            </Paginator>

            <div className='data'>
                ...
            </div>
        </article>;
    },

    onSelect(page) {
        var pagination = this.state.pagination || {};

        pagination.page = page;

        this.setState({
            pagination: pagination
        });
    },

    onPerPage(e) {
        var pagination = this.state.pagination || {};

        pagination.perPage = parseInt(event.target.value, 10);

        this.setState({
            pagination: pagination
        });
    },
});
```

## Contributors

* [rowbare](https://github.com/rowbare) - Allow usage in Bootstrap by making `className` customizable
* [Nadav Spiegelman](https://github.com/nadavspi) - Add optional ellipsesClassName prop

## License

`react-pagify` is available under MIT. See LICENSE for more details.
