import React, { Component, PropTypes } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { uniqueId } from 'lodash';
import PulsePostItem from './pulse-post-item';

class PulsePostList extends Component {
  handlePageChange = (page) => {
    const current = page + 1;
    const { fetchLatestPosts, childPath } = this.props;

    fetchLatestPosts(childPath, current);
  };

  render() {
    const { posts, pages } = this.props;

    if (!posts) {
      return (
        <div>
          <h3>No posts available...</h3>
        </div>
      );
    }
    return (
      <div>
        {
          posts.map(data => <PulsePostItem {...data} key={uniqueId()} />)
        }
        <Pagination onChange={this.handlePageChange} current={0} total={pages} />
      </div>
    );
  }
}

export default PulsePostList;
