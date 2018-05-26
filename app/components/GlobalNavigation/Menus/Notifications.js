import React, { Component } from 'react';
import Request from 'components/common/network/Request';
import TimedNotifications from './partials/TimedNotifications';
import { ALERTS_INFORMATION, TEST_MODE_TRUE } from 'services/notifications';
import NOTIFICATION_CONFIGURATION, { modelNotificationsFromApiRes } from './notificationsConfiguration';

const Notifications = ({
  updateNotificationsCount,
  notificationsCount,
}) => (
  <Request
    serviceURL={ALERTS_INFORMATION}
    method="POST"
    requestBody={TEST_MODE_TRUE}
    serviceExpiresFieldName="expires"
    model={modelNotificationsFromApiRes}
    serviceResponseHandler={(result) => {
      updateNotificationsCount({ count: result.notificationsCount })
    }}
    render={({
      fetchingContent,
      modeledResponses: { ALERTS_ONLY },
      serviceResponse,
    }) => {
      return (
        <div>
          {serviceResponse.showAlertInformation ? <TimedNotifications
            alertsOnly={ALERTS_ONLY}
            notificationConfig={NOTIFICATION_CONFIGURATION}
            updateNotificationsCount={updateNotificationsCount}
            notificationsCount={notificationsCount}
          /> : null}
        </div>
      )
    }}
  />
);

export default Notifications;
