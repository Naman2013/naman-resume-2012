import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateNotificationsCount, dismissNotification } from 'modules/alerts/actions';

const propTypes = {
  notificationsCount: PropTypes.number,
};

const defaultProps = {
  notificationsCount: 0,
};


const mapStateToProps = ({
  alerts,
}) => ({
  notificationsCount: alerts.notificationsCount,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    dismissNotification,
    updateNotificationsCount,
  }, dispatch),
});

const ConnectNotifications = ({ render, actions, notificationsCount }) =>
  (render({
    dismissNotification: actions.dismissNotification,
    notificationsCount,
    updateNotificationsCount: actions.updateNotificationsCount,
  }));
ConnectNotifications.propTypes = propTypes;
ConnectNotifications.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectNotifications);
