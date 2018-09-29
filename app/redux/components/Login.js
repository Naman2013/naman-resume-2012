import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import LargeButtonWithRightIcon from 'components/common/style/buttons/LargeButtonWithRightIcon';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { resetLogIn, logUserIn } from 'modules/login/actions';
import { nightfall, astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont } from 'styles/variables/fonts';
import{ horizontalArrowRightWhite } from 'styles/variables/iconURLs';

import Request from 'components/common/network/Request';

import { GoogleLogin } from 'react-google-login';


const propTypes = {
  forgotPasswordURL: PropTypes.string,
  registerNewMemberURL: PropTypes.string,
  actions: PropTypes.shape({
    logUserIn: PropTypes.func.isRequired,
    resetLogIn: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  forgotPasswordURL: '',
  registerNewMemberURL: '',

};

class Login extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  handleSubmit = (formValues) => {
    const { actions } = this.props;
    actions.logUserIn(formValues);
  }

  responseGoogle = (response) => {
    console.log(response);

    //process the Google Response Token data
    //const googleProfileData = {
    //  email: response.profileObj.email,
    //  givenName: response.profileObj.givenName,
    //  familyName: response.profileObj.familyName,
    //  googleId: response.profileObj.googleId,
    //  name: response.profileObj.name
    //}

    //console.log(googleProfileData);
  }

  render() {
    const GOOGLE_CLIENT_ID_ENDPOINT = '/api/registration/getGoogleClientID';

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
      loginFailed,
      registerNewMemberURL,
      forgotPasswordURL,
    } = this.props;

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

          <GoogleLogin
              fetchBasicProfile="true"
              responseType="code token"
              accessType="offline"
              scope="profile email https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly"
              clientId="740697517987-vhu4bpsjdfoq852ppj1jihtecoa4idrt.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />

          <Request
            serviceURL={GOOGLE_CLIENT_ID_ENDPOINT}
            model={googleClientIDModel}
            requestBody={{ }}
            render={({
              fetchingContent,
              modeledResponses: { GOOGLE_CLIENT_ID_MODEL },
            }) => (
              <Fragment>
                {
                  !fetchingContent &&
                    <Fragment>
                      <div style={{'paddingTop': '15px', 'marginLeft': 'auto', 'marginRight': 'auto', 'textAlign': 'center'}}>
                        <GoogleLogin
                            responseType={GOOGLE_CLIENT_ID_MODEL.googleClientResponseType}
                            accessType={GOOGLE_CLIENT_ID_MODEL.googleClientAccessType}
                            scope={GOOGLE_CLIENT_ID_MODEL.googleClientScope}
                            clientId={GOOGLE_CLIENT_ID_MODEL.googleClientID}
                            buttonText={GOOGLE_CLIENT_ID_MODEL.loginButtonText}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
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
        </form>
        <style>{`
          .root {
            background-color: ${romance};
          }

          .form {
            padding: 25px 0;
            ${faintShadow}
          }

          .form-submit {
            margin: 0 auto;
          }

          .forgot {
            display: block;
            margin: 15px;
            margin-bottom: 15px;
          }

          .field-error {
            color: red;
            font-family: ${primaryFont};
          }

          .title-link, .title-link:hover {
            font-weight: bold;
            font-size: 11px;
            color: ${astronaut};
            font-family: ${primaryFont};
            text-transform: uppercase;
          }

          .register-container {
            border-top: 1px solid ${shadows};
            padding: 15px;
            margin: 15px;
          }
        `}</style>
      </div>
    );
  }
}


const mapStateToProps = ({
  appConfig,
  logIn,
}) => ({
  loginFailed: logIn.loginFailed,
  forgotPasswordURL: appConfig.forgotPasswordURL,
  registerNewMemberURL: appConfig.registerNewMemberURL,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetLogIn,
    logUserIn,
  }, dispatch),
});

const loginValidation = createValidator({
  username: [required],
  pwd: [required],
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'loginForm', validate: loginValidation })(Login));
