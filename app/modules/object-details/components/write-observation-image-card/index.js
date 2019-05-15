import React, { PureComponent, Fragment } from 'react';
import './styles.scss';

export class WriteObservationImageCard extends PureComponent {
  render() {
    const { imageData, objectDetails, defaultCard, onClick } = this.props;
    const { imageURL, imageTitle, displayDate, displayTime } = imageData;
    const { objectIconURL, objectTitle } = objectDetails;

    return (
      <div className="write-observation-image-card" onClick={onClick}>
        <div className="image-background">
          <img className="object-image" src={imageURL} alt="" />
          <div className="object-icon-container">
            <img src={objectIconURL} alt="" />
          </div>
        </div>
        {defaultCard ? (
          <Fragment>
            <h5>{objectTitle}</h5>
            <p>Use default image</p>
          </Fragment>
        ) : (
          <Fragment>
            <h5>{imageTitle}</h5>
            <p>{`${displayDate}  ${displayTime}`}</p>
          </Fragment>
        )}
      </div>
    );
  }
}
