import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import Show from './Show';
import Pagination from '../common/pagination/Pagination';
import { gray } from '../../styles/variables/colors';

class ShowsList extends Component {
  constructor(props) {
    super(props);
  }

  handleNextPageClick = () => {
    const { paginate, page } = this.props;
    paginate({
      page: page + 1,
    });
  }

  handlePreviousPageClick = () => {
    const { paginate, page } = this.props;
    paginate({
      page: page - 1,
    });
  }

  getEventLink = (event) => {
    if (event.eventLinkTarget === 'videoviewer') {
      return `/shows/video-viewer/${event.eventId}`;
    }

    if (event.eventLinkTarget === 'videoevent') {
      return `/shows/event-details/${event.eventId}`;
    }

    if (event.eventLinkTarget === 'ssr') {
      return `/shows/situation-room/${event.eventId}`;
    }
  }

  render() {
    const {
      eventList,
      galleryType,
      colNum,
      resultsCount,
      page,
      pages,
      count,
      paginate,
      textSize,
    } = this.props;

    const containerColClassNames = classnames({
      'col-xs-12': !galleryType,
    });
    const listColClassNames = classnames({
      [`col-lg-${colNum} col-md-6 `]: !galleryType,
      'col-xs-12': galleryType,
    });
    const firstImageNumberIndex = (eventList[0] && eventList[0].eventIndex) || 0;
    const rangeText = Pagination.generateRangeText({
      startRange: firstImageNumberIndex,
      itemsPerPage: eventList.length, // use length here because there may be less than maxImageCount
    });

    const canNext = (firstImageNumberIndex + count) < resultsCount;
    const canPrevious = firstImageNumberIndex !== 0;

    return (
      <div className="show-list-root clearfix">
        <ul className={`show-list ${containerColClassNames}`}>
          {
            eventList.map(event => (
              <li key={event.eventId} className={listColClassNames}>
                <Link to={this.getEventLink(event)}>
                  <Show
                    textSize={textSize}
                    {...event}
                  />
                </Link>
              </li>
            ))
          }
        </ul>
        {paginate && <Pagination
          totalCount={Number(resultsCount)}
          currentRange={rangeText}
          handleNextPageClick={this.handleNextPageClick}
          handlePreviousPageClick={this.handlePreviousPageClick}
          canNext={canNext}
          canPrevious={canPrevious}
        />}

        <style jsx>{`
          .show-list-root {
            background-color: ${gray};
            padding: 25px;
          }
          .show-list {
            list-style: none;
          }
          .myPicturesControl {
            width: 100%;
          }
          `}</style>
      </div>
    );
  }
}

ShowsList.defaultProps = {
  galleryType: false,
  colNum: '4',
  paginate: null,
  page: 0,
  count: 0,
  pages: 0,
  textSize: null,
};

ShowsList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.number.isRequired,
    eventImageURL: PropTypes.string.isRequired,
  })).isRequired,
  galleryType: PropTypes.bool,
  colNum: PropTypes.string,
  paginate: PropTypes.func,
  page: PropTypes.number,
  count: PropTypes.number,
  pages: PropTypes.number,
  textSize: PropTypes.string,
};

export default ShowsList;
