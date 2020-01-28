/***********************************
 * V4 Recommended Groups Slider
 *
 *
 *
 ***********************************/
import React from 'react';
// eslint-disable-next-line
import Request from 'app/components/common/network/Request';
import { GET_GROUPS, SORT_BY_POPULAR } from 'app/services/community-groups';
import { ClubsList } from './clubs-list';

const Groups = () => {
  return (
    <Request
      serviceURL={GET_GROUPS}
      method="POST"
      requestBody={SORT_BY_POPULAR}
      render={({ serviceResponse }) => (
        <ClubsList clubsList={serviceResponse.groups} />
      )}
    />
  );
};

export default Groups;
