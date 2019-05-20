/***********************************
 * V4 Mission Detail List
 *
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import { MISSION_DETAIL_LIST } from 'app/services/missions';
import BootstrappedMissionDetailList from './BootstrappedMissionDetailList';

const { bool, number, oneOfType, string } = PropTypes;

const MissionDetailList = ({
  isDesktop,
  customerImageId,
  scheduledMissionId,
}) => (
  <div className="mb-4">
    <Request
      authorizationRedirect
      serviceURL={MISSION_DETAIL_LIST}
      method="POST"
      serviceExpiresFieldName="expires"
      requestBody={{
        scheduledMissionId,
      }}
      render={({ fetchingContent, serviceResponse }) => (
        <BootstrappedMissionDetailList
          isDesktop={isDesktop}
          fetching={fetchingContent}
          customerImageId={customerImageId}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
        />
      )}
    />
  </div>
);

MissionDetailList.propTypes = {
  isDesktop: bool,
  customerImageId: oneOfType([number, string]),
  scheduledMissionId: oneOfType([number, string]),
};
MissionDetailList.defaultProps = {
  isDesktop: false,
  customerImageId: null,
  scheduledMissionId: null,
};

export default MissionDetailList;
