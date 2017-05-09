import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import MissionAd from '../../components/missions/mission-ad';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';
import { getRandomAdvertisementIndex } from '../../modules/utils';


const list = [
  {
    label: 'A Painting Inspired by the possibility of life on Europa',
    link: '#',
    type: 'ART_CULTURE',
  }, {
    label: 'New Comet Discovered by Slooh Members',
    link: '#',
    type: 'SCIENCE_LOG',
  }, {
    label: 'My image of the M12 Globular Cluster taken from the Canary Islands',
    link: '#',
    type: 'DIY',
  }, {
    label: 'My Horoscope Changed! Who Am I Now?',
    link: '#',
    type: 'HUMAN_SPIRIT',
  }, {
    label: 'Image of Jupiter Moon transit',
    link: '#',
    type: 'SCIENCE_LOG',
  },
];

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
    fetchHottestPosts: PropTypes.func,
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
    fetchLatestPosts(path, childPath, page);


    this.randomAdIdx = getRandomAdvertisementIndex();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchLatestPosts, childPath, route: { path }, page } = this.props;

    if (nextProps.childPath !== childPath || nextProps.route.path !== path) {
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
      <section className="container clearfix">
        <div className="col-md-8 nopadding">
          {
            fetching ? <GenericLoadingBox /> : cloneElement(children, {
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
          <MissionAd index={this.randomAdIdx} />
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
