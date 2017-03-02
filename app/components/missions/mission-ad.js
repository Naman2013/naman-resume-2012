import React, { PropTypes } from 'react';
import styles from './mission-sidebar.scss';
const { string } = PropTypes;
const generateRandomImage = (size, i) => {
  const images300x250 = [
    'assets/images/graphics/ad-banner_300x250_book.gif',
    'assets/images/graphics/ad-banner_300x250_gift.gif',
  ];
  const images300x600 = [
    'assets/images/graphics/ad-banner_300x600_book.gif',
    'assets/images/graphics/ad-banner_300x600_gift.gif',
  ];
  const possibleSizes = {
    images300x250,
    images300x600,
  };
  return possibleSizes[`images${size}`][i];
};

const MissionAd = ({ size }) => {
  return (
    <div className="mission-ad widget-container">
      <img alt="advertisement" src={generateRandomImage(size, Math.floor(Math.random() * 2))} />
      <p>Advertisement</p>
    </div>
  );
}

MissionAd.defaultProps = {
  size: '300x250',
};

MissionAd.propTypes = {
  size: string,
};

export default MissionAd;
