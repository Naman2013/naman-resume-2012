import React, { Component, PropTypes } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import PulseNav from '../../components/pulse/pulse-nav';
import PulsePostHeader from '../../components/pulse/pulse-post-header';

const list2 = {
  name: 'The Moon',
  icon: 'moon',
};

const list = [
  {
    label: 'LATEST ENTRIES',
    route: 'latest-entries',
    children: [
      {
        label: 'All Categories',
        route: 'all',
      }, {
        label: 'Science Log',
        route: 'science-log',
      }, {
        label: 'Art & Culture',
        route: 'art-culture',
      }, {
        label: 'Human Spirit',
        route: 'human-spirit',
      }, {
        label: 'DIY',
        route: 'diy',
      },
    ],
  }
];

class ObjectList extends Component {

  render() {
    const { route, location, children } = this.props;

    return (
      <div className="clearfix pulse">
        <AnnouncementBanner />
        <PulsePostHeader {...list2} />

        <PulseNav route={route} location={location} list={list} className="grey" />
        {children}
      </div>
    );
  }
}

ObjectList.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ObjectList;
