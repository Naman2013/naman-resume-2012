import React, { Component, PropTypes } from 'react';
import BlogPostTile from './blog-post-tile';
import CONTENT from '../../content/best-of-slooh';

class BestOfSlooh extends Component {
  render() {
    return(
      <div className="best-of-slooh">
        {
          this.props.blogPosts.map(post => (
            <BlogPostTile {...post} />
          ))
        }
      </div>
    );
  }
}

BestOfSlooh.defaultProps = CONTENT;

BestOfSlooh.propTypes = {
  blogPosts: PropTypes.array,
};

export default BestOfSlooh;
