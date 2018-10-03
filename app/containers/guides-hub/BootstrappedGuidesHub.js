/***********************************
* V4 Guides Hub Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GUIDES_ENDPOINT_URL } from 'services/guides/guide-data';
import GuideTiles from 'components/guides-hub/guide-tiles';
import styles from './BootstrappedGuidesHub.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class BootstrappedGuidesHub extends Component {
  static propTypes = {
    guidesList: arrayOf(shape({})),
  };
  static defaultProps = {
    guidesList: [],
  };

  render() {
    const {
      guidesList,
    } = this.props;
    const { currentPage } = this.state;

    return (
      <div className="root">
        <GuideTiles guides={guidesList} />

        <style jsx>{styles}</style>
      </div>
    )
  }
}


export default BootstrappedGuidesHub;
