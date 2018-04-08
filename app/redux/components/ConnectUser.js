import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
    apiError: PropTypes.bool.isRequired,
    fname: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: {
    isAuthorized: false,
    apiError: false,
    fname: '',
    avatarURL: '',
  },
};

const mapStateToProps = ({ user }) => ({ user });
const ConnectUser = ({ render, user }) => (render(user));
ConnectUser.propTypes = propTypes;
ConnectUser.defaultProps = defaultProps;

export default connect(mapStateToProps, null)(ConnectUser);
