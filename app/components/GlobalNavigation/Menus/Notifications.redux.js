import React from 'react';
import Notifications from './Notifications';
import ConnectNotifications from 'redux/components/ConnectNotifications';

const NotificationRedux = props => (
  <ConnectNotifications
    render={notificationProps => (<Notifications
      updateNotificationsCount={notificationProps.updateNotificationsCount}
      notificationsCount={notificationProps.notificationsCount}
      {...props}
    />)}
  />
);

export default NotificationRedux;
