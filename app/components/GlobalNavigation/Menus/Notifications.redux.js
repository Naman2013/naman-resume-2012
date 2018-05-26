import React from 'react';
import Notifications from './Notifications';
import ConnectNotifications from 'redux/components/ConnectNotifications';

const NotificationRedux = props => (
  <ConnectNotifications
    render={notificationProps => (<Notifications
      updateAlertCount={notificationProps.updateAlertCount}
      alertCount={notificationProps.alertCount}
      {...props}
    />)}
  />
);

export default NotificationRedux;
