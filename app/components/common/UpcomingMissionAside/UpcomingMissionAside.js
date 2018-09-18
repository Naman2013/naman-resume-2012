/***********************************
* V4 Mission Detail List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedUpcomingMissionAside from './BootstrappedUpcomingMissionAside';
import { UPCOMING_MISSION } from 'services/reservations';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const MissionSnapDetails = ({
  domeId,
  isDesktop,
  obsId,
  title,
  telescope,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={UPCOMING_MISSION}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      domeId,
      obsId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedUpcomingMissionAside
          {...serviceResponse}
          domeId={domeId}
          fetching={fetchingContent}
          isDesktop={isDesktop}
          obsId={obsId}
          title={title}
          telescope={telescope}
        />}
      </div>
    )}
  />
);

MissionSnapDetails.propTypes = {
  isDesktop: bool,
  obsId: oneOfType([number, string]),
  domeId: oneOfType([number, string]),
};
MissionSnapDetails.defaultProps = {
  isDesktop: false,
  obsId: null,
  domeId: null,
};

export default MissionSnapDetails;
