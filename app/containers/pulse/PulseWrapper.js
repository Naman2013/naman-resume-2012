import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';

const NO_INITIAL_POST_CALL = ['all-posts', 'search'];

class PulseWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    fetching: PropTypes.bool,
    fetchingPopularPosts: PropTypes.bool,
    fetchPosts: PropTypes.func,
    illuminations: PropTypes.shape({
      posts: PropTypes.array,
      pages: PropTypes.number,
    }),
    page: PropTypes.number,
    postsPerPage: PropTypes.number,
    resetIlluminationsPosts: PropTypes.func,
    searchTriggered: PropTypes.bool,
    searchPosts: PropTypes.func,
  }

  static defaultProps = {
    fetchingPopularPosts: false,
    illuminations: {
      posts: [],
      pages: null,
    },
    page: 1,
    postsPerPage: 10,
    fetching: true,
    searchTriggered: false,
    fetchPosts: noop,
    resetIlluminationsPosts: noop,
    searchPosts: noop,
  }

  constructor(props) {
    super(props);
    const { fetchPosts, childPath, route: { path }, page } = this.props;
    if (NO_INITIAL_POST_CALL.indexOf(path) === -1) {
      fetchPosts(path, childPath, page);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts, childPath, route: { path }, page } = this.props;
    if (NO_INITIAL_POST_CALL.indexOf(nextProps.route.path) === -1 && (nextProps.childPath !== childPath || nextProps.route.path !== path)) {
      fetchPosts(nextProps.route.path, nextProps.childPath, 1);
    }
  }

  render() {
    const {
      children,
      fetching,
      fetchPosts,
      formattedObjectIdList,
      illuminations: { posts, postsCount },
      page,
      popularPosts,
      postsPerPage,
      resetIlluminationsPosts,
      route: { path },
      showRecommends,
      searchPosts,
      searchTriggered,
    } = this.props;

    return (
      <section className="">
        <div className="col-md-8">
          {
            (NO_INITIAL_POST_CALL.indexOf(path) === -1 && fetching) ? <GenericLoadingBox /> : cloneElement(children, {
              fetching,
              path,
              page,
              postsPerPage,
              posts,
              postsCount,
              fetchPosts,
              resetIlluminationsPosts,
              searchPosts,
              searchTriggered,
            })
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          <GoogleAd
            adURL={'/5626790/Community'}
            adWidth={300}
            adHeight={250}
            targetDivID={'div-gpt-ad-1495110800300-0'}
          />

          {
            popularPosts.itemList.length > 0 ?
              <PulsePopular
                list={popularPosts.itemList}
              /> : null
          }
          {
            showRecommends ?
              <SloohRecommends
                title="Slooh Recommends These Objects"
                subTitle="Reserve a mission by clicking below on these visible objects..."
                recommendations={formattedObjectIdList}
              /> : null
          }
        </div>
      </section>
    );
  }
}

export default PulseWrapper;
