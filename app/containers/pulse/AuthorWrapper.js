import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherFeaturedObjects from '../../components/common/OtherFeaturedObjects/OtherFeaturedObjects';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';

const mapStateToProps = ({ authorContent }) => ({
  ...authorContent
});

@connect(mapStateToProps)
class AuthorWrapper extends Component {
  static propTypes = {

  }

  static defaultProps = {
  }

  render() {
    const {
      authorId,
      posts,
      fetching,
      showFeaturedObjects,
      showAdUnit,
      showPopularPosts,
      pages,
      page,
      count,
      postsCount,
      firstPostIndex,
      fetchAuthorContent,
      children,
      route: { path },
    } = this.props;
    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">

          {
            fetching && <GenericLoadingBox />
          }

          {!fetching && cloneElement(children, {
            authorId,
            pages,
            page,
            posts,
            count,
            path,
            postsCount,
            fetchAuthorContent,
            firstPostIndex,
          })}
        </div>

        <div className="col-md-4 mission-sidebar">
          {showFeaturedObjects && <OtherFeaturedObjects />}
          {/*
            showPopularPosts && < />
          */}

        </div>
      </section>
    );
  }
}

export default AuthorWrapper;
