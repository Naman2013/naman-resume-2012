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

export default ({ alerts = [], dismissAlert }) => ({
  render: props => (<AlertTile dismissAlert={dismissAlert} {...props} />),
  content: alerts
    .filter(_alert => _alert.active)
    .map(_alert => ({
      _ID: uniqueId(),
      ..._alert,
    })),
});
