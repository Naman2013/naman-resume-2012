import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './style';

const {
  string,
  number,
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
                <div className="link" style={{ wdith: }}>
                  <img src="https://vega.slooh.com/assets/v4/icons/user_astronaut.svg" alt="observatory"/>
                </div>
                <div className="link" />
                <div className="link">
                  <img src="https://vega.slooh.com/assets/v4/icons/telescope_astronaut.svg" alt="observatory" />
                </div>
                <div className="link" />
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
  observationTimeDisplay: string,
  observationLog: string,
  likesCount: number,
  commentsCount: number,
};

BootstrappedObservationSliderItem.defaultProps = {
  imageTitle: '',
  imageURL: '',
  displayName: '',
  observationTimeDisplay: '',
  observationLog: '',
  likesCount: 0,
  commentsCount: 0,
};

export default BootstrappedObservationSliderItem;
