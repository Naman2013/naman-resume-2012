import React, { Component, PropTypes } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import PulseListHeader from '../../components/pulse/pulse-list-header';
import PulseNav from '../../components/pulse/pulse-nav';


const list = [
  {
    label: "THE LATEST POSTS",
    route: "latest-posts",
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
    label: "THE HOTTEST POSTS",
    route: "hottest-posts",
  }
];

class PulseList extends Component {

  render() {
    const { route, location, children } = this.props;

    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulseListHeader />

        <PulseNav route={route} location={location} list={list}/>

        {children}

      </div>
    )
  }
}

export default PulseList;

PulseList.propTypes = {
  children: PropTypes.element.isRequired
};