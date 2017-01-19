import React, { Component, PropTypes, cloneElement } from 'react';
import PulsePopular from '../../components/pulse/sidebar/pulse-popular';
import PulseRecommended from '../../components/pulse/sidebar/pulse-recommends';
import MissionAd from '../../components/missions/mission-ad';
import Spinner from 'react-spinner'

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

const list2 = [
  {
    headline: 'As featured in the first Outer Limits episode.',
    icon: 'galaxy',
    title: 'Andromeda Galaxy (M31)',
    desc: 'Closest galaxy to the Milky Way. In approx. 4.5 billion years it will collide with the Milky Way, creating a giant elliptical galaxy.',
    date: 'Thursday, October 18th',
    time: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC',
  }, {
    headline: 'Don’t miss the red spot!',
    icon: 'jupiter',
    title: 'Jupiter',
    desc: 'The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other planets in the solar system combined.',
    date: 'Thursday, October 18th',
    time: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC',
  },
];

const tag = 'The Moon';

class PulseWrapper extends Component {
  componentDidMount() {
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
    } = this.props;

    console.log('looking for fetch latest posts');
    console.log(this.props);

    return (
      <section className="container clearfix">
        <div className="col-md-8 nopadding">
          {
            fetching ? <Spinner /> : cloneElement(children, {
              posts,
              pages,
              fetchLatestPosts,
            })
          }
        </div>

        <div className="col-md-4 mission-sidebar">
          <MissionAd />
          <PulsePopular list={list} />
          <PulsePopular tag={tag} list={list} />
          <PulseRecommended list={list2} />
        </div>

      </section>
    );
  }
}

export default PulseWrapper;

PulseWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
