import React, { Component, PropTypes } from 'react';
import BlogPostTile from '../../components/common/blog-post-tile/blog-post-tile';

import style from './best-of-slooh.scss';
import CONTENT from '../../content/best-of-slooh';



class BestOfSlooh extends Component {
  render() {
    return(
      <div className="best-of-slooh col-md-12">
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
