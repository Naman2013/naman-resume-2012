import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import onClickOutside from 'react-onclickoutside';
import InputField from '../components/InputField';
import { createValidator, required } from '../modules/utils/validation';
import * as loginActions from './../modules/Login';
import styles from '../styles/login.scss';

const { func, string } = PropTypes;

class Login extends Component {
  static propTypes = {
    hide: func.isRequired,
    login: func.isRequired,
    handleSubmit: func.isRequired,
    error: string,
  };

  handleClickOutside = () => {
    this.props.hide();
  }

  render() {
    return (
      <aside className={styles.login}>
        <form onSubmit={this.props.handleSubmit( this.props.login )}>
          <h3>To log into your Slooh Account:</h3>
          <div className={styles.row}>
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
          {this.props.error && <strong>{this.props.error}</strong>}
          <button>Sign in</button>
          <div className={styles.bottomOutside}>
            <a>Forgot Password</a>
            <a href="https://saturn.slooh.com/subscribe-bt3.php">Create Account</a>
          </div>
        </form>
      </aside>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

const loginValidation = createValidator({
  username: [required],
  passwd: [required],
});

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'login', validate: loginValidation })(onClickOutside(Login)));
