import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateNotificationCount } from 'modules/alerts/actions';

const propTypes = {
  notificationCount: PropTypes.number,
};

const defaultProps = {
  notificationCount: 0,
};


const mapStateToProps = ({
  alerts,
}) => ({
  alertCount: alerts.notificationCount,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateNotificationCount,
  }, dispatch),
});

const ConnectNotifications = ({ render, actions, alertCount }) =>
  (render({
    updateAlertCount: actions.updateNotificationCount,
    alertCount,
  }));
ConnectNotifications.propTypes = propTypes;
ConnectNotifications.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectNotifications);
