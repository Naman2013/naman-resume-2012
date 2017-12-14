import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import 'rc-pagination/assets/index.css';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import PulsePostItem from './pulse-post-item';
const { bool, func, number } = PropTypes;
class PulseSearch extends Component {
  static propTypes = {
    fetching: bool,
    page: number,
    resetIlluminationsPosts: func,
    searchPosts: func,
    searchTriggered: bool,
  }

  static defaultProps = {
    fetching: false,
    page: 1,
    posts: [],
    resetIlluminationsPosts: noop,
    searchPosts: noop,
    searchTriggered: false,
  }

  state = {
    searchTerm: '',
  }

  componentDidMount() {
    this.props.resetIlluminationsPosts();
  }

  handlePageChange = (page) => {
    const {
      searchPosts,
    } = this.props;
    searchPosts({
      searchterm: this.state.searchTerm,
      page
    });
  };

  updateSearchTerm = (e) => {
    const searchTerm = e.target.value;
    this.setState(() => ({
      searchTerm,
    }));
  }

  submitSearch = (e) => {
    const {
      searchPosts,
      page
    } = this.props;
    e.preventDefault();

    searchPosts({
      searchterm: this.state.searchTerm,
      page
    });
  }

  render() {
    const {
      fetching,
      page,
      posts,
      postsCount,
      postsPerPage,
      searchTriggered,
    } = this.props;
    const { searchTerm } = this.state;
    const form = (<form>
      <div>
        <label htmlFor="searchterm" className="search-label">Enter a search term below, then click 'Search'.</label>
        <input type="text" className="search-input" value={searchTerm} onChange={this.updateSearchTerm} />
        {searchTerm && <button
          id="searchterm"
          className="button btn-primary search-button"
          type="submit"
          onClick={this.submitSearch}
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
    </form>);

    if (!fetching && searchTriggered && !posts.length) {
      return (
        <div>
          {form}
          <div className="center">
            <h3>No matching posts...</h3>
          </div>
        </div>
      );
    }

    if (fetching && !posts.length) {
      return (<div>
        {form}
        <GenericLoadingBox />
        </div>
      );
    }

    return (
      <div>
        {form}
        {
          posts.map(data => <PulsePostItem {...data} key={uniqueId()} />)
        }
        {posts.length > 0 && <Pagination onChange={this.handlePageChange} defaultPageSize={postsPerPage} current={page} total={postsCount} />}
      </div>
    );
  }
}

export default PulseSearch;
