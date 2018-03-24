import React from 'react';
import MenuList from './partials/MenuList';
import NOTIFICATION_CONFIGURATION from './notificationsConfiguration';

const Notifications = () => (
  <div>
    <MenuList items={NOTIFICATION_CONFIGURATION} />
  </div>
);

export default Notifications;
