import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { uniqueId } from 'lodash';
import PulsePostItem from './pulse-post-item';

class PulsePostList extends Component {
  handlePageChange = (page) => {
    const { fetchLatestPosts, childPath, path } = this.props;
    fetchLatestPosts(path, childPath, page);
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

export default PulsePostList;
