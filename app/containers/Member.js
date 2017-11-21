import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Login from './Login';
import * as userActions from './../modules/User';
import * as loginActions from './../modules/Login';

import styles from '../styles/member.scss';

const { object, func } = PropTypes;

function mapStateToProps({ user, login, appConfig }) {
  return { appConfig, user, loginData: login };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...userActions, ...loginActions }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Member extends Component {
  static propTypes = {
    user: object.isRequired,
    loginData: object.isRequired,
    logout: func.isRequired,
    login: func.isRequired,
    show: func.isRequired,
    hide: func.isRequired,
  };

  onLogin = () => {
    if (!this.props.loginData.isShowed) {
      this.props.show();
    } else {
      this.props.hide();
    }
  };

  onLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className={styles.member}>
        {
          this.props.user.isAuthorized && (
            <div
              className={styles.memberInfo}
            >
              <span
                className={styles.avatar}
                style={{
                  backgroundImage: `url(${this.props.user.avatarURL})`,
                }}
              />
              <span className={styles.usernameContainer}>
                <span className={styles.userMessage}>Keep Looking Up, </span>
                <strong>{this.props.user.fname}</strong>
              </span>
            </div>
        )}

        {
          this.props.user.isAuthorized ? (
            <button
              className={styles.rightButton}
              onClick={this.onLogout}
            >
              Log-out
            </button>
        ) : (
          <span className={styles.loggedOutWrapper}>
            <a
              href={this.props.appConfig.registerNewMemberURL}
              target="_blank"
              rel="noopener noreferrer"
              className={classnames('ignore-react-onclickoutside', styles.regButton)}
            >
              Free Registration
            </a>

            <a
              className={classnames('ignore-react-onclickoutside', styles.rightButton)}
              onClick={this.onLogin}
            >
              Log-in
            </a>
          </span>
        )}
        <ReactCSSTransitionGroup
          component="div"
          className="authorization-popup"
          transitionName="authorization-popup"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            this.props.loginData.isShowed && <Login />
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
