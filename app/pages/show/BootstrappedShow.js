/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Live from './Live';
import CenterColumn from 'components/common/CenterColumn';
import styles from './BootstrappedShow.style';

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

const BootstrappedShow = props => (
  <div>
    <CenterColumn>
    {props.inProgressFlag ? <Live {...props} /> : null}
    {props.previousFlag ? <div /> : null}
    {props.upcomingFlag ? <div /> : null}
    </CenterColumn>
  </div>
);

BootstrappedShow.propTypes = {
  inProgressFlag: bool,
  previousFlag: bool,
  upcomingFlag: bool,
};

BootstrappedShow.defaultProps = {
  inProgressFlag: false,
  previousFlag: false,
  upcomingFlag: false,
};

export default BootstrappedShow;
