/***********************************
 * V4 Mission Detail List
 *
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'app/components/common/network/Request';
import { IMAGE_DETAIL_LIST } from 'app/services/missions';
import BootstrappedMissionImageDetailList from './BootstrappedMissionImageDetailList';

const { bool, number, oneOfType, string } = PropTypes;

const MissionDetailList = ({ isDesktop, scheduledMissionId }) => (
  <div className="mb-4">
    <Request
      authorizationRedirect
      serviceURL={IMAGE_DETAIL_LIST}
      method="POST"
      serviceExpiresFieldName="expires"
      requestBody={{
        scheduledMissionId,
      }}
      render={({ fetchingContent, serviceResponse }) => (
        <div>
          {
            <BootstrappedMissionImageDetailList
              isDesktop={isDesktop}
              fetching={fetchingContent}
              scheduledMissionId={scheduledMissionId}
              {...serviceResponse}
            />
          }
        </div>
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
