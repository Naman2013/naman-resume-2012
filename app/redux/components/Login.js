import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createValidator, required } from 'modules/utils/validation';
import { loginReset } from 'modules/Login';

const propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool,
    apiError: PropTypes.bool,
    fname: PropTypes.string,
    avatarURL: PropTypes.string,
  }),
  appConfig: PropTypes.shape({
    forgotPasswordURL: PropTypes.string,
    registerNewMemberURL: PropTypes.string,
  }),
};

const defaultProps = {
  user: {
    isAuthorized: false,
    apiError: false,
    fname: '',
    avatarURL: '',
  },
  appConfig: {
    forgotPasswordURL: '',
    registerNewMemberURL: '',
  },
};

class Login extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {

    return (
      <div>
        <Field
          name="username"
          type="text"
          label="Email or Username"
        />
        <Field
          name="pwd"
          type="password"
          label="Password"
        />
      </div>
    );
  }
}


const mapStateToProps = ({
  appConfig,
  login,
}) => ({
  loginFailed: login.loginFailed,
  forgotPasswordURL: appConfig.forgotPasswordURL,
  registerNewMemberURL: appConfig.registerNewMemberURL,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loginReset,
    updateNotificationsCount,
  }, dispatch),
});

const loginValidation = createValidator({
  username: [required],
  pwd: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'login', validate: loginValidation })(Login);
