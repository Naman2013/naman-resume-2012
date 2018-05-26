import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from './MenuList';

const {
  arrayOf,
  bool,
  number,
  shape,
} = PropTypes;

class TimedNotifications extends Component {
  static propTypes = {
    alertsOnly: arrayOf(shape({
      active: bool.isRequired,
      eventCountdown: number.isRequired,
      eventId: number.isRequired,
    })),
  }

  static defaultProps = {
    alertsOnly: [],
  }

  state = {
    alerts: [],
  }

  componentWillReceiveProps(nextProps) {
    const { alertsOnly, notificationsCount, updateNotificationsCount } = this.props;
    if (alertsOnly.length !== nextProps.alertsOnly.length) {
      this.setState(() => ({
        alerts: nextProps.alertsOnly,
      }));

      this.createTimers(nextProps.alertsOnly);
    }
    if (notificationsCount !== nextProps.notificationsCount) {
      updateNotificationsCount({
        count: nextProps.notificationsCount,
      });
    }
  }

  createTimers = (alerts) => {
    const { updateNotificationsCount } = this.props;
    alerts.map((_alert) => {
      if (!_alert.active) {
        setTimeout(() => {
          const newAlerts = alerts.map((_storedAlert) => {
            const { notificationsCount } = this.props;
            if (_storedAlert.eventId === _alert.eventId) {
              _storedAlert.active = true;
              updateNotificationsCount({
                count: notificationsCount + 1,
              });
            }
            return _storedAlert;
          });

          this.setState({
            alerts: newAlerts,
          });
        }, _alert.eventCountdown * 1000);
      }
      return _alert;
    });
  }

  render() {
    const { notificationConfig, dismissNotification } = this.props;
    const { alerts } = this.state;
    return (
      <div>
        <MenuList items={notificationConfig({ alerts, dismissNotification })} />
      </div>
    );
  }
}

export default TimedNotifications;
