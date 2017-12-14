import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import GoogleAd from '../../components/common/google-ads/GoogleAd';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';

const mapStateToProps = ({ illuminationsPosts }) => ({
  page: illuminationsPosts.page,
  postsPerPage: illuminationsPosts.postsPerPage,
  fetchingPopularPosts: illuminationsPosts.fetchingPopularPosts,
  popularPosts: illuminationsPosts.popularPosts,
});

@connect(mapStateToProps)
class PulseWrapper extends Component {
  static propTypes = {
    fetchingPopularPosts: PropTypes.bool,
    illuminations: PropTypes.shape({
      posts: PropTypes.array,
      pages: PropTypes.number,
    }),
    page: PropTypes.number,
    postsPerPage: PropTypes.number,
    fetchPosts: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    children: PropTypes.element.isRequired,
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
  }

  constructor(props) {
    super(props);
    const { fetchPosts, childPath, route: { path }, page } = this.props;
    if (path !== 'all-posts') {
      fetchPosts(path, childPath, page);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts, childPath, route: { path }, page } = this.props;
    if (nextProps.route.path !== 'all-posts' && (nextProps.childPath !== childPath || nextProps.route.path !== path)) {
      fetchPosts(nextProps.route.path, nextProps.childPath, 1);
    }
  }

  render() {
    const {
      children,
      fetching,
      illuminations: { posts, postsCount },
      route: { path },
      page,
      postsPerPage,
      fetchPosts,
      formattedObjectIdList,
      showRecommends,
      popularPosts,
    } = this.props;
    console.log(this.props)
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
            fetchPosts,
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
