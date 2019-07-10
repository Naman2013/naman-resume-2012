import React, { PureComponent, Fragment } from 'react';
import './styles.scss';

export class DataCollectionImageCard extends PureComponent {
  render() {
    const { imageData, onClick } = this.props;
    const { imageURL, objectTitle, displayDate, displayTime } = imageData;

    return (
      <div className="dc-image-card" onClick={onClick}>
        <div className="image-background">
          <img src={imageURL} alt="" />
        </div>

        <h5>{objectTitle}</h5>
        <p>{`${displayDate}  ${displayTime}`}</p>
      </div>
    );
  }
}
