import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from 'react-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogPostTile from '../../components/common/blog-post-tile/blog-post-tile';
import { fetchBest } from '../../modules/best-of-slooh/get-best-action';
import style from './best-of-slooh.scss';


const mapStateToProps = ({ bestPosts }) => ({ ...bestPosts });

const mapDispatchToProps = dispatch => ({
  fetchBest: bindActionCreators(fetchBest, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class BestOfSlooh extends Component {

  componentWillMount() {
    this.props.fetchBest();
  }

  render() {
    const { fetching, bestPosts, date, sponsor } = this.props;

    return (
      <div className="best-of-slooh col-md-12">

        <div className="best-header clearfix">

          <div className="col-md-9">
            <h1 className="best-header-title"><span className="highlight">Best of Slooh</span> {date}</h1>
            <h2 className="best-header-subtitle">A curated list of your best expressions about objects in the night
              sky.</h2>
          </div>

          <div className="col-md-3 best-header-call">
            <Link className="action" to="publish-post">Create New Post</Link>
          </div>

        </div>

        {
          fetching ? <Spinner /> : bestPosts.map(post => <BlogPostTile key={post.postId} {...post} />)
        }

      </div>
    );
  }
}


BestOfSlooh.propTypes = {
  blogPosts: PropTypes.array,
};

export default BestOfSlooh;
