import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import OtherFeaturedObjects from '../../components/common/OtherFeaturedObjects/OtherFeaturedObjects';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;
const mapStateToProps = ({ authorContent, latestPosts }) => ({
  ...authorContent,
  popularPosts: latestPosts.popularPosts,
});

@connect(mapStateToProps)
class AuthorWrapper extends Component {
  static propTypes = {
    authorId: string.isRequired,
    childPath: string,
    count: number.isRequired,
    fetchAuthorContent: func.isRequired,
    fetching: bool.isRequired,
    fetchPopularPosts: func.isRequired,
    firstPostIndex: number.isRequired,
    page: number.isRequired,
    pages: number.isRequired,
    popularPosts: shape({
      itemList: arrayOf(shape({})),
    }).isRequired,
    posts: arrayOf(shape({

    })).isRequired,
    postsCount: number.isRequired,
    showAdUnit: bool.isRequired,
    showFeaturedObjects: bool.isRequired,
    showPopularPosts: bool.isRequired,
  }

  static defaultProps = {
    childPath: 'all',
  }

  constructor(props) {
    super()

    props.fetchPopularPosts();
  }

  render() {
    const {
      childPath,
      children,
      count,
      fetchAuthorContent,
      fetching,
      firstPostIndex,
      page,
      pages,
      params: { authorId },
      popularPosts,
      posts,
      postsCount,
      route: { path },
      showAdUnit,
      showFeaturedObjects,
      showPopularPosts,
    } = this.props;

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">

          {
            fetching && <GenericLoadingBox />
          }

          {!fetching && cloneElement(children, {
            authorId,
            childPath,
            count,
            fetchAuthorContent,
            firstPostIndex,
            page,
            pages,
            path,
            posts,
            postsCount,
          })}
        </div>

        <div className="col-md-4 mission-sidebar">
          {showAdUnit && <div className="ad">
            <GoogleAd
              adURL={'/5626790/Recommends'}
              adWidth={300}
              adHeight={250}
              targetDivID={'div-gpt-ad-1495111021281-0'}
            />
          </div>}
          {
            showPopularPosts && <PulsePopular
              list={popularPosts.itemList}
            />
          }
          {showFeaturedObjects && <OtherFeaturedObjects />}
        </div>
      </section>
    );
  }
}

export default AuthorWrapper;
