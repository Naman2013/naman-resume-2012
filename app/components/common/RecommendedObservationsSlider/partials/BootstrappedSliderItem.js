import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './BootstrappedSliderItem.style';

const {
  string,
  number,
  arrayOf,
} = PropTypes;

const BootstrappedObservationSliderItem = ({
  imageTitle,
  imageURL,
  displayName,
  observationTimeDisplay,
  observationLog,
  likesCount,
  commentsCount,
}) => (
  <div className="card-obs-wrapper">
    <div className="card-obs">
      {(imageTitle.length > 0) ? (
        <Fragment>
          <div className="top">
            <div className="info">
              <div className="main-info">
                <div className="title">{imageTitle}</div>
                <div className="author">By {displayName}</div>
                <div className="text" dangerouslySetInnerHTML={{ __html: observationLog }} />
              </div>
              <div className="links">
                <div className="link">
                  <img src="https://vega.slooh.com/assets/v4/icons/user_astronaut.svg" alt="user" />
                </div>
                <div className="link">
                  <img className="linkIcon" src="https://vega.slooh.com/assets/v4/icons/solar_system/Jupiter.png" alt="system" />
                </div>
                <div className="link">
                  <img src="https://vega.slooh.com/assets/v4/common/icon_observatory.svg" alt="observatory" />
                </div>
                <div className="link">
                  <img src="https://vega.slooh.com/assets/v4/icons/location_marker.png" alt="location" />
                </div>
              </div>
            </div>
            <div className="picture">
              <div className="image-wrapper">
                <img src={imageURL} alt="observation" />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="buttons">
              <div className="button"><img className="icon" src="https://vega.slooh.com/assets/v4/common/heart.svg" alt="heart" />{likesCount}</div>
              <div className="button"><img className="icon" src="https://vega.slooh.com/assets/v4/common/comment.svg" alt="comment" />{commentsCount}</div>
              <div className="button details">
                Details
                <img src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg" alt="arrow-right" />
              </div>
            </div>
            <div className="capture-date">{observationTimeDisplay ? observationTimeDisplay[0] : 'Loading...'}</div>
          </div>
        </Fragment>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
    <style jsx>{style}</style>
  </div>
);

BootstrappedObservationSliderItem.propTypes = {
  imageTitle: string,
  imageURL: string,
  displayName: string,
  observationTimeDisplay: arrayOf(string),
  observationLog: string,
  likesCount: number,
  commentsCount: number,
};

BootstrappedObservationSliderItem.defaultProps = {
  imageTitle: '',
  imageURL: '',
  displayName: '',
  observationTimeDisplay: ['No data from server', 'No data from server'],
  observationLog: '',
  likesCount: 0,
  commentsCount: 0,
};

export default BootstrappedObservationSliderItem;
