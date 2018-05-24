import React, { Component } from 'react';
import Request from 'components/common/network/Request';
import MenuList from './partials/MenuList';
import TimedNotifications from './partials/TimedNotifications';
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
        <TimedNotifications
          alertsOnly={ALERTS_ONLY}
          notificationConfig={NOTIFICATION_CONFIGURATION}
          />
      </div>
    )}
  />
);

export default Notifications;
