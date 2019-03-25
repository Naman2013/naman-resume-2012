/***********************************
* V4 Object Detail List
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedObjectDetailList from './BootstrappedObjectDetailList';
import { OBJECT_DETAIL_LIST } from 'services/objects';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const ObjectDetailList = ({
  isMobile,
  objectId,
  scheduledMissionId,
  iconFileData,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={OBJECT_DETAIL_LIST}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      objectId,
      scheduledMissionId,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => (
      <div>
        {<BootstrappedObjectDetailList
          isMobile={isMobile}
          fetching={fetchingContent}
          objectId={objectId}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
          {...iconFileData}
        />}
      </div>
    )}
  />
);

ObjectDetailList.propTypes = {
  isDesktop: bool,
  objectId: oneOfType([number, string]),
  scheduledMissionId: oneOfType([number, string]),
};
ObjectDetailList.defaultProps = {
  isDesktop: false,
  objectId: null,
  scheduledMissionId: null,
};

export default ObjectDetailList;
