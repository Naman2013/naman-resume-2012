import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import BurnhamsCornerLarge from './BurnhamsCornerLarge';
import BurnhamsCornerSmall from './BurnhamsCornerSmall';

const BurnhamsCorner = props => (
  <Fragment>
    <DisplayAtBreakpoint screenSmall>
      <BurnhamsCornerSmall {...props} />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
      <BurnhamsCornerLarge {...props} />
    </DisplayAtBreakpoint>
  </Fragment>
);

BurnhamsCorner.propTypes = {
  objectTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};


export default BurnhamsCorner;
