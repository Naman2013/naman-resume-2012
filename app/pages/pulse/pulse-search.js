import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import uniqueId from 'lodash/uniqueId';
import PulsePostItem from './pulse-post-item';

class PulseSearch extends Component {
  handlePageChange = (page) => {
    const { fetchPosts, childPath, path } = this.props;
    fetchPosts(path, childPath, page);
  };

  render() {
    const { posts, postsCount, postsPerPage, page } = this.props;

    if (!posts.length) {
      return (
        <div className="center">
          <h3>No posts available...</h3>
        </div>
      );
    }
    return (
      <div>
        {
          posts.map(data => <PulsePostItem {...data} key={uniqueId()} />)
        }
        <Pagination onChange={this.handlePageChange} defaultPageSize={postsPerPage} current={page} total={postsCount} />
      </div>
    );
  }
}

export default PulseSearch;
