import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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

const getUrl = (i) => {
  const urls = [
    'https://www.amazon.com/dp/0997621109', // book
    'https://www.amazon.com/dp/B01MDNJXIR', // gift
    'https://www.amazon.com/dp/B01N9HALCW', // glasses
  ];
  return urls[i];
};

const MissionAd = ({ size }) => {
  const randomIdx = Math.floor(Math.random() * 2);
  return (
    <div className="mission-ad widget-container">
      <Link href={getUrl(randomIdx)} target="_blank">
        <img alt="advertisement" src={generateRandomImage(size, randomIdx)} />
      </Link>
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
