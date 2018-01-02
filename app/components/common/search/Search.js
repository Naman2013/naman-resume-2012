import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const {
  func,
  string,
} = PropTypes;

class Search extends Component {
  static propTypes = {
    promptText: string,
    submitSearch: func.isRequired,
    searchTerm: string.isRequired,
    updateSearchTerm: func.isRequired,
  };

  static defaultProps = {
    promptText: 'Enter a search term below, then click \'Search\'.',
    submitSearch: noop,
  }


  submit = (e) => {
    const {
      searchTerm,
      submitSearch,
    } = this.props;
    e.preventDefault();

    submitSearch(searchTerm);
  }

  render() {
    const {
      promptText,
      searchTerm,
      updateSearchTerm,
    } = this.props;

    return (
      <form>
        <div>
          <label htmlFor="searchterm" className="search-label">{promptText}</label>
          <input type="text" className="search-input" value={searchTerm} onChange={updateSearchTerm} />
          {searchTerm && <button
            id="searchterm"
            className="button btn-primary search-button"
            type="submit"
            onClick={this.submit}
          >
              Search
            </button>}
        </div>
        <style jsx>{`
          .search-label {
            display: block;
          }
          .search-input {
            border-style: solid;
            border-width: 1px;
            padding: 10px;
            width: 70%;
            margin-right: 10px;
          }
          .search-button {
            margin: 0;
          }
        `}</style>
      </form>
    );
  }
}

export default Search;
