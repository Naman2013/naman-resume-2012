import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';

const mapStateToProps = ({ latestPosts }) => ({
  page: latestPosts.page,
  postsPerPage: latestPosts.postsPerPage,
  fetchingPopularPosts: latestPosts.fetchingPopularPosts,
  popularPosts: latestPosts.popularPosts,
});

@connect(mapStateToProps)
class PulseWrapper extends Component {
  static propTypes = {
    fetchingPopularPosts: PropTypes.bool,
    latestPosts: PropTypes.shape({
      posts: PropTypes.array,
      pages: PropTypes.number,
    }),
    page: PropTypes.number,
    postsPerPage: PropTypes.number,
    fetchLatestPosts: PropTypes.func,
    fetching: PropTypes.bool,
    children: PropTypes.element.isRequired,
  }

  static defaultProps = {
    fetchingPopularPosts: false,
    latestPosts: {
      posts: [],
      pages: null,
    },
    page: 1,
    postsPerPage: 10,
    fetching: true,
  }

  constructor(props) {
    super(props);
    const { fetchLatestPosts, childPath, route: { path }, page } = this.props;
    if (path !== 'all-posts') {
      fetchLatestPosts(path, childPath, page);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchLatestPosts, childPath, route: { path }, page } = this.props;
    if (nextProps.route.path !== 'all-posts' && (nextProps.childPath !== childPath || nextProps.route.path !== path)) {
      fetchLatestPosts(nextProps.route.path, nextProps.childPath, 1);
    }
  }

  render() {
    const {
      children,
      fetching,
      latestPosts: { posts, postsCount },
      route: { path },
      page,
      postsPerPage,
      fetchLatestPosts,
      formattedObjectIdList,
      showRecommends,
      popularPosts,
    } = this.props;

    return (
    <section className="">
      <div className="col-md-8">
        {
          (path !== 'all-posts' && fetching) ? <GenericLoadingBox /> : cloneElement(children, {
            path,
            page,
            postsPerPage,
            posts,
            postsCount,
            fetchLatestPosts,
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
