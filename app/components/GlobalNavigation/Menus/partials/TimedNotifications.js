// @flow
import React, { Component } from 'react';
import Modal from 'react-modal';
import xorBy from 'lodash/xorBy';
import { primaryFont } from 'app/styles/variables/fonts';
import MenuTitleBar from './MenuTitleBar';
import MenuList from './MenuList';
import AlertTile from './AlertTile';

type TTimedNotifications = {
  alertsOnly: Array<{
    active: boolean,
    eventCountdown: number,
    eventId: number,
  }>,
};

class TimedNotifications extends Component<TTimedNotifications> {
  state = {
    alerts: [],
    dismissedAlerts: [],
    timers: [],
    showPrompt: false,
    promptText: '',
  };

  componentWillReceiveProps(nextProps) {
    const { notificationsCount, updateNotificationsCount } = this.props;
    const { alerts, dismissedAlerts } = this.state;
    if (xorBy(alerts, nextProps.alertsOnly, 'eventId').length > 0) {
      // remove all dismissed alerts
      let newAlerts = nextProps.alertsOnly;
      dismissedAlerts.forEach(_dismissed => {
        newAlerts = newAlerts.filter(_alert => _alert.eventId !== _dismissed);
      });
      this.setState(() => ({
        alerts: newAlerts,
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
    const { timers } = this.state;
    timers.map(timer => clearTimeout(timer));
    this.setState(() => ({
      timers: [],
    }));
  }

  createTimers = alerts => {
    const { updateNotificationsCount } = this.props;
    const timers = [];
    alerts.map(_alert => {
      if (!_alert.active) {
        timers.push(
          setTimeout(() => {
            const latestAlerts = this.state.alerts;
            const newAlerts = latestAlerts.map(_storedAlert => {
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
                      <AlertTile
                        {..._storedAlert}
                        canDismiss={false}
                        dismissAlert={this.dismissAlert}
                      />
                    </div>
                  ),
                }));
              }
              return _storedAlert;
            });

            this.setState(() => ({
              alerts: newAlerts,
            }));
          }, _alert.eventCountdown * 1000)
        );
      }
      this.setState(() => ({
        timers,
      }));
      return _alert;
    });
  };

  dismissAlert = eventId => {
    this.props
      .dismissNotification({
        eventId,
      })
      .then(res => {
        if (res.successFlag) {
          const dismissedAlerts = [].concat(
            this.state.dismissedAlerts,
            eventId
          );
          const newAlerts = this.state.alerts.filter(
            _storedAlert => _storedAlert.eventId !== eventId
          );
          this.setState(() => ({
            alerts: newAlerts,
            dismissedAlerts,
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
  };

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  };

  render() {
    const { notificationConfig } = this.props;
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
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
      },
    };

    return (
      <div>
        <MenuTitleBar title="Alerts" />
        <MenuList
          items={notificationConfig({
            alerts,
            dismissAlert: this.dismissAlert,
          })}
        />
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
