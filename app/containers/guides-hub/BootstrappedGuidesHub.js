/***********************************
* V4 Guides Hub Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HubContainer from 'components/common/HubContainer';
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

  state = {
    filter: null,
    sort: null,
  };

  render() {
    const {} = this.props;

    return (
      <div className="root">
        
        <style jsx>{styles}</style>
      </div>
    )
  }
}


export default BootstrappedGuidesHub;
