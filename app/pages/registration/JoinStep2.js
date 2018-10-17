/***********************************
* V4 Join
***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';

import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL,
  VERIFY_PASSWORD_MEETS_REQUIREMENTS_ENDPOINT_URL
} from 'services/registration/registration.js';
import styles from './JoinStep2.style';

const {
  string,
  func,
} = PropTypes;

class JoinStep2 extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
  };
  static defaultProps = {
    change: noop,
  };

  constructor(props) {
    super(props);
    window.localStorage.setItem('accountCreationType', 'userpass');

    /* Configure the default state for:
      Account Creation Type (userpass or googleaccount)
      googleProfileData - the data returned from a Google SSO request
      accountFormDetails - the details and data values of the account signup form
    */

    /*
      Given Name = Firstname
      Family Name = Lastname
    */
    this.state = {
      accountCreationType: 'userpass',
      isAstronomyClub: false,
      googleProfileData: {
        googleProfileId: '',
        googleProfileEmail: '',
        googleProfileGivenName: '',
        googleProfileFamilyName: '',
        googleProfilePictureURL: '',
      },
      accountFormDetails: {
        givenName: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        familyName: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        displayName: {
          label: '',
          value: '',
          hintText: '',
          errorText: '',
        },
        loginEmailAddress: {
          label: '',
          editable: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        loginEmailAddressVerification: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        password: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        passwordVerification: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        astronomyClubName: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        astronomyClub18AndOver: {
          label: '',
          visible: true,
          value: false,
          hintText: '',
          errorText: '',
        },
      },
    }
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = (result) => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);

    newAccountFormData.givenName.label = result.formFieldLabels.firstname.label;
    newAccountFormData.familyName.label = result.formFieldLabels.lastname.label;
    newAccountFormData.displayName.label = result.formFieldLabels.displayname.label;
    newAccountFormData.loginEmailAddress.label = result.formFieldLabels.loginemailaddress.label;
    newAccountFormData.loginEmailAddressVerification.label = result.formFieldLabels.loginemailaddressverification.label;
    newAccountFormData.password.label = result.formFieldLabels.password.label;
    newAccountFormData.passwordVerification.label = result.formFieldLabels.passwordverification.label;
    newAccountFormData.astronomyClubName.label = result.formFieldLabels.astronomyClubName.label;
    newAccountFormData.astronomyClub18AndOver.label = result.formFieldLabels.astronomyClub18AndOver.label;

    newAccountFormData.givenName.hintText = result.formFieldLabels.firstname.hintText;
    newAccountFormData.familyName.hintText = result.formFieldLabels.lastname.hintText;
    newAccountFormData.displayName.hintText = result.formFieldLabels.displayname.hintText;
    newAccountFormData.loginEmailAddress.hintText = result.formFieldLabels.loginemailaddress.hintText;
    newAccountFormData.loginEmailAddressVerification.hintText = result.formFieldLabels.loginemailaddressverification.hintText;
    newAccountFormData.password.hintText = result.formFieldLabels.password.hintText;
    newAccountFormData.passwordVerification.hintText = result.formFieldLabels.passwordverification.hintText;
    newAccountFormData.astronomyClubName.hintText = result.formFieldLabels.astronomyClubName.hintText;
    newAccountFormData.astronomyClub18AndOver.hintText = result.formFieldLabels.astronomyClub18AndOver.hintText;

    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
      /* was the selected plan an astronomy club? */
      isAstronomyClub: result.selectedSubscriptionPlan.isAstronomyClub,
    }));
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    newAccountFormData[field].value = value;

    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  }

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    formValues.preventDefault();
    //console.log(this.state.accountFormDetails);

    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const {
      accountFormDetails,
      accountCreationType,
    } = this.state;

    const accountFormDetailsData = cloneDeep(accountFormDetails);

    /* reset the error conditions */
    accountFormDetailsData.givenName.errorText = '';
    accountFormDetailsData.familyName.errorText = '';
    accountFormDetailsData.loginEmailAddress.errorText = '';
    accountFormDetailsData.loginEmailAddressVerification.errorText = '';
    accountFormDetailsData.password.errorText = '';
    accountFormDetailsData.passwordVerification.errorText = '';
    accountFormDetailsData.astronomyClubName.errorText = '';

    if (accountCreationType === 'userpass') {
        /* Verify that the user has provided:
            Firstname
            Lastname
            Displayname - optional
            Email address and matches verification email fields
            Password and matches password verification field
        */

      if (accountFormDetailsData.givenName.value === '') {
        accountFormDetailsData.givenName.errorText = 'Please enter in your first name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.familyName.value === '') {
        accountFormDetailsData.familyName.errorText = 'Please enter in your last name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.loginEmailAddress.value === '') {
        accountFormDetailsData.loginEmailAddress.errorText = 'Please enter in your email address.';
        formIsComplete = false;
      } else {
        /* verify the email address and the verification email address fields match */
        accountFormDetailsData.loginEmailAddress.errorText = '';
        if (accountFormDetailsData.loginEmailAddress.value !== accountFormDetailsData.loginEmailAddressVerification.value) {
          accountFormDetailsData.loginEmailAddressVerification.errorText = 'The Login Email Address and the Login Email Verification fields must match.';
          formIsComplete = false;
        }
      }

      if (accountFormDetailsData.password.value === '') {
        accountFormDetailsData.password.errorText = 'Please enter in a password.';
        formIsComplete = false;
      } else {
        /* verify the password and the verification password fields match */
        accountFormDetailsData.password.errorText = '';
        if (accountFormDetailsData.password.value !== accountFormDetailsData.passwordVerification.value) {
          accountFormDetailsData.passwordVerification.errorText = 'Your password and the password you entered into the verification field must match.';
          formIsComplete = false;
        }
      }

      /* need to verify that the password meets the Slooh requirements */
    } else if (accountCreationType === 'googleaccount') {
      /* Verify that the user has provided:
        Firstname
        Lastname
      */

      if (accountFormDetailsData.givenName.value === '') {
        accountFormDetailsData.givenName.errorText = 'Please enter in your first name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.familyName.value === '') {
        accountFormDetailsData.familyName.errorText = 'Please enter in your last name.';
        formIsComplete = false;
      }
    }

    /* Special Verifications if this is an Astronomy Club */
    if (this.state.isAstronomyClub) {
      if (accountFormDetailsData.astronomyClubName.value === '') {
        accountFormDetailsData.astronomyClubName.errorText = 'Please enter in a name for your Astronomy Club.';
        formIsComplete = false;
      }
    }

    if (formIsComplete === true) {
    /* The form is complete and valid, submit the pending customer request if the Password Enters meets the Slooh Requirements */

      /* Last Validation....password validation, not required for Google Accounts as their is no password */
      if (accountCreationType === 'userpass') {
      /* reach out to the Slooh API and verify the user's password */

        const passwordMeetsRequirementsResult = axios.post(VERIFY_PASSWORD_MEETS_REQUIREMENTS_ENDPOINT_URL, {
          userEnteredPassword: this.state.accountFormDetails.password.value
        })
          .then((response) => {
            const res = response.data;
            if (res.apiError == false) {
              const passwordResult = {
                passwordAcceptable: res.passwordAcceptable,
                passwordNotAcceptedMessage: res.passwordNotAcceptedMessage,
              }

              if (passwordResult.passwordAcceptable) {
                formIsComplete = true;

                /* create the pending customer result */
                this.createPendingCustomerRecordAndNextScreen();
              } else {
                /* Password did not meet Slooh requirements, provide the error messaging */
                accountFormDetailsData.password.errorText = passwordResult.passwordNotAcceptedMessage;

                /* make sure to persist any changes to the account signup form (error messages) */
                this.setState({ accountFormDetails: accountFormDetailsData });

                formIsComplete = false;
              }
            }
          })
          .catch((err) => {
            throw ('Error: ', err);
          });
      } else if (accountCreationType === 'googleaccount') {
        /* no additional verifications are needed, create the pending customer record and continue to the next screen */
        this.createPendingCustomerRecordAndNextScreen();
      }
    } else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
    }
  }

  createPendingCustomerRecordAndNextScreen = () => {
    /*
    * Set up a Pending Customer Account
    * Set a cid_pending localStorage key
    */

    //for classroom accounts
    const selectedSchoolId = window.localStorage.getItem('selectedSchoolId');

    /* prepare the payload to the Create Pending Customer API call. */
    let createPendingCustomerData = {
      accountCreationType: this.state.accountCreationType,
      selectedPlanId: window.localStorage.selectedPlanId,
      googleProfileId: this.state.googleProfileData.googleProfileId,
      accountFormDetails: this.state.accountFormDetails,
      selectedSchoolId: selectedSchoolId,
    };
    /* update tool/false values for Astronomy Club */
    if (createPendingCustomerData.accountFormDetails.astronomyClub18AndOver.value === false) {
      createPendingCustomerData.accountFormDetails.astronomyClub18AndOver.value = 'false';
    }
    else {
      createPendingCustomerData.accountFormDetails.astronomyClub18AndOver.value = 'true';
    }

    // JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL
    axios.post(JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL, createPendingCustomerData)
      .then((response) => {
        const res = response.data;
        if (!res.apiError) {
          const pendingCustomerResult = {
            status: res.status,
            customerId: res.customerId,
          }

          if (pendingCustomerResult.status === 'success') {
            window.localStorage.setItem('pending_cid', pendingCustomerResult.customerId);
            window.localStorage.setItem('username', this.state.accountFormDetails.loginEmailAddress.value);
            window.localStorage.setItem('password', this.state.accountFormDetails.password.value);

            // console.log('Proceeding to create the customers pending account');
            browserHistory.push('/join/step3');
          }
          else {
            /* process / display error to user */
          }
        }
      })
      .catch((err) => {
        throw ('Error: ', err);
      });
  }

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = (googleTokenData) => {
    // console.log("Processing Google Signin: " + googleTokenData);

    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    axios.post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL, {
        authenticationCode: googleTokenData.code
    })
      .then((response) => {

        const res = response.data;
        if (!res.apiError) {
          const googleProfileResult = {
            googleProfileId: res.googleProfileId,
            googleProfileEmail: res.googleProfileInfo.email,
            googleProfileGivenName: res.googleProfileInfo.givenName,
            googleProfileFamilyName: res.googleProfileInfo.familyName,
            googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
          };

          /* Capture the Google Profile Data and store it in state */
          this.setState(() => ({ googleProfileData: googleProfileResult }));

          /* Update the Account Form parameters to show/hide fields as a result of Google Login */
          const accountFormDetailsData = cloneDeep(this.state.accountFormDetails);
          /* Google Authentication does not require the customer to create a password/hide the form field */
          accountFormDetailsData.password.visible = false;
          accountFormDetailsData.passwordVerification.visible = false;

          /* Set the customer's information that we got from google as a starting place for the user */
          accountFormDetailsData.givenName.value = googleProfileResult.googleProfileGivenName;
          this.props.change('givenName', googleProfileResult.googleProfileGivenName);

          accountFormDetailsData.familyName.value = googleProfileResult.googleProfileFamilyName;
          this.props.change('familyName', googleProfileResult.googleProfileFamilyName);

          /* The primary key for Google Single Sign-in is the user's email address which can't be changed if using Google, update the form on screen accordingly so certain fields are hidden and not editable */
          accountFormDetailsData.loginEmailAddress.editable = false;
          accountFormDetailsData.loginEmailAddress.value = googleProfileResult.googleProfileEmail;
          this.props.change('loginEmailAddress', googleProfileResult.googleProfileEmail);

          /* No need to verify the email address as its Google and it was already provided */
          accountFormDetailsData.loginEmailAddressVerification.visible = false;

          this.setState(() => ({
            accountFormDetails: accountFormDetailsData,
            /* Set the account creation type as Google */
            accountCreationType: 'googleaccount',
          }));


          /* Set the account creation type as Google and the Google Profile Id in browser storage */
          window.localStorage.setItem('accountCreationType', 'googleaccount');
          window.localStorage.setItem('googleProfileId', googleProfileResult.googleProfileId);
          window.localStorage.setItem('googleProfileEmail', googleProfileResult.googleProfileEmail);
        }
      })
      .catch((err) => {
        throw ('Error: ', err);
      });
  }

  processGoogleFailureResponse = (googleMessageData) => {
      console.log(googleMessageData);
  }

  render() {
    const { pathname } = this.props;
    const {
      googleProfileData,
      accountFormDetails,
      accountCreationType,
      isAstronomyClub,
    } = this.state;

    const selectedPlanId = window.localStorage.getItem('selectedPlanId');

    //for classroom accounts
    const selectedSchoolId = window.localStorage.getItem('selectedSchoolId');

    return (
      <div className="step-root">
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'setupCredentials', 'selectedPlanId': selectedPlanId, 'selectedSchoolId': selectedSchoolId }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({
            fetchingContent,
            serviceResponse: joinPageRes,
          }) => (
            <Fragment>
              {
                !fetchingContent && selectedPlanId &&
                  <Fragment>
                    <JoinHeader
                      mainHeading={joinPageRes.pageHeading1}
                      subHeading={joinPageRes.pageHeading2}
                      activeTab={pathname}
                    />
                    <DisplayAtBreakpoint
                      screenMedium
                      screenLarge
                      screenXLarge
                    >
                      <PlanDetailsCard {...joinPageRes.selectedSubscriptionPlan} />
                    </DisplayAtBreakpoint>
                    <div className="section-heading">{joinPageRes.sectionHeading}</div>
                      {/*
                        <p>Account Creation Type: {accountCreationType}</p>
                        <br/>
                        <br/>
                        <div>
                          <p>Flow State for Google: {googleProfileData.googleAPIFlowState}</p>
                          <p>Google Profile ID: {googleProfileData.googleProfileId}</p>
                          <p>Google Profile Name: {googleProfileData.googleProfileGivenName} {googleProfileData.googleProfileFamilyName}</p>
                          <p>Google Profile Email: {googleProfileData.googleProfileEmail}</p>
                        </div>
                      */}
                      {joinPageRes.hasSelectedSchool === "yes" && <div>
                        <p>Your School: {joinPageRes.selectedSchool.schoolName}</p>
                        <p style={{'fontSize': '1.0em'}}>Your School District: {joinPageRes.selectedSchool.districtName}</p>
                        <br/>
                        <br/>
                      </div>
                      }

                    <Request
                      serviceURL={GOOGLE_CLIENT_ID_ENDPOINT_URL}
                      requestBody={{
                        callSource: 'join',
                      }}
                      render={({
                        fetchingContent: fetchingGoogleClient,
                        serviceResponse: googleClientResponse,
                      }) => (
                        <Fragment>
                          {
                            !fetchingGoogleClient &&
                              <div>
                                <GoogleLogin
                                  prompt="select_account"
                                  responseType={googleClientResponse.googleClientResponseType}
                                  fetchBasicProfile={googleClientResponse.googleClientFetchBasicProfile}
                                  accessType={googleClientResponse.googleClientAccessType}
                                  scope={googleClientResponse.googleClientScope}
                                  clientId={googleClientResponse.googleClientID}
                                  buttonText={googleClientResponse.loginButtonText}
                                  onSuccess={this.processGoogleSuccessResponse}
                                  onFailure={this.processGoogleFailureResponse}
                                />
                              </div>
                            }
                        </Fragment>
                      )}
                    />
                    <form className="form" onSubmit={this.handleSubmit}>
                      {isAstronomyClub === true && <div><br/>{accountFormDetails.astronomyClubName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.astronomyClubName.errorText}</span>
                            <Field
                              name="astronomyClubName"
                              type="name"
                              label={accountFormDetails.astronomyClubName.hintText}
                              component={InputField}
                              onChange={(event) => { this.handleFieldChange({ field: 'astronomyClubName', value: event.target.value }); }}
                            />
                          <br/>
                          <br/>
                          <div style={{'display': 'block-inline'}}>{accountFormDetails.astronomyClub18AndOver.label}:
                            <Field style={{'display': 'inline'}}
                              name="astronomyClub18AndOver"
                              component={InputField}
                              type="checkbox"
                              onChange={(event) => { this.handleFieldChange({ field: 'astronomyClub18AndOver', value: event.target.value }); }}
                            />
                          </div>
                          <br/>
                        </div>
                      }
                      <p>{accountFormDetails.givenName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.givenName.errorText}</span>
                        <Field
                          name="givenName"
                          type="name"
                          label={accountFormDetails.givenName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'givenName', value: event.target.value }); }}
                          value={accountFormDetails.givenName.value}
                          />
                      </p>
                      <br/>
                      <p>{accountFormDetails.familyName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.familyName.errorText}</span>
                        <Field
                          name="familyName"
                          type="name"
                          label={accountFormDetails.familyName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'familyName', value: event.target.value }); }}
                          value={accountFormDetails.familyName.value}
                        />
                      </p>
                      <br/>
                      <p>{accountFormDetails.displayName.label}:
                        <Field
                          name="displayName"
                          type="name"
                          label={accountFormDetails.displayName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'displayName', value: event.target.value }); }}
                        />
                      </p>
                      <br/>
                      {this.state.accountCreationType === 'userpass' && <p>{accountFormDetails.loginEmailAddress.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.loginEmailAddress.errorText}</span>
                        <Field
                          name="loginEmailAddress"
                          type="email"
                          label={accountFormDetails.loginEmailAddress.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddress', value: event.target.value }); }}
                          value={accountFormDetails.loginEmailAddress.value}
                        />
                      </p>
                      }
                      {this.state.accountCreationType === 'googleaccount' && <p>{accountFormDetails.loginEmailAddress.label}: <span style={{'fontWeight': 'bold'}}>{accountFormDetails.loginEmailAddress.value}</span></p>}
                      <br/>
                      {accountFormDetails.loginEmailAddressVerification.visible == true && <p>{accountFormDetails.loginEmailAddressVerification.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.loginEmailAddressVerification.errorText}</span>
                        <Field
                            name="loginEmailAddressVerification"
                            type="email"
                            label={joinPageRes.formFieldLabels.loginemailaddressverification.hintText}
                            component={InputField}
                            onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddressVerification', value: event.target.value }); }}
                            value={accountFormDetails.loginEmailAddressVerification.value}
                          />
                      </p>
                      }
                      <br/>
                      {accountFormDetails.password.visible == true && <p>{accountFormDetails.password.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.password.errorText}</span>
                        <Field
                          name="password"
                          type="password"
                          label={accountFormDetails.password.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'password', value: event.target.value }); }}
                        />
                      </p>
                      }
                      <br/>
                      {accountFormDetails.passwordVerification.visible == true && <p>{joinPageRes.formFieldLabels.passwordverification.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{accountFormDetails.passwordVerification.errorText}</span>
                        <Field name="passwordVerification"
                          type="password"
                          label={accountFormDetails.passwordVerification.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'passwordVerification', value: event.target.value }); }}
                        />
                      </p>
                      }
                      <Button theme={{ margin: '0 auto'}} type="submit" text="Goto Payment" onClickEvent={null} />
                      <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>

                    </form>
                  </Fragment>
                }
                </Fragment>
              )}
            />
          <style jsx>{styles}</style>
      </div>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', validate: joinStep2Validation, enableReinitialize: true, })(JoinStep2));
