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
  number,
  oneOfType,
  string,
} = PropTypes;

const ObjectDetailList = ({
  device,
  objectId,
  scheduledMissionId,
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
          device={device}
          fetching={fetchingContent}
          objectId={objectId}
          scheduledMissionId={scheduledMissionId}
          {...serviceResponse}
        />}
      </div>
    )}
  />
);

ObjectDetailList.propTypes = {
  objectId: oneOfType([number, string]),
  scheduledMissionId: oneOfType([number, string]),
};
ObjectDetailList.defaultProps = {
  objectId: null,
  scheduledMissionId: null,
};

export default ObjectDetailList;
