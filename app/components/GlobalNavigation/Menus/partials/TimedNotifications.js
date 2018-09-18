import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import xorBy from 'lodash/xorBy';
import MenuTitleBar from './MenuTitleBar';
import MenuList from './MenuList';
import AlertTile from './AlertTile';
import { primaryFont } from 'styles/variables/fonts';
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
    timers: [],
    showPrompt: false,
    promptText: '',
  }

  componentWillReceiveProps(nextProps) {
    const { notificationsCount, updateNotificationsCount } = this.props;
    if (xorBy(this.state.alerts, nextProps.alertsOnly, 'eventId').length > 0) {
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

  componentWillUnmount() {
    this.state.timers.map(timer => clearTimeout(timer));
    this.setState(() => ({
      timers: [],
    }));
  }

  createTimers = (alerts) => {
    const { updateNotificationsCount } = this.props;
    const timers = [];
    alerts.map((_alert) => {
      if (!_alert.active) {
        timers.push(setTimeout(() => {
          const latestAlerts = this.state.alerts;
          const newAlerts = latestAlerts.map((_storedAlert) => {
            const { notificationsCount } = this.props;
            if (_storedAlert.eventId === _alert.eventId) {
              _storedAlert.active = true;
              updateNotificationsCount({
                count: notificationsCount + 1,
              });
              this.setState(() => ({
                showPrompt: true,
                promptText: (
                  <div>
                    <AlertTile {..._storedAlert} dismissAlert={this.dismissAlert} />
                  </div>
                ),
              }));
            }
            return _storedAlert;
          });

          this.setState(() => ({
            alerts: newAlerts,
          }));
        }, _alert.eventCountdown * 1000));
      }
      this.setState(() => ({
        timers,
      }));
      return _alert;
    });
  }

  dismissAlert = (eventId) => {
    this.props.dismissNotification({
      eventId,
    }).then((res) => {
      if (res.successFlag) {
        const newAlerts = this.state.alerts.filter(_storedAlert => _storedAlert.eventId !== eventId);
        this.setState(() => ({
          alerts: newAlerts,
        }));
      }

      if (!res.error) {
        this.setState({
          showPrompt: res.showResponse,
          promptText: res.response,
        });
      } else {
        this.setState({
          showPrompt: true,
          promptText: 'There was an error.',
        });
      }
    });
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  }


  render() {
    const { notificationConfig, dismissNotification } = this.props;
    const { alerts, showPrompt, promptText } = this.state;

    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '650px',
        padding: '50px 25px',
        fontFamily: primaryFont,
      },
    };

    return (
      <div>
        <MenuTitleBar
          title="Alerts"
        />
        <MenuList items={notificationConfig({ alerts, dismissAlert: this.dismissAlert })} />
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={customModalStyles}
          contentLabel="Notifications"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          {promptText}
        </Modal>
        <style jsx>{`
          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

export default TimedNotifications;
