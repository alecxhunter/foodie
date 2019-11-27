import React, { Component } from 'react';
import classNames from 'classnames';

class SearchBar extends Component {
    state = {
        query: '',
        showSearchResults: false
    }

    handleChangeQuery = (e) => {
        this.setState({
            query: e.target.value
        });
    }

    getFilteredData = () => {
        return this.props.data.filter(el => {
            return el[this.props.searchProperty].toLowerCase().includes(this.state.query.toLowerCase());
        });
    }

    handleClickResult = (obj) => {
        this.setState({
            query: obj[this.props.searchProperty],
            showSearchResults: false
        });
        this.props.handleResultSelected(obj);
    }

    handleClickQueryInput = () => {
        this.setState({
            showSearchResults: true
        });
    }

    render() {
        let self = this;
        let searchResultsClasses = classNames({
            'search-results': true,
            'd-none': !this.state.showSearchResults
        });
        return (
            <div className="search-bar">
                <ul className={searchResultsClasses}>
                {
                    this.getFilteredData().map((el, idx) => {
                        return (
                            <li key={idx} onClick={() => self.handleClickResult(el)}>
                                {el[self.props.displayProperty]}
                            </li>
                        );
                    })
                }
                </ul>
                <div className="search-query">
                    <input className="form-control" type="text" placeholder="Search" value={this.state.query} onChange={this.handleChangeQuery} onClick={this.handleClickQueryInput} />
                </div>
            </div>
        );
    }
}

export default SearchBar;