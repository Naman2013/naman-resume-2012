import React, { Component } from 'react';
import AnnouncementBanner from '../components/common/announcement-banner/announcement-banner'
import ReserveBanner from '../components/pulse/reserve-banner';
import PulseNav from '../components/pulse/pulse-nav';

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

export default class SloohPulse extends Component {

  render() {

    const { route, location, children } = this.props;

    return (
      <div>
        <div className="clearfix pulse">
          <AnnouncementBanner />
          <ReserveBanner />

          <PulseNav route={route} location={location} list={list}/>

          {children}
        </div>
      </div>
    );
  }
}
