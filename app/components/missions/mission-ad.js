import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementAdDisplayCounter } from '../../modules/ad-management/ad-stats';
import styles from './mission-sidebar.scss';
import { getRandomAdvertisementIndex } from '../../modules/utils';

const { string, number } = PropTypes;

// TODO: refactor to dynamically determine how many "priority ads" are to be displayed
const PRIORITY_ADS = 0;

export const images300x250 = [
  // prority ads below

  // normal ads below
  'assets/images/graphics/300x250_Event_gif_L.gif',
  'assets/images/graphics/ad-banner_300x250_book.gif',
  'assets/images/graphics/ad-banner_300x250_gift.gif',
];

const images300x600 = [

  // priority ads below

  // normal ads below
  'assets/images/graphics/300x600_Events_gif_L.gif',
  'assets/images/graphics/ad-banner_300x600_book.gif',
  'assets/images/graphics/ad-banner_300x600_gift.gif',
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
    // priority ad links below

    // normal ad links below
    '/#/road-trip',
    'https://www.amazon.com/dp/0997621109', // book
    'https://www.amazon.com/dp/B01MDNJXIR', // gift
  ];
  return urls[i];
};

const mapStateToProps = ({ adStats }) => ({
  adsDisplayed: adStats.adsDisplayed,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    incrementAdDisplayCounter,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MissionAd extends Component {
  constructor(props) {
    super(props);
    this.props.actions.incrementAdDisplayCounter();
  }
  render() {
    const { size, index, adsDisplayed } = this.props;
    const displayAdIndex = (adsDisplayed <= PRIORITY_ADS) ? adsDisplayed - 1 : index;

    return (
      <div className="mission-ad widget-container">
        <Link href={getUrl(displayAdIndex)} target="_blank">
          <img alt="advertisement" src={generateRandomImage(size, displayAdIndex)} />
        </Link>
        <p>Advertisement</p>
      </div>
    );
  }
}

MissionAd.defaultProps = {
  size: '300x250',
  number: getRandomAdvertisementIndex(),
  adsDisplayed: 0,
};

MissionAd.propTypes = {
  adsDisplayed: number,
  size: string,
  index: number,
};

export default MissionAd;
