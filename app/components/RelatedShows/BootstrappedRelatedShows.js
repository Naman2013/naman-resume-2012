/***********************************
* V4 Related Shows populated with info
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import WinstonTile from 'components/common/tiles/WinstonTile';

import styles from './RelatedShows.style';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

class BootstrappedRelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    showList: arrayOf(shape()),
    showCount: number,
  }

  static defaultProps = {
    isDesktop: false,
    showList: [],
    showCount: 0,

  };

  state = {
    showInfo: !this.props.isDesktop,
  };



  render() {
    const {
      isDesktop,
      showList,
      showCount,
    } = this.props;

    return (<div className="root">
      <div className="related-shows-title">Related Shows <span className="related-shows-count">({showCount})</span></div>
      {showList.length > 0 ?
        <WinstonTile title={showList[0].showTitle} linkUrl={showList[0].linkUrl} linkText={showList[0].linkText} theme={{ backgroundSize: 'cover', backgroundImage: `url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg')` }} /> :
        null
      }
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BootstrappedRelatedShows;
