import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import CardObsLarge from './CardObsLarge';
import CardObsSmall from './CardObsSmall';

const CardObs = props => {
  const { likesCount } = props;
  return (
    <Fragment>
      <DisplayAtBreakpoint screenSmall>
        <CardObsSmall {...props} />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
        <CardObsLarge {...props} />
      </DisplayAtBreakpoint>
    </Fragment>
  );
};

CardObs.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  observationTimeDisplay: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  handleLike: PropTypes.func.isRequired,
  likesCount: PropTypes.number.isRequired,
  likePrompt: PropTypes.string.isRequired,
  customerImageId: PropTypes.number.isRequired,
  showLikePrompt: PropTypes.bool.isRequired,
};

export default CardObs;
