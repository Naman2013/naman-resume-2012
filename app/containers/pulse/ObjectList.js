import React, { Component, PropTypes } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseNav from '../../components/pulse/pulse-nav';
import PulsePostHeader from '../../components/pulse/pulse-post-header';

const list2 = {
  name: "The Moon",
  icon: "moon",
};

const list = [
  {
    label: "ALL-TIME BEST",
    route: "all-time-best",
    children: [
      {
        label: "All Categories",
        route: "all",
      }, {
        label: "Science Log",
        route: "science-log",
      }, {
        label: "Art & Culture",
        route: "art-culture",
      }, {
        label: "Human Spirit",
        route: "human-spirit",
      }, {
        label: "DIY",
        route: "diy",
      },
    ]
  }, {
    label: "LATEST ENTRIES",
    route: "latest-entries",
  }
];

class ObjectList extends Component {

  render() {
    const { route, location, children } = this.props;

    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulsePostHeader {...list2} />

        <PulseNav route={route} location={location} list={list} className="grey"/>

        {children}

      </div>
    )
  }
}

export default ObjectList;

ObjectList.propTypes = {
  children: PropTypes.element.isRequired
};