import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';
import { white, pink } from '../../styles/variables/colors';
import { aspectRatio, backgroundImageCover } from '../../styles/mixins/utilities';


class Show extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { eventImageURL, eventStart, eventIconURL, eventTitle, eventShortDescription, textSize } = this.props;
    const inlineShowStyle = {
      backgroundImage: `url(${decodeURIComponent(eventImageURL)})`,
    };
    const showStartDate = `${moment(Number(eventStart)*1000).format('dddd, MMMM D, YYYY h:mmA z')} EST`;
    return (
      <div className="photoRoot">
        <div className="photoLink" style={inlineShowStyle}>
        <div className="inner-show-content content">
          <h3 className="show-title">{eventTitle}</h3>
          <h5>{showStartDate}</h5>
          {/*}<img className="show-icon" src={decodeURIComponent(eventIconURL)} />*/}
        </div>
          <div className="innerPhotoContainer content">
            <h3 className="show-title">{eventTitle}</h3>
            <h5>{showStartDate}</h5>
            <div className="show-content">
              <span style={{ fontSize: textSize || 'inherit' }} dangerouslySetInnerHTML={{ __html: eventShortDescription }} />
            </div>
          </div>
        </div>
        <style jsx>{`
            .inner-show-content {
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              color: ${white};
              padding: 20px;
              opacity: 1;
            }

            .photoLink:hover .inner-show-content {
              opacity: 0;
            }
            .show-title {
              color: ${white};
              line-height: 1.2;
              margin-bottom: 10px;
              font-weight: bold;
            }

            .show-icon {
              display: block;
              margin: 25px auto;
              height: 75px;
              width: 75px;
            }

            .show-content {
              padding-top: 5px;
            }
            .action {}
          `}</style>
      </div>
    );
  }
}

Show.propTypes = {
  textSize: PropTypes.string,
  eventImageURL: PropTypes.string.isRequired,
  eventTitle: PropTypes.string.isRequired,
  eventShortDescription: PropTypes.string.isRequired,
};

Show.defaultProps = {
  textSize: null,
};

export default Show;
