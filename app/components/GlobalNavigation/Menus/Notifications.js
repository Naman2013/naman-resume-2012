import React from 'react';
import Request from 'components/common/network/Request';
import MenuList from './partials/MenuList';
import { ALERTS_INFORMATION, TEST_MODE_TRUE } from 'services/notifications';
import NOTIFICATION_CONFIGURATION, { modelNotificationsFromApiRes } from './notificationsConfiguration';

const Notifications = () => (
  <Request
    serviceURL={ALERTS_INFORMATION}
    method="POST"
    requestBody={TEST_MODE_TRUE}
    model={modelNotificationsFromApiRes}
    render={({
      fetchingContent,
      modeledResponses: { ALERTS_ONLY },
      serviceResponse,
    }) => (
      <div>
        <MenuList items={NOTIFICATION_CONFIGURATION(ALERTS_ONLY)} />
      </div>
    )}
  />
);

export default Notifications;
