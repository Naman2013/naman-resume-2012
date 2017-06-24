import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import ShowsList from '../../components/video-viewer/ShowsList';
import { fetchUpcomingShows } from '../../modules/browse-video-viewer/upcoming-shows-actions';
// import CategoryNavigation from '../../components/video-viewer/CategoryNavigation';

const {
  bool,
  number,
  string,
  shape,
  func,
  arrayOf,
} = PropTypes;
/*
const NAV_ITEMS = [
  {
    title: 'All Categories',
    link: '/shows/video-viewer/browse/recent-shows/all-categories',
  },
  {
    title: 'The Moon',
    link: '/shows/video-viewer/browse/recent-shows/the-moon',
  },
  {
    title: 'Deep Space',
    link: '/shows/video-viewer/browse/recent-shows/deep-space',
  },
  {
    title: 'Planets',
    link: '/shows/video-viewer/browse/recent-shows/planets',
  },
  {
    title: 'The Sun',
    link: '/shows/video-viewer/browse/recent-shows/the-sun',
  },
  {
    title: 'Comets',
    link: '/shows/video-viewer/browse/recent-shows/comets',
  },
  {
    title: 'Constellations',
    link: '/shows/video-viewer/browse/recent-shows/constellations',
  },
];

*/

function mapStateToProps({ videoViewerBrowser }) {
  return {
    ...videoViewerBrowser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUpcomingShows
    }, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class UpcomingShows extends Component {
  static propTypes = {
    actions: shape({
      fetchUpcomingShows: func,
    }),
    eventList: arrayOf(shape({
      eventDescription: string,
      eventDetailsURL: string,
      eventEnd: number,
      eventIconURL: string,
      eventId: string,
      eventImageURL: string,
      eventIndex: number,
      eventIsLive: bool,
      eventLinkTarget: string,
      eventLiveURL: string,
      eventShortDescription: string,
      eventShowRemindersIcon: bool,
      eventStart: number,
      eventStatus: string,
      eventTitle: string,
    })),
    resultsCount: string,
    page: number,
    pages: number,
    count: number,
  }
  static defaultProps = {
    actions: {
      fetchUpcomingShows: noop,
    },
    eventList: [],
    resultsCount: '0',
    page: 0,
    pages: 0,
    count: number,
  }
  constructor(props) {
    super(props);

    const { actions } = props;

    actions.fetchUpcomingShows({
      page: 1,
    });
  }
  render() {
    const {
      actions,
      eventList,
      resultsCount,
      page,
      pages,
      count,
    } = this.props;

    return (
      <div>
        { /*
        <CategoryNavigation
          navigationItems={NAV_ITEMS}
        />
        */ }
        <ShowsList
          eventList={eventList}
          resultsCount={resultsCount}
          pages={pages}
          page={page}
          count={count}
          paginate={actions.fetchUpcomingShows}
        />
      </div>
    );
  }

}

export default UpcomingShows;
