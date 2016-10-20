import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import BlogPostTile from '../../components/common/blog-post-tile/blog-post-tile';

import style from './best-of-slooh.scss';
import CONTENT from '../../content/best-of-slooh';



class BestOfSlooh extends Component {
  render() {
    return(
      <div className="best-of-slooh col-md-12">
        <div className="title-bar">
          <div className="">
            <h1 className="title"><span className="highlight">Best of Slooh</span> October 2017</h1>
            <h2 className="subtitle">A curated list of your best expressions about objects in the night sky.</h2>
          </div>
          <div className="sponsor">
            Sponsored by: <img src="foo.jpg" height="20" />
          </div>
          <div className="call-to-action">
            <Link className="action" to="">Create New Post</Link>
          </div>
        </div>

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
