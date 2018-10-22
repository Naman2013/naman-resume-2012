import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool,
    apiError: PropTypes.bool,
    fname: PropTypes.string,
    avatarURL: PropTypes.string,
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
