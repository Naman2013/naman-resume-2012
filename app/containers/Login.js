import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import onClickOutside from 'react-onclickoutside';
import InputField from '../components/form/InputField';
import FormErrorMessage from '../pages/registration/common/FormErrorMessage';
import { createValidator, required } from '../modules/utils/validation';
import * as loginActions from './../modules/Login';
import styles from '../styles/login.scss';

const { bool, func, string } = PropTypes;

class Login extends Component {
  static propTypes = {
    hide: func.isRequired,
    login: func.isRequired,
    handleSubmit: func.isRequired,
    error: string,
    forgotPasswordURL: string,
    registerNewMemberURL: string,
    loginFailed: bool,
  };

  static defaultProps = {
    loginFailed: false,
    forgotPasswordURL: '',
    registerNewMemberURL: '',
  }

  componentWillUnmount() {
    const { loginReset } = this.props;
    loginReset();
  }

  handleClickOutside = () => {
    this.props.hide();
  }

  render() {
    const { loginFailed } = this.props;
    return (
      <aside className={styles.login}>
        <form onSubmit={this.props.handleSubmit( this.props.login )}>
          <h3>Log into your Slooh account:</h3>
          {
            loginFailed ?
              <FormErrorMessage
                messageTitle="Sign in Error"
                messageBody="Please check your username and password."
              /> : null
          }
          <div>
            <Field
              name="username"
              type="text"
              label="Email or Username"
              component={InputField}
            />
            <Field
              name="passwd"
              type="password"
              label="Password"
              component={InputField}
            />
          </div>
          {this.props.error && this.props.error}
          <button className="btn-primary">Sign in</button>
          <div className={styles.bottomOutside}>
            <a href={this.props.forgotPasswordURL}>Forgot Password</a>
            <a href={this.props.registerNewMemberURL}>Create Account</a>
          </div>
        </form>
      </aside>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

function mapStateToProps({ appConfig, login }) {
  return {
    loginFailed: login.loginFailed,
    forgotPasswordURL: appConfig.forgotPasswordURL,
    registerNewMemberURL: appConfig.registerNewMemberURL,
  };
}

const loginValidation = createValidator({
  username: [required],
  passwd: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'login', validate: loginValidation })(onClickOutside(Login)));
