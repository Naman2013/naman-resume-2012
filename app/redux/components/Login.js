import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import LargeButtonWithRightIcon from 'components/common/style/buttons/LargeButtonWithRightIcon';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { resetLogIn, logUserIn, logGoogleUserIn } from 'modules/login/actions';
import { nightfall, astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont } from 'styles/variables/fonts';
import{ horizontalArrowRightWhite } from 'styles/variables/iconURLs';
import {GOOGLE_CLIENT_ID_ENDPOINT_URL, googleClientIDModel, GOOGLE_SSO_SIGNIN_ENDPOINT_URL} from 'services/registration/registration.js';
import Request from 'components/common/network/Request';
import { GoogleLogin } from 'react-google-login';
import styles from './Login.style';

const propTypes = {
  forgotPasswordURL: PropTypes.string,
  registerNewMemberURL: PropTypes.string,
  actions: PropTypes.shape({
    logUserIn: PropTypes.func.isRequired,
    resetLogIn: PropTypes.func.isRequired,
    logGoogleUserIn: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  forgotPasswordURL: '',
  registerNewMemberURL: '',
};

class Login extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    'googleProfileData': {
      googleProfileId: '',
      googleProfileEmail: '',
      googleProfileGivenName: '',
      googleProfileFamilyName: '',
      googleProfilePictureURL: '',
    },
  };

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  handleSubmit = (formValues) => {
    const { actions } = this.props;
    actions.logUserIn(formValues);
  }

  processGoogleFailureResponse = (googleMessageData) => {
      console.log(googleMessageData);
  };

  processGoogleSuccessResponse = (googleTokenData) => {
    //console.log("Processing Google Signin: " + googleTokenData);

    /* Process the token and get back information about this user, etc. */
    const googleSSOResult = axios.post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
      {
        authenticationCode: googleTokenData.code
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
          }

          this.setState({'googleProfileData': googleProfileResult});

          window.localStorage.setItem('googleProfileId', googleProfileResult.googleProfileId);

          /* Log this user in via Google SSO */
          const googleProfileLoginData = {
            googleProfileId: googleProfileResult.googleProfileId,
            googleProfileEmail: googleProfileResult.googleProfileEmail,
          }
          actions.logGoogleUserIn(googleProfileLoginData);
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  }

  render() {

    const {
      loginFailed,
      registerNewMemberURL,
      forgotPasswordURL,
    } = this.props;

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

    const googleProfileData = this.state.googleProfileData;

    return (
      <div className="root">
        <form
          className="form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          {loginFailed ?
            <div className="field-error">
              Login Failed. Please check your credentials.
            </div> : null
          }
          <Field
            name="username"
            type="email"
            label="Email Address"
            component={InputField}
          />
          <Field
            name="pwd"
            type="password"
            label="Password"
            component={InputField}
          />
          <Link to={forgotPasswordURL}>
            <span className="forgot title-link">Forgot Your Password?</span>
          </Link>
          <Button theme={{ margin: '0 auto', color: astronaut }} type="submit" text="Sign in with email" onClickEvent={null} />
          <div className="or-container">
            <div className="or-text">or</div>
            {/*<div className="or-line" />*/}
          </div>
          <Request
            serviceURL={GOOGLE_CLIENT_ID_ENDPOINT_URL}
            model={googleClientIDModel}
            requestBody={{ 'callSource': 'login' }}
            render={({
              fetchingContent,
              modeledResponses: { GOOGLE_CLIENT_ID_MODEL },
            }) => (
              <Fragment>
                {
                  !fetchingContent &&
                    <Fragment>
                      <div className="google-container">
                        <GoogleLogin
                            className="google-button"
                            prompt="select_account"
                            buttonText="Google"
                            responseType={GOOGLE_CLIENT_ID_MODEL.googleClientResponseType}
                            fetchBasicProfile={GOOGLE_CLIENT_ID_MODEL.googleClientFetchBasicProfile}
                            accessType={GOOGLE_CLIENT_ID_MODEL.googleClientAccessType}
                            scope={GOOGLE_CLIENT_ID_MODEL.googleClientScope}
                            clientId={GOOGLE_CLIENT_ID_MODEL.googleClientID}
                            buttonText={GOOGLE_CLIENT_ID_MODEL.loginButtonText}
                            onSuccess={this.processGoogleSuccessResponse}
                            onFailure={this.processGoogleFailureResponse}
                          />
                      </div>
                    </Fragment>
                  }
                  </Fragment>
                )}
              />

          <div className="register-container">
            <span className="title-link">{`Don't have an account?`}</span>
            <Link to="/join/step1">
              <LargeButtonWithRightIcon
                icon={horizontalArrowRightWhite}
                theme={{
                  backgroundColor: nightfall,
                  color: romance,
                  border: 0,
                  width: '100%',
                }}
                text="Join Slooh Today"
              />
            </Link>
          </div>
          <div className="register-container">
            <span className="title-link">{`Have an Invitation Code?`}</span>
            <Link to="/join/inviteByCodeStep1">
              <LargeButtonWithRightIcon
                icon={horizontalArrowRightWhite}
                theme={{
                  backgroundColor: nightfall,
                  color: romance,
                  border: 0,
                  width: '100%',
                }}
                text="Redeem Invitation Code"
              />
            </Link>
          </div>
        </form>
        <style>{styles}</style>
      </div>
    );
  }
}


const mapStateToProps = ({
  appConfig,
  googleProfileData,
  logIn,
}) => ({
  loginFailed: logIn.loginFailed,
  forgotPasswordURL: appConfig.forgotPasswordURL,
  registerNewMemberURL: appConfig.registerNewMemberURL,
  googleProfileData: googleProfileData,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetLogIn,
    logUserIn,
    logGoogleUserIn,
  }, dispatch),
});

const loginValidation = createValidator({
  username: [required],
  pwd: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'loginForm', validate: loginValidation })(Login));
