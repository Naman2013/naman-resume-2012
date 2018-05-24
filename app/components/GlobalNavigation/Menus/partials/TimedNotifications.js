import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from './MenuList';

const {
  arrayOf,
  bool,
  number,
  shape,
} = PropTypes;

class UpdatedNotifications extends Component {
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
    const { alertsOnly } = this.props;
    if (alertsOnly.length !== nextProps.alertsOnly.length) {
      this.setState(() => ({
        alerts: nextProps.alertsOnly,
      }));

      this.createTimers(nextProps.alertsOnly);
    }
  }

  createTimers = (alerts) => {
    alerts.map((_alert) => {
      if (!_alert.active) {
        setTimeout(() => {
          const newAlerts = alerts.map((_storedAlert) => {
            if (_storedAlert.eventId === _alert.eventId) {
              _storedAlert.active = true;
            }
            return _storedAlert;
          });

          this.setState({
            alerts: newAlerts,
          });
        }, _alert.eventCountdown * 100);
      }
      return _alert;
    });
  }

  render() {
    const { notificationConfig } = this.props;
    const { alerts } = this.state;
    return (
      <div>
        <MenuList items={notificationConfig(alerts)} />
      </div>
    );
  }
}

export default UpdatedNotifications;
