import React from 'react';
import uniqueId from 'lodash/uniqueId';
import AlertTile from './partials/AlertTile';

export const modelNotificationsFromApiRes = {
  name: 'ALERTS_ONLY',
  model: function modelAlerts(API_RAW) {
    const { alertList } = API_RAW;
    // Maniuplate Data Here if needed.
    return alertList;
  },
};

export default (alerts = []) => ({
  render: props => (<AlertTile {...props} />),
  content: alerts.map(_alert => ({
    _ID: uniqueId(),
    ..._alert,
  })),
});
