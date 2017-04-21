import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementAdDisplayCounter } from '../../modules/ad-management/ad-stats';
import styles from './mission-sidebar.scss';
import { getRandomAdvertisementIndex } from '../../modules/utils';

const { string, number } = PropTypes;

export const images300x250 = [
  'assets/images/graphics/ad-banner_300x250_book.gif',
  'assets/images/graphics/ad-banner_300x250_gift.gif',
  // temporary
  'assets/images/graphics/PASS_LA_300x250.jpg',
  'assets/images/graphics/PASS_LA_1_300x250.jpg',
  'assets/images/graphics/PASS_LA_2_300x250.jpg',
];
const images300x600 = [
  'assets/images/graphics/ad-banner_300x600_book.gif',
  'assets/images/graphics/ad-banner_300x600_gift.gif',
  // temporary
  'assets/images/graphics/PASS_LA_300x600.jpg',
  'assets/images/graphics/PASS_LA_1_300x600.jpg',
  'assets/images/graphics/PASS_LA_2_300x600.jpg',
];

const generateRandomImage = (size, i) => {

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
    // temporary
    'https://www.amazon.co.uk/Passengers-Chris-Pratt/dp/B01N0R2CW7/ref=as_li_ss_tl?s=instant-video&ie=UTF8&qid=1491493702&sr=1-1&keywords=passengers+2016&linkCode=sl1&tag=sonypassengers-21&linkId=549de0a304f43e8d1eed3087819e0983',
    'https://www.amazon.co.uk/Passengers-Chris-Pratt/dp/B01N0R2CW7/ref=as_li_ss_tl?s=instant-video&ie=UTF8&qid=1491493702&sr=1-1&keywords=passengers+2016&linkCode=sl1&tag=sonypassengers-21&linkId=549de0a304f43e8d1eed3087819e0983',
    'https://www.amazon.co.uk/Passengers-Chris-Pratt/dp/B01N0R2CW7/ref=as_li_ss_tl?s=instant-video&ie=UTF8&qid=1491493702&sr=1-1&keywords=passengers+2016&linkCode=sl1&tag=sonypassengers-21&linkId=549de0a304f43e8d1eed3087819e0983',
  ];
  return urls[i];
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    incrementAdDisplayCounter,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class MissionAd extends Component {
  constructor(props) {
    super(props);
    this.props.actions.incrementAdDisplayCounter();
  }
  render() {
    const { size, index } = this.props;
    return (
      <div className="mission-ad widget-container">
        <Link href={getUrl(index)} target="_blank">
          <img alt="advertisement" src={generateRandomImage(size, index)} />
        </Link>
        <p>Advertisement</p>
      </div>
    );
  }
}

MissionAd.defaultProps = {
  size: '300x250',
  number: getRandomAdvertisementIndex(),
};

MissionAd.propTypes = {
  size: string,
  index: number,
};

export default MissionAd;
