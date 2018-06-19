/***********************************
* V4 Mission Detail List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedMissionImageDetailList from './BootstrappedMissionImageDetailList';
import { IMAGE_DETAIL_LIST } from 'services/missions';

const {
  number,
  oneOfType,
  string,
} = PropTypes;

const MissionDetailList = ({
  scheduledMissionId,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={IMAGE_DETAIL_LIST}
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
        {<BootstrappedMissionImageDetailList
          fetching={fetchingContent}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

MissionDetailList.propTypes = {
  customerImageId: oneOfType([number, string]),
  scheduledMissionId: oneOfType([number, string]),
};
MissionDetailList.defaultProps = {
  customerImageId: null,
  scheduledMissionId: null,
};

export default MissionDetailList;
