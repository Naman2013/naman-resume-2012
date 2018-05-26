import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateNotificationsCount } from 'modules/alerts/actions';

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
    updateNotificationsCount,
  }, dispatch),
});

const ConnectNotifications = ({ render, actions, notificationsCount }) =>
  (render({
    updateNotificationsCount: actions.updateNotificationsCount,
    notificationsCount,
  }));
ConnectNotifications.propTypes = propTypes;
ConnectNotifications.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectNotifications);
