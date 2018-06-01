import React from 'react';
import Notifications from './Notifications';
import ConnectNotifications from 'redux/components/ConnectNotifications';

const NotificationRedux = props => (
  <ConnectNotifications
    render={notificationProps => (<Notifications
      dismissNotification={notificationProps.dismissNotification}
      notificationsCount={notificationProps.notificationsCount}
      updateNotificationsCount={notificationProps.updateNotificationsCount}
      {...props}
    />)}
  />
);

export default NotificationRedux;
