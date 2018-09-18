/***********************************
* V4 Mission Detail List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedMissionSnapDetails from './BootstrappedMissionSnapDetails';
import { UPCOMING_MISSION } from 'services/reservations';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const MissionSnapDetails = ({
  isDesktop,
  obsId,
  domeId,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={UPCOMING_MISSION}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      domeId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedMissionSnapDetails
          isDesktop={isDesktop}
          fetching={fetchingContent}
          obsId={obsId}
          domeId={domeId}
          {...serviceResponse}
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
