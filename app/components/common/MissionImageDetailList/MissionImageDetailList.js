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
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const MissionDetailList = ({
  isDesktop,
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
          isDesktop={isDesktop}
          fetching={fetchingContent}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
        />}
      </div>
    )}
  />
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
