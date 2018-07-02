import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { validateResponseAccess } from 'modules/authorization/actions'

const propTypes = {
  user: PropTypes.shape({
    at: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    cid: PropTypes.string.isRequired,
  }),
  actions: PropTypes.shape({
    validateResponseAccess: PropTypes.func.isRequired,
  })
};

const defaultProps = {
  user: {
  },
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
  }, dispatch),
});
const ConnectUserAndResponseAccess = ({ render, user, actions }) => (render({
  user: {
    at: user.at,
    token: user.token,
    cid: user.cid,
  },
  ...actions,
}));
ConnectUserAndResponseAccess.propTypes = propTypes;
ConnectUserAndResponseAccess.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectUserAndResponseAccess);
