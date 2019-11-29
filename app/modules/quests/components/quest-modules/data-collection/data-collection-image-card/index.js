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
      alreadyUsed,
    } = imageData;
    const { displayDateTime } = imageTimeFormatted;

    const selectFlag = () => {
      if (alreadyUsed && selected) {
        return '[SELECTED]';
      }
      if (alreadyUsed) {
        return '[ALREADY USED]';
      }
      return '[SELECTED]';
    };

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
          <span>{selectFlag()}</span>
        </p>
      </div>
    );
  }
}
