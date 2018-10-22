import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = props => (
  <Fragment>
    <DisplayAtBreakpoint screenSmall>
      <CardObsSmall {...props} />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
      <CardObsLarge {...props} />
    </DisplayAtBreakpoint>
  </Fragment>
);

CardObs.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default CardObs;
