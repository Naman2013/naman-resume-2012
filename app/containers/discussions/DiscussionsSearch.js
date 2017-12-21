import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import DiscussionsListItem from '../../components/discussions/DiscussionsListItem';
import { searchForums } from '../../modules/discussions-search/actions';
import Search from '../../components/common/search/Search';
import 'rc-pagination/assets/index.css';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


const mapStateToProps = ({ discussionsSearch }) => ({
  ...discussionsSearch,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchForums,
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class DiscussionsSearch extends Component {
  static propTypes = {
    actions: shape({
      searchForums,
    }).isRequired,
    error: bool,
    firstPostIndex: number,
    fetching: bool.isRequired,
    page: number,
    posts: arrayOf(shape({})),
    postsPerPage: number.isRequired,
    postsCount: number,
    searchTriggered: bool.isRequired,
  };

  static defaultProps = {
    error: false,
    firstPostIndex: 0,
    page: 1,
    posts: [],
    postsCount: 0,
  }

  state = {
    searchTerm: '',
  };

  submitSearch = (searchterm) => {
    const {
      actions: { searchForums },
      page,
    } = this.props;
    searchForums({
      searchterm,
      page,
    });
  }

  handlePageChange = (page) => {
    const {
      actions: { searchForums },
    } = this.props;
    searchForums({
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

  render() {
    const {
      fetching,
      searchTriggered,
      posts,
      page,
      postsCount,
      postsPerPage,
    } = this.props;
    const { searchTerm } = this.state;
    const form = <Search
      submitSearch={this.submitSearch}
      searchTerm={searchTerm}
      updateSearchTerm={this.updateSearchTerm}
    />
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
      </div>);
    }

    return (
      <div>
        {form}
        {
          posts.map(item => (<DiscussionsListItem
            key={item.postId}
            item={item}
          />))
        }
        {posts.length > 0 && <Pagination onChange={this.handlePageChange} defaultPageSize={postsPerPage} current={page} total={postsCount} />}
      </div>
    );
  }
}

export default DiscussionsSearch;
