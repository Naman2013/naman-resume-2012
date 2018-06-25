/***********************************
* V4 Mission Detail List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedMissionDetailList from './BootstrappedMissionDetailList';
import { MISSION_DETAIL_LIST } from 'services/missions';

const {
  number,
  oneOfType,
  string,
} = PropTypes;

const MissionDetailList = ({
  device,
  customerImageId,
  scheduledMissionId,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={MISSION_DETAIL_LIST}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      scheduledMissionId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedMissionDetailList
          device={device}
          fetching={fetchingContent}
          customerImageId={customerImageId}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

MissionDetailList.propTypes = {
  device: string,
  customerImageId: oneOfType([number, string]),
  scheduledMissionId: oneOfType([number, string]),
};
MissionDetailList.defaultProps = {
  device: '',
  customerImageId: null,
  scheduledMissionId: null,
};

export default MissionDetailList;
