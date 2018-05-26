import React, { Component } from 'react';
import Request from 'components/common/network/Request';
import TimedNotifications from './partials/TimedNotifications';
import { ALERTS_INFORMATION, TEST_MODE_TRUE } from 'services/notifications';
import NOTIFICATION_CONFIGURATION, { modelNotificationsFromApiRes } from './notificationsConfiguration';

const Notifications = ({
  updateAlertCount,
  alertCount,
}) => (
  <Request
    serviceURL={ALERTS_INFORMATION}
    method="POST"
    requestBody={TEST_MODE_TRUE}
    serviceExpiresFieldName="expires"
    model={modelNotificationsFromApiRes}
    serviceResponseHandler={(result) => {
      console.log('onload', result.alertCount)
      updateAlertCount({ count: result.alertCount })
    }}
    render={({
      fetchingContent,
      modeledResponses: { ALERTS_ONLY },
      serviceResponse,
    }) => {
      return (
        <div>
          <TimedNotifications
            alertsOnly={ALERTS_ONLY}
            notificationConfig={NOTIFICATION_CONFIGURATION}
            updateAlertCount={updateAlertCount}
            alertCount={alertCount}
          />
        </div>
      )
    }}
  />
);

export default Notifications;
