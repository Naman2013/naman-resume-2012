import React, { Fragment } from 'react';
import Request from 'app/components/common/network/Request';
import { ALERTS_INFORMATION } from 'app/services/notifications';
import TimedNotifications from './partials/TimedNotifications';
import NOTIFICATION_CONFIGURATION, {
  modelNotificationsFromApiRes,
} from './notificationsConfiguration';

const Notifications = ({
  dismissNotification,
  notificationsCount,
  updateNotificationsCount,
}) => (
  <Request
    method="POST"
    authorizationRedirect
    serviceURL={ALERTS_INFORMATION}
    serviceExpiresFieldName="expires"
    model={modelNotificationsFromApiRes}
    serviceResponseHandler={result => {
      updateNotificationsCount({ count: result.notificationsCount });
    }}
    render={({
      fetchingContent,
      modeledResponses: { ALERTS_ONLY },
      serviceResponse,
    }) => (
      <Fragment>
        {
          <TimedNotifications
            alertsOnly={ALERTS_ONLY}
            dismissNotification={dismissNotification}
            notificationConfig={NOTIFICATION_CONFIGURATION}
            notificationsCount={notificationsCount}
            updateNotificationsCount={updateNotificationsCount}
          />
        }
      </Fragment>
    )}
  />
);

export default Notifications;
