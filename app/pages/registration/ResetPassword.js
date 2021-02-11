/** *********************************
 * V4 Join - Forgot Password Step 1
 ********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Button from 'app/components/common/style/buttons/Button';

import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';
import {
  FORGOT_PASSWORD_CONFIRMRESETTOKEN_ENDPOINT_URL,
  FORGOT_PASSWORD_CHANGEPASSWORD_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { API } from 'app/api';
import Request from 'app/components/common/network/Request';
import { destroySession } from 'app/modules/User';
import LargeButtonWithRightIcon from 'app/components/common/style/buttons/LargeButtonWithRightIcon';
import {
  nightfall,
  astronaut,
  romance,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { horizontalArrowRightWhite } from 'app/styles/variables/iconURLs';
import { CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import JoinHeader from './partials/JoinHeader';

import styles from './JoinStep1SchoolSelection.style';

const { string } = PropTypes;

@withTranslation()
class ResetPassword extends Component {
  static propTypes = {
    pathname: string,
  };

  static defaultProps = {
    // pathname: '/join/step1',
    pathname: 'join/resetPassword',
  };

  constructor(props) {
    super(props);
  }

  state = {
    passwordChangeStatusMessage: '',
    passwordHasBeenChanged: false,
    passwordFormDetails: {
      loginemailaddress: {
        label: '',
        value: '',
        hintText: '',
        errorText: '',
      },
      password: {
        label: '',
        value: '',
        hintText: '',
        errorText: '',
      },
      passwordverification: {
        label: '',
        value: '',
        hintText: '',
        errorText: '',
      },
    },
  };

  //complete the reset password flow and launch the login popup.
  launchLogin = () => {
    //force to homepage with login popup open....
    browserHistory.push('/');
  };

  //cancel this request and go back to the main homepage
  cancelAndGoHome = () => {
    browserHistory.push('/');
  };

  // Obtain access to the api service response and update the form accordingly.
  handleServiceResponse = result => {
    const passwordFormData = cloneDeep(this.state.passwordFormDetails);

    passwordFormData.loginemailaddress.label =
      result.formFieldLabels.loginEmailAddress.label;
    passwordFormData.password.label = result.formFieldLabels.password.label;
    passwordFormData.passwordverification.label =
      result.formFieldLabels.passwordverification.label;

    passwordFormData.loginemailaddress.hintText =
      result.formFieldLabels.loginEmailAddress.hintText;
    passwordFormData.password.hintText =
      result.formFieldLabels.password.hintText;
    passwordFormData.passwordverification.hintText =
      result.formFieldLabels.passwordverification.hintText;

    passwordFormData.loginemailaddress.value =
      result.formFieldLabels.loginEmailAddress.value;

    /* update the password form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      passwordFormDetails: passwordFormData,
    }));
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const passwordFormData = cloneDeep(this.state.passwordFormDetails);
    passwordFormData[field].value = value;

    this.setState(() => ({
      passwordFormDetails: passwordFormData,
    }));
  };

  handleSubmit = formValues => {
    formValues.preventDefault();
    let formIsComplete = true;
    const { t } = this.props;

    const passwordFormData = cloneDeep(this.state.passwordFormDetails);

    passwordFormData.password.errorText = '';
    passwordFormData.passwordverification.errorText = '';

    /* a password is assigned to a Google account even though they can sign-in using google, this way they can login without google if needed */
    if (passwordFormData.password.value === '') {
      passwordFormData.password.errorText = t(
        'Ecommerce.PasswordRequierMessage'
      );
      formIsComplete = false;
    } else {
      /* verify the password and the verification password fields match */
      passwordFormData.password.errorText = '';
      if (
        passwordFormData.password.value !==
        passwordFormData.passwordverification.value
      ) {
        passwordFormData.passwordverification.errorText = t(
          'Ecommerce.PasswordsDontMatchMessage'
        );
        formIsComplete = false;
      }
    }

    if (formIsComplete === false) {
      /* make sure to persist any changes to the password change form (error messages) */
      this.setState({ passwordFormDetails: passwordFormData });
    } else {
      //Make an API call out to verify the password being requested and if successful change the password.
      const passwordMeetsRequirementsAndWasChanged = API.post(
        FORGOT_PASSWORD_CHANGEPASSWORD_ENDPOINT_URL,
        {
          loginEmailAddress: this.state.passwordFormDetails.loginemailaddress
            .value,
          userEnteredPassword: this.state.passwordFormDetails.password.value,
          cid: this.props.params.cid,
          passwordResetToken: this.props.params.passwordResetToken,
        }
      )
        .then(response => {
          const res = response.data;
          if (res.apiError == false) {
            const validationResults = {
              passwordAcceptable: res.passwordAcceptable,
              passwordNotAcceptedMessage: res.passwordNotAcceptedMessage,
              accountStatus: res.accountStatus,
              accountStatusMessage: res.accountStatusMessage,
            };

            if (validationResults.passwordAcceptable === false) {
              /* Password did not meet Slooh requirements, provide the error messaging */
              passwordFormData.password.errorText =
                validationResults.passwordNotAcceptedMessage;
            }

            if (validationResults.accountStatus === 'success') {
              //destroy the user's current session....
              destroySession();

              //get a message back to the user that their password was changed successfully.....
              this.setState({
                passwordChangeStatusMessage:
                  validationResults.accountStatusMessage,
                passwordHasBeenChanged: true,
              });
            }

            /* make sure to persist any changes to the password change form (error messages) */
            this.setState({ passwordFormDetails: passwordFormData });
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    }
  };

  render() {
    const { pathname, t } = this.props;

    const { cid, passwordResetToken } = this.props.params;

    return (
      <div>
        {/*<div className="step-root">*/}
        {/* <div className="inner-container"> */}
        <Request
          serviceURL={FORGOT_PASSWORD_CONFIRMRESETTOKEN_ENDPOINT_URL}
          requestBody={{ cid, passwordResetToken }}
          serviceResponseHandler={this.handleServiceResponse}
          render={({ fetchingContent, serviceResponse }) => (
            <Fragment>
              {!fetchingContent && (
                <Fragment>
                  <JoinHeader
                    mainHeading={serviceResponse.pageHeading1}
                    subHeading={serviceResponse.pageHeading2}
                    // activeTab={pathname}
                    activeTab="join/forgotPasswordStep1"
                    tabs={CLASSROOM_JOIN_TABS}
                  />

                  <div className="step-root">
                    <div className="inner-container">
                      <div className="section-heading">
                        {serviceResponse.sectionHeading}
                      </div>
                      {this.state.passwordHasBeenChanged === true && (
                        <div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: this.state.passwordChangeStatusMessage,
                            }}
                          />
                          <br />
                          <br />
                          <LargeButtonWithRightIcon
                            icon={horizontalArrowRightWhite}
                            theme={{
                              backgroundColor: nightfall,
                              color: romance,
                              border: 0,
                            }}
                            text={t('Ecommerce.Login')}
                            onClickEvent={this.launchLogin}
                          />
                        </div>
                      )}
                      {this.state.passwordHasBeenChanged === false &&
                        serviceResponse.accountStatus === 'failed' && (
                          <div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: serviceResponse.accountStatusMessage,
                              }}
                            />
                            <br />
                            <br />
                            <LargeButtonWithRightIcon
                              icon={horizontalArrowRightWhite}
                              theme={{
                                backgroundColor: nightfall,
                                color: romance,
                                border: 0,
                              }}
                              text={t('Ecommerce.Home')}
                              onClickEvent={this.cancelAndGoHome}
                            />
                          </div>
                        )}
                      {this.state.passwordHasBeenChanged === false &&
                        serviceResponse.accountStatus === 'success' && (
                          <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-section">
                              <div className="form-field-container">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html: this.state.passwordFormDetails
                                      .loginemailaddress.label,
                                  }}
                                />
                                :
                                <p>
                                  {
                                    this.state.passwordFormDetails
                                      .loginemailaddress.value
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="form-section">
                              <div className="form-field-container">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html: this.state.passwordFormDetails
                                      .password.label,
                                  }}
                                />
                                :
                                <span
                                  className="form-error"
                                  dangerouslySetInnerHTML={{
                                    __html: this.state.passwordFormDetails
                                      .password.errorText,
                                  }}
                                />
                                <Field
                                  name="password"
                                  type="password"
                                  label={
                                    this.state.passwordFormDetails.password
                                      .hintText
                                  }
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'password',
                                      value: event.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-field-container">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html: this.state.passwordFormDetails
                                      .passwordverification.label,
                                  }}
                                />
                                :
                                <span
                                  className="form-error"
                                  dangerouslySetInnerHTML={{
                                    __html: this.state.passwordFormDetails
                                      .passwordverification.errorText,
                                  }}
                                />
                                <Field
                                  name="passwordverification"
                                  type="password"
                                  label={
                                    this.state.passwordFormDetails
                                      .passwordverification.hintText
                                  }
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'passwordverification',
                                      value: event.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <br />
                            </div>
                            <div className="button-container">
                              <button className="submit-button" type="submit">
                                {t('Ecommerce.Continue')}
                              </button>
                            </div>
                          </form>
                        )}
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          )}
        />
        {/*</div>*/}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ resetPasswordForm }) => ({
  resetPasswordForm,
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({ form: 'resetPasswordForm', enableReinitialize: true })(
    ResetPassword
  )
);
