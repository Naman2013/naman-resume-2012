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

import styles from './RelatedGuides.style';

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
    guideList: arrayOf(shape()),
    guideCount: number,
  }

  static defaultProps = {
    isDesktop: false,
    guideList: [],
    guideCount: 0,

  };

  state = {
    showInfo: !this.props.isDesktop,
  };



  render() {
    const {
      isDesktop,
      guideList,
      guideCount,
    } = this.props;

    return (<div className="root">
      <div className="related-shows-title">Related Guides <span className="related-shows-count">({guideCount})</span></div>
      {guideList.length > 0  ?
        <WinstonTile title={guideList[0].guideTitle} linkUrl={guideList[0].linkUrl} linkText={guideList[0].linkText} /> :
        null
      }
      <style jsx>{styles}</style>
    </div>);
  }
}

export default BootstrappedRelatedShows;
