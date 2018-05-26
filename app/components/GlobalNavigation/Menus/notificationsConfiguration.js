import React from 'react';
import uniqueId from 'lodash/uniqueId';
import AlertTile from './partials/AlertTile';

export const modelNotificationsFromApiRes = {
  name: 'ALERTS_ONLY',
  model: function modelAlerts(API_RAW) {
    const { alertList } = API_RAW;
    // Maniuplate data here if needed.
    return alertList;
  },
};

export default ({ alerts = [], dismissNotification }) => ({
  render: props => (<AlertTile dismissNotification={dismissNotification} {...props} />),
  content: alerts
    .filter(_alert => _alert.active)
    .map(_alert => ({
      _ID: uniqueId(),
      ..._alert,
    })),
});
