import React, { Component, PropTypes } from 'react';
import Spinner from 'react-spinner'
import PulsePostItem from './pulse-post-item'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class PulsePostList extends Component {
  
  constructor(props) {
    super(props)
  }
  
  handlePageChange = (page) => {
    const current = page + 1;
    const { fetchLatestPosts, childPath } = this.props;
    fetchLatestPosts(childPath, current)
  };
  
  render() {
    const { latestPosts: { latestPosts: { posts, pages }, fetching } } = this.props;
    
    return (
      <div>
        {fetching ? <Spinner fetching={fetching}/> : <div>
          {posts.map((data, key) => <PulsePostItem {...data} key={key}/>)}
          <Pagination onChange={this.handlePageChange} current={0} total={pages}/>
        </div>}
      </div>
    );
  }
}

export default PulsePostList;
