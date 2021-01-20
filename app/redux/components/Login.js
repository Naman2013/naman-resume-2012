import { closeAllMenus } from 'app/modules/global-navigation/actions';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { API } from 'app/api';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'app/components/common/style/buttons/Button';
import LargeButtonWithRightIcon from 'app/components/common/style/buttons/LargeButtonWithRightIcon';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';
import {
  resetLogIn,
  logUserIn,
  logGoogleUserIn,
} from 'app/modules/login/actions';
import {
  nightfall,
  astronaut,
  romance,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';
import { primaryFont } from 'app/styles/variables/fonts';
import { horizontalArrowRightWhite } from 'app/styles/variables/iconURLs';
import {
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  FORGOT_PASSWORD_REQUEST_ENDPOINT_URL,
} from 'app/services/registration/registration';
import Request from 'app/components/common/network/Request';
import { GoogleLogin } from 'react-google-login';
import cloneDeep from 'lodash/cloneDeep';
import styles from './Login.style';

const propTypes = {
  actions: PropTypes.shape({
    logUserIn: PropTypes.func.isRequired,
    resetLogIn: PropTypes.func.isRequired,
    logGoogleUserIn: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {};

@withTranslation()
class Login extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  state = {
    inForgotPasswordMode: false,
    forgotPasswordStatusMessage: '',
    googleProfileData: {
      googleProfileId: '',
      googleProfileEmail: '',
      googleProfileGivenName: '',
      googleProfileFamilyName: '',
      googleProfilePictureURL: '',
    },
    loginFormDetails: {
      loginEmailAddress: {
        value: '',
        errorText: '',
      },
      password: {
        value: '',
        errorText: '',
      },
    },
  };

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  closeForgotPassword = () => {
    this.setState(() => ({
      inForgotPasswordMode: false,
    }));
  };

  startForgotPassword = () => {
    const { loginFormDetails } = this.state;
    const newLoginFormData = cloneDeep(loginFormDetails);
    const { t } = this.props;

    if (loginFormDetails.loginEmailAddress.value === '') {
      newLoginFormData.loginEmailAddress.errorText = t(
        'Dashboard.ForgotPasswordError'
      );

      this.setState(() => ({
        loginFormDetails: newLoginFormData,
        inForgotPasswordMode: false,
      }));
    } else {
      this.setState(() => ({
        inForgotPasswordMode: true,
        forgotPasswordStatusMessage: t('Dashboard.ForgotPasswordRequest'),
      }));

      API.post(FORGOT_PASSWORD_REQUEST_ENDPOINT_URL, {
        loginEmailAddress: loginFormDetails.loginEmailAddress.value,
      })
        .then(response => {
          const { actions } = this.props;

          const res = response.data;
          if (res.apiError == false) {
            const forgotResult = {
              status: res.status,
              statusMessage: res.statusMessage,
            };

            this.setState(() => ({
              forgotPasswordStatusMessage: forgotResult.statusMessage,
            }));
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    }
  };

  //capture the change to the email address field
  handleFieldChange = ({ field, value }) => {
    const { loginFormDetails } = this.state;
    const newLoginFormData = cloneDeep(loginFormDetails);
    newLoginFormData[field].value = value;

    this.setState(() => ({
      loginFormDetails: newLoginFormData,
    }));
  };

  clearCurrentErrors = () => {
    const { loginFormDetails } = this.state;
    //clear out any login form errors
    const newLoginFormData = cloneDeep(loginFormDetails);
    newLoginFormData.loginEmailAddress.errorText = '';

    this.setState(() => ({
      loginFormDetails: newLoginFormData,
    }));
  };

  handleSubmit = formValues => {
    const { actions } = this.props;
    actions.logUserIn(formValues);

    this.setState(() => ({
      inForgotPasswordMode: false,
    }));
  };

  processGoogleFailureResponse = googleMessageData => {
    // console.log(googleMessageData);
  };

  processGoogleSuccessResponse = googleTokenData => {
    //console.log("Processing Google Signin: " + googleTokenData);

    /* Process the token and get back information about this user, etc. */
    const googleSSOResult = API.post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL, {
      authenticationCode: googleTokenData.code,
    })
      .then(response => {
        const { actions } = this.props;

        const res = response.data;
        if (res.apiError == false) {
          const googleProfileResult = {
            googleProfileId: res.googleProfileId,
            googleProfileEmail: res.googleProfileInfo.email,
            googleProfileGivenName: res.googleProfileInfo.givenName,
            googleProfileFamilyName: res.googleProfileInfo.familyName,
            googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
          };

          this.setState({ googleProfileData: googleProfileResult });

          window.localStorage.setItem(
            'googleProfileId',
            googleProfileResult.googleProfileId
          );

          /* Log this user in via Google SSO */
          const googleProfileLoginData = {
            googleProfileId: googleProfileResult.googleProfileId,
            googleProfileEmail: googleProfileResult.googleProfileEmail,
          };
          actions.logGoogleUserIn(googleProfileLoginData);
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  render() {
    const { loginFailed, t } = this.props;

    const googleClientIDModel = {
      name: 'GOOGLE_CLIENT_ID_MODEL',
      model: resp => ({
        googleClientID: resp.googleClientID,
        googleClientScope: resp.googleClientScope,
        googleClientAccessType: resp.googleClientAccessType,
        googleClientResponseType: resp.googleClientResponseType,
        loginButtonText: resp.loginButtonText,
      }),
    };

    const {
      inForgotPasswordMode,
      forgotPasswordStatusMessage,
      loginFormDetails,
    } = this.state;

    const { handleSubmit, loginMenuLinks } = this.props;

    return (
      <div className="root">
        {inForgotPasswordMode === true && (
          <div className="form">
            <div className="forgot-password-req">
              <p
                dangerouslySetInnerHTML={{
                  __html: forgotPasswordStatusMessage,
                }}
              />
              <div className="close-button-container">
                <LargeButtonWithRightIcon
                  icon={horizontalArrowRightWhite}
                  theme={{
                    backgroundColor: nightfall,
                    color: romance,
                    border: 0,
                  }}
                  text={t('Dashboard.Close')}
                  onClickEvent={this.closeForgotPassword}
                />
              </div>
            </div>
          </div>
        )}
        {inForgotPasswordMode === false && (
          <form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
            {loginFailed ? (
              <div className="field-error" style={{ marginLeft: '15px' }}>
                {t('Dashboard.LoginFailed')}
              </div>
            ) : null}
            {loginFormDetails.loginEmailAddress.errorText.length > 0 && (
              <div
                className="field-error"
                style={{ marginLeft: '10px', marginRight: '10px' }}
              >
                {loginFormDetails.loginEmailAddress.errorText}
              </div>
            )}
            <Field
              name="username"
              type="email"
              label={t('Dashboard.Email')}
              component={InputField}
              onChange={event => {
                this.handleFieldChange({
                  field: 'loginEmailAddress',
                  value: event.target.value,
                });
              }}
              value={loginFormDetails.loginEmailAddress.value}
            />
            <Field
              name="pwd"
              type="password"
              label={t('Dashboard.Password')}
              component={InputField}
              onChange={event => {
                this.handleFieldChange({
                  field: 'password',
                  value: event.target.value,
                });
              }}
              value={loginFormDetails.password.value}
            />
            <a
              className="forgot title-link"
              onClick={event => {
                this.startForgotPassword();
              }}
            >
              Forgot Your Password?
            </a>

            <Button
              theme={{ margin: '0 auto', color: astronaut }}
              type="submit"
              text={t('Dashboard.SignWithEmail')}
              onClickEvent={this.clearCurrentErrors}
            />
            <div className="or-container">
              <div className="or-text">{t('Dashboard.Or')}</div>
              {/*<div className="or-line" />*/}
            </div>
            <Request
              serviceURL={GOOGLE_CLIENT_ID_ENDPOINT_URL}
              model={googleClientIDModel}
              requestBody={{ callSource: 'login' }}
              render={({
                fetchingContent,
                modeledResponses: { GOOGLE_CLIENT_ID_MODEL },
              }) => (
                <Fragment>
                  {!fetchingContent && (
                    <Fragment>
                      <div className="google-container">
                        <GoogleLogin
                          className="google-button"
                          prompt="select_account"
                          buttonText="Google"
                          responseType={
                            GOOGLE_CLIENT_ID_MODEL.googleClientResponseType
                          }
                          fetchBasicProfile={
                            GOOGLE_CLIENT_ID_MODEL.googleClientFetchBasicProfile
                          }
                          accessType={
                            GOOGLE_CLIENT_ID_MODEL.googleClientAccessType
                          }
                          scope={GOOGLE_CLIENT_ID_MODEL.googleClientScope}
                          clientId={GOOGLE_CLIENT_ID_MODEL.googleClientID}
                          buttonText={GOOGLE_CLIENT_ID_MODEL.loginButtonText}
                          onSuccess={this.processGoogleSuccessResponse}
                          onFailure={this.processGoogleFailureResponse}
                          style={{
                            background: 'rgb(209, 72, 54)',
                            color: '#ffffff',
                            width: '190px',
                            padding: '10px 0',
                            borderRadius: '2px',
                            border: '1px solid transparent',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                          }}
                        />
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
            />

            <div className="register-container">
              <span className="title-link">
                {t('Dashboard.DontHaveAccount')}
              </span>
              {/* <Link to="/join/step1">
                <LargeButtonWithRightIcon
                  icon={horizontalArrowRightWhite}
                  theme={{
                    backgroundColor: nightfall,
                    color: romance,
                    border: 0,
                    width: '100%',
                  }}
                  text={t('Dashboard.JoinSloohToday')}
                />
              </Link> */}
              {loginMenuLinks.showJoinButton && (
                <Link to={loginMenuLinks.joinButtonLinkURL} onClick={()=>window.localStorage.removeItem('selectedPlanId')}>
                  <LargeButtonWithRightIcon
                    icon={horizontalArrowRightWhite}
                    theme={{
                      backgroundColor: nightfall,
                      color: romance,
                      border: 0,
                      width: '100%',
                    }}
                    text={loginMenuLinks.joinButtonText}
                  />
                </Link>
              )}

            </div>
            <div className="register-container">
              <span className="title-link">
                {t('Dashboard.HaveAnInvintationCode')}
              </span>
              <Link to="/join/inviteByCodeStep1">
                <LargeButtonWithRightIcon
                  icon={horizontalArrowRightWhite}
                  theme={{
                    backgroundColor: nightfall,
                    color: romance,
                    border: 0,
                    width: '100%',
                  }}
                  text={t('Dashboard.RedeemInvitationCode')}
                />
              </Link>
            </div>
            <div className="register-container slooh-gift-card">
              <div className="slooh-gift-card-heading">Get your Slooh gift cards here!</div>
              <div className="slooh-gift-card-sub-heading">Click the link below</div>
              <a href="https://www.amazon.com/Slooh-Apprentice-Membership/dp/B01MDNJXIR/ref=sr_1_1?dchild=1&keywords=slooh+apprentice+membership&qid=1606755292&sr=8-1" target="_blank">
                <img src="https://vega.slooh.com/assets/v4/dashboard-new/guest-dashboard/gift-of-the-universe.jpg" alt="" />
              </a>
            </div>
          </form>

        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ appConfig, googleProfileData, logIn }) => ({
  loginFailed: logIn.loginFailed,
  googleProfileData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetLogIn,
      logUserIn,
      logGoogleUserIn,
      closeAllMenus,
    },
    dispatch
  ),
});

const loginValidation = createValidator({
  username: [required],
  pwd: [required],
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'loginForm', validate: loginValidation })(Login));
