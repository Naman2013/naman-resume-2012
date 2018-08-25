/***********************************
* V4 Guides Hub Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CenterColumn from 'components/common/CenterColumn';
import HubHeader from 'components/common/HubHeader';
import { seashell } from 'styles/variables/colors_tiles_v4';
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

  render() {
    const {} = this.props;

    return (
      <div className="root">
        <HubHeader icon="https://vega.slooh.com/assets/v4/common/arrow_horz.svg" title="Guides" />
        <CenterColumn theme={{ backgroundColor: seashell }}>
        </CenterColumn>
        <style jsx>{styles}</style>
      </div>
    )
  }
}


export default BootstrappedGuidesHub;
