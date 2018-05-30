import React, { Component } from 'react';
import Request from 'components/common/network/Request';
import TimedNotifications from './partials/TimedNotifications';
import { ALERTS_INFORMATION } from 'services/notifications';
import NOTIFICATION_CONFIGURATION, { modelNotificationsFromApiRes } from './notificationsConfiguration';

const Notifications = ({
  dismissNotification,
  notificationsCount,
  updateNotificationsCount,
}) => (
  <Request
    authorizationRedirect={true}
    serviceURL={ALERTS_INFORMATION}
    method="POST"
    serviceExpiresFieldName="expires"
    model={modelNotificationsFromApiRes}
    serviceResponseHandler={(result) => {
      updateNotificationsCount({ count: result.notificationsCount })
    }}
    render={({
      fetchingContent,
      modeledResponses: { ALERTS_ONLY },
      serviceResponse,
    }) => (
      <div>
        {<TimedNotifications
          alertsOnly={ALERTS_ONLY}
          dismissNotification={dismissNotification}
          notificationConfig={NOTIFICATION_CONFIGURATION}
          notificationsCount={notificationsCount}
          updateNotificationsCount={updateNotificationsCount}
        />}
      </div>
    )}
  />
);

export default Notifications;
