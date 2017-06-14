import React, { Component, PropTypes } from 'react';
import Show from './Show';
import classnames from 'classnames';

class ShowsList extends Component {
  constructor(props) {
    super(props);
  }

  handleShowClick = event => {
    event.preventDefault();
  }

  render() {
    const { eventList, galleryType, colNum } = this.props;
    const containerColClassNames = classnames({
      'col-xs-12': !galleryType,
    });
    const listColClassNames = classnames({
      [`col-xs-${colNum}`]: !galleryType,
      'col-xs-12': galleryType,
    });
    return (
      <div className="show-list-root clearfix">
        <ul className={`show-list ${containerColClassNames}`}>
          {
            eventList.map(event => (
              <li key={event.eventId} className={listColClassNames}>
                <Show
                  handleShowClick={this.handleShowClick}
                  {...event}
                />
              </li>
            ))
          }
        </ul>
        <style jsx>{`
          .show-list-root {
            background-color: white;
            padding-top: 25px;
          }
          .show-list {
            list-style: none;
          }
          `}</style>
      </div>
    );
  }
}

ShowsList.defaultProps = {
  galleryType: false,
  colNum: '4',
};

ShowsList.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    eventImageURL: PropTypes.string.isRequired,
  })).isRequired,
  galleryType: PropTypes.bool,
  colNum: PropTypes.string,
};

export default ShowsList;
