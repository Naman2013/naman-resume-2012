import React, { PureComponent, Fragment } from 'react';
import './styles.scss';

export class DataCollectionImageCard extends PureComponent {
  render() {
    const { imageData, onClick } = this.props;
    const {
      imageURL,
      objectTitle,
      imageTimeFormatted,
      selected,
      telescopeName,
      instrumentName,
    } = imageData;
    const { displayDateTime } = imageTimeFormatted;

    return (
      <div className="dc-image-card" onClick={onClick}>
        <div className="image-background">
          <img src={imageURL} alt="" />
        </div>

        <h5>{objectTitle}</h5>
        <p className="telescope-info">{telescopeName}</p>
        <p className="telescope-info">{instrumentName}</p>
        <p>
          {displayDateTime}
          {selected && <span>[SELECTED]</span>}
        </p>
      </div>
    );
  }
}
