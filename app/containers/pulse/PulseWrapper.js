import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';
import GenericLoadingBox from '../../components/common/loading-screens/generic-loading-box';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import MissionAd from '../../components/missions/mission-ad';
import SloohRecommends from '../../components/common/recommendations/SloohRecommends';

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
    fetching: true,
  }

  constructor(props) {
    super(props);

    const { fetchLatestPosts, childPath } = this.props;
    fetchLatestPosts(childPath, 1);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchLatestPosts, childPath } = this.props;
    if (nextProps.childPath !== childPath) {
      fetchLatestPosts(nextProps.childPath, 1);
    }
  }

  render() {
    const {
      children,
      fetching,
      latestPosts: { posts, pages },
      fetchLatestPosts,
      formattedObjectIdList,
      showRecommends,
      popularPosts,
    } = this.props;

    console.log(popularPosts);

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">
          {
            fetching ? <GenericLoadingBox /> : cloneElement(children, {
              posts,
              pages,
              fetchLatestPosts,
            })
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          <MissionAd />
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
