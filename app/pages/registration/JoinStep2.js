/** *********************************
* V4 Join
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL,
  VERIFY_PASSWORD_MEETS_REQUIREMENTS_ENDPOINT_URL
} from 'services/registration/registration.js';

class JoinStep2 extends Component {
  constructor(props) {
    super(props);

    /* bind the Join Page Service Response to "this" so it can access the form on the page */
    this.handleJoinPageServiceResponse = this.handleJoinPageServiceResponse.bind(this);

    window.localStorage.setItem('accountCreationType', 'userpass');
  }

  /* Configure the default state for:
    Account Creation Type (userpass or googleaccount)
    googleProfileData - the data returned from a Google SSO request
    accountFormDetails - the details and data values of the account signup form
  */

  /*
    Given Name = Firstname
    Family Name = Lastname
  */
  state = {
    accountCreationType: 'userpass',
    isAstronomyClub: false,
    googleProfileData: {
      googleAPIFlowState: '',
      googleAccessToken: '',
      googleRefreshToken: '',
      googleProfileId: '',
      googleProfileEmail: '',
      googleProfileGivenName: '',
      googleProfileFamilyName: '',
      googleProfilePictureURL: '',
    },
    accountFormDetails: {
      givenName: { label: '', value: '', hintText: '', errorText: ''},
      familyName: { label: '', value: '', hintText: '', errorText: ''},
      displayName: { label: '', value: '', hintText: '', errorText: ''},
      loginEmailAddress: { label: '', editable: true, value: '', hintText: '', errorText: '' },
      loginEmailAddressVerification: {label: '', visible: true, value: '', hintText: '', errorText: '' },
      password: { label: '', visible: true, value: '', hintText: '', errorText: '' },
      passwordVerification: { label: '', visible: true, value: '', hintText: '', errorText: '' },
      astronomyClubName: { label: '', visible: true, value: '', hintText: '', errorText: '' },
      astronomyClub18AndOver: { label: '', visible: true, value: false, hintText: '', errorText: '' },
    },
  };

  /* Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)*/
  handleJoinPageServiceResponse(result) {
      var accountFormDetailsData = this.state.accountFormDetails;
      accountFormDetailsData.givenName.label = result.formFieldLabels.firstname.label;
      accountFormDetailsData.familyName.label = result.formFieldLabels.lastname.label;
      accountFormDetailsData.displayName.label = result.formFieldLabels.displayname.label;
      accountFormDetailsData.loginEmailAddress.label = result.formFieldLabels.loginemailaddress.label;
      accountFormDetailsData.loginEmailAddressVerification.label = result.formFieldLabels.loginemailaddressverification.label;
      accountFormDetailsData.password.label = result.formFieldLabels.password.label;
      accountFormDetailsData.passwordVerification.label = result.formFieldLabels.passwordverification.label;
      accountFormDetailsData.astronomyClubName.label = result.formFieldLabels.astronomyClubName.label;
      accountFormDetailsData.astronomyClub18AndOver.label = result.formFieldLabels.astronomyClub18AndOver.label;

      accountFormDetailsData.givenName.hintText = result.formFieldLabels.firstname.hintText;
      accountFormDetailsData.familyName.hintText = result.formFieldLabels.lastname.hintText;
      accountFormDetailsData.displayName.hintText = result.formFieldLabels.displayname.hintText;
      accountFormDetailsData.loginEmailAddress.hintText = result.formFieldLabels.loginemailaddress.hintText;
      accountFormDetailsData.loginEmailAddressVerification.hintText = result.formFieldLabels.loginemailaddressverification.hintText;
      accountFormDetailsData.password.hintText = result.formFieldLabels.password.hintText;
      accountFormDetailsData.passwordVerification.hintText = result.formFieldLabels.passwordverification.hintText;
      accountFormDetailsData.astronomyClubName.hintText = result.formFieldLabels.astronomyClubName.hintText;
      accountFormDetailsData.astronomyClub18AndOver.hintText = result.formFieldLabels.astronomyClub18AndOver.hintText;

      /* update the account form details state so the correct hinText will show on each form field */
      this.setState({accountFormDetails: accountFormDetailsData});

      /* was the selected plan an astronomy club? */
      this.setState({isAstronomyClub: result.selectedSubscriptionPlan.isAstronomyClub});
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange({ field, value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    var accountFormDetailsData = this.state.accountFormDetails;
    accountFormDetailsData[field].value = value;

    console.log(field);
    console.log(value);
    console.log(accountFormDetailsData);

    this.setState({
      accountFormDetails: accountFormDetailsData,
    });
  }

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    formValues.preventDefault();
    //console.log(this.state.accountFormDetails);

    //assume the form is ready to submit unless validation issues occur.
    var formIsComplete = true;

    var accountFormDetailsData = this.state.accountFormDetails;

    /* reset the error conditions */
    accountFormDetailsData.givenName.errorText = '';
    accountFormDetailsData.familyName.errorText = '';
    accountFormDetailsData.loginEmailAddress.errorText = '';
    accountFormDetailsData.loginEmailAddressVerification.errorText = '';
    accountFormDetailsData.password.errorText = '';
    accountFormDetailsData.passwordVerification.errorText = '';
    accountFormDetailsData.astronomyClubName.errorText = '';

    if (this.state.accountCreationType === 'userpass') {
        /* Verify that the user has provided:
            Firstname
            Lastname
            Displayname - optional
            Email address and matches verification email fields
            Password and matches password verification field
        */

        if (this.state.accountFormDetails.givenName.value === '') {
          accountFormDetailsData.givenName.errorText = 'Please enter in your first name.';
          formIsComplete = false;
        }

        if (this.state.accountFormDetails.familyName.value === '') {
          accountFormDetailsData.familyName.errorText = 'Please enter in your last name.';
          formIsComplete = false;
        }

        if (this.state.accountFormDetails.loginEmailAddress.value === '') {
          accountFormDetailsData.loginEmailAddress.errorText = 'Please enter in your email address.';
          formIsComplete = false;
        }
        else {
          /* verify the email address and the verification email address fields match */
          accountFormDetailsData.loginEmailAddress.errorText = '';
          if (this.state.accountFormDetails.loginEmailAddress.value !== this.state.accountFormDetails.loginEmailAddressVerification.value) {
            accountFormDetailsData.loginEmailAddressVerification.errorText = 'The Login Email Address and the Login Email Verification fields must match.';
            formIsComplete = false;
          }
        }

        if (this.state.accountFormDetails.password.value === '') {
          accountFormDetailsData.password.errorText = 'Please enter in a password.';
          formIsComplete = false;
        }
        else {
          /* verify the password and the verification password fields match */
          accountFormDetailsData.password.errorText = '';
          if (this.state.accountFormDetails.password.value !== this.state.accountFormDetails.passwordVerification.value) {
            accountFormDetailsData.passwordVerification.errorText = 'Your password and the password you entered into the verification field must match.';
            formIsComplete = false;
          }
        }

        /* need to verify that the password meets the Slooh requirements */
    }
    else if (this.state.accountCreationType === 'googleaccount') {
        /* Verify that the user has provided:
          Firstname
          Lastname
        */

        if (this.state.accountFormDetails.givenName.value === '') {
          accountFormDetailsData.givenName.errorText = 'Please enter in your first name.';
          formIsComplete = false;
        }

        if (this.state.accountFormDetails.familyName.value === '') {
          accountFormDetailsData.familyName.errorText = 'Please enter in your last name.';
          formIsComplete = false;
        }
    }

    /* Special Verifications if this is an Astronomy Club */
    if (this.state.isAstronomyClub) {
      if (this.state.accountFormDetails.astronomyClubName.value === '') {
        accountFormDetailsData.astronomyClubName.errorText = 'Please enter in a name for your Astronomy Club.';
        formIsComplete = false;
      }
    }

    if (formIsComplete == true) {
        /* The form is complete and valid, submit the pending customer request */
        /*****************************************
        * Set up a Pending Customer Account
        * Set a cid_pending localStorage key
        *****************************************/
        //JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL


        /* Last Validation....password validation, not required for Google Accounts as their is no password */
        if (this.state.accountCreationType == 'userpass') {
            /* reach out to the Slooh API and verify the user's password */
            var isValidPassword = true;

            const passwordMeetsRequirementsResult = axios.post(VERIFY_PASSWORD_MEETS_REQUIREMENTS_ENDPOINT_URL,
              {
                userEnteredPassword: this.state.accountFormDetails.password.value
              })
              .then(response => {
                const { actions } = this.props;

                const res = response.data;
                if (res.apiError == false) {
                  const passwordResult = {
                    passwordAcceptable: res.passwordAcceptable,
                    passwordNotAcceptedMessage: res.passwordNotAcceptedMessage,
                  }

                  if (passwordResult.passwordAcceptable == true) {
                    /* create the pending customer result */
                    this.createPendingCustomerRecordAndNextScreen();
                  }
                  else {
                    /* Password did not meet Slooh requirements, provide the error messaging */
                    accountFormDetailsData.password.errorText = passwordResult.passwordNotAcceptedMessage;

                    /* make sure to persist any changes to the account signup form (error messages) */
                    this.setState({ accountFormDetails: accountFormDetailsData });
                  }
                }
              })
              .catch(err => {
                throw ('Error: ', err);
              });
        }
        else if (this.state.accountCreationType == 'googleaccount') {
            //window.localStorage.setItem('join_accountFormDetails', this.state.accountFormDetails);

            /* no additional verifications are needed, create the pending customer record and continue to the next screen */
            this.createPendingCustomerRecordAndNextScreen();
        }
    }
    else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState({ accountFormDetails: accountFormDetailsData });
    }
  }

  createPendingCustomerRecordAndNextScreen = () => {
    /* Create the pending customer record and move onto the next screen */
    browserHistory.push('/join/step3');
  };

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = (googleTokenData) => {
    //console.log("Processing Google Signin: " + googleTokenData);

    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    const googleSSOResult = axios.post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
      {
        authenticationCode: googleTokenData.code
      })
      .then(response => {
        const { actions } = this.props;

        const res = response.data;
        if (res.apiError == false) {
          const googleProfileResult = {
            googleAPIFlowState: res.flow_state,
            googleAccessToken: res.googleAccessToken,
            googleRefreshToken: res.googleRefreshToken,
            googleProfileId: res.googleProfileId,
            googleProfileEmail: res.googleProfileInfo.email,
            googleProfileGivenName: res.googleProfileInfo.givenName,
            googleProfileFamilyName: res.googleProfileInfo.familyName,
            googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
          }

          /* Capture the Google Profile Data and store it in state */
          this.setState({googleProfileData: googleProfileResult});

          /* Update the Account Form parameters to show/hide fields as a result of Google Login */
          var accountFormDetailsData = this.state.accountFormDetails;

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
          this.setState({accountFormDetails: accountFormDetailsData});

          /* Set the account creation type as Google */
          this.setState({accountCreationType: 'googleaccount'});

          /* Set the account creation type as Google and the Google Profile Id in browser storage */
          window.localStorage.setItem('accountCreationType', 'googleaccount');
          window.localStorage.setItem('googleProfileId', googleProfileResult.googleProfileId);
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  }

  processGoogleFailureResponse = (googleMessageData) => {
      console.log(googleMessageData);
  }

  render() {

    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
        selectedSubscriptionPlan: resp.selectedSubscriptionPlan,
        formFieldLabels: resp.formFieldLabels,
      }),
    };

    const googleClientIDModel = {
      name: 'GOOGLE_CLIENT_ID_MODEL',
      model: resp => ({
        googleAPIFlowState: resp.apiFlowState,
        googleClientID: resp.googleClientID,
        googleClientScope: resp.googleClientScope,
        googleClientAccessType: resp.googleClientAccessType,
        googleClientResponseType: resp.googleClientResponseType,
        loginButtonText: resp.loginButtonText,
      }),
    };

    const googleProfileData = this.state.googleProfileData;
    const accountFormDetails = this.state.accountFormDetails;
    const accountCreationType = this.state.accountCreationType;
    const selectedPlanId = window.localStorage.getItem('selectedPlanId');

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        model={joinPageModel}
        requestBody={{ 'callSource': 'setupCredentials', 'selectedPlanID': selectedPlanId }}
        serviceResponseHandler={this.handleJoinPageServiceResponse}
        render={({
          fetchingContent,
          modeledResponses: { JOIN_PAGE_MODEL },
        }) => (
          <Fragment>
            {
              !fetchingContent && selectedPlanId &&
                <Fragment>
                    <header className="header">
                      <div className="icon"></div>
                    </header>
                    <h1>{JOIN_PAGE_MODEL.pageHeading1}</h1>
                    <h2>{JOIN_PAGE_MODEL.pageHeading2}</h2>
                    <br/>
                    <h3>Step 2: {JOIN_PAGE_MODEL.sectionHeading}</h3>
                    <br/>
                    <br/>
                    <p>Selected Plan: {JOIN_PAGE_MODEL.selectedSubscriptionPlan.planName} (Plan ID: {selectedPlanId})</p>
                    <p style={{'fontSize': '1.0em'}}>{JOIN_PAGE_MODEL.selectedSubscriptionPlan.startDateText}</p>
                    <p style={{'fontSize': '1.0em'}}>{JOIN_PAGE_MODEL.selectedSubscriptionPlan.nextRenewalDate}</p>
                    <p style={{'fontSize': '1.0em'}}>{JOIN_PAGE_MODEL.selectedSubscriptionPlan.planCostPrefix}{JOIN_PAGE_MODEL.selectedSubscriptionPlan.planCost}</p>
                    <p style={{'fontSize': '1.0em'}}>{JOIN_PAGE_MODEL.selectedSubscriptionPlan.planCostPostfix}</p>
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

                    <Request
                      serviceURL={GOOGLE_CLIENT_ID_ENDPOINT_URL}
                      model={googleClientIDModel}
                      requestBody={{ 'callSource': 'join' }}
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
                    <br/>
                    <form className="form" onSubmit={this.handleSubmit}>
                      {this.state.isAstronomyClub === true && <div><br/>{this.state.accountFormDetails.astronomyClubName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.astronomyClubName.errorText}</span>
                            <Field
                              name="astronomyClubName"
                              type="name"
                              label={this.state.accountFormDetails.astronomyClubName.hintText}
                              component={InputField}
                              onChange={(event) => { this.handleFieldChange({ field: 'astronomyClubName', value: event.target.value }); }}
                            />
                          <br/>
                          <br/>
                          <div style={{'display': 'block-inline'}}>{this.state.accountFormDetails.astronomyClub18AndOver.label}:
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
                      <p>{this.state.accountFormDetails.givenName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.givenName.errorText}</span>
                        <Field
                          name="givenName"
                          type="name"
                          label={this.state.accountFormDetails.givenName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'givenName', value: event.target.value }); }}
                          value={this.state.accountFormDetails.givenName.value}
                          />
                      </p>
                      <br/>
                      <p>{this.state.accountFormDetails.familyName.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.familyName.errorText}</span>
                        <Field
                          name="familyName"
                          type="name"
                          label={this.state.accountFormDetails.familyName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'familyName', value: event.target.value }); }}
                          value={this.state.accountFormDetails.familyName.value}
                        />
                      </p>
                      <br/>
                      <p>{this.state.accountFormDetails.displayName.label}:
                        <Field
                          name="displayName"
                          type="name"
                          label={this.state.accountFormDetails.displayName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'displayName', value: event.target.value }); }}
                        />
                      </p>
                      <br/>
                      {this.state.accountCreationType === 'userpass' && <p>{this.state.accountFormDetails.loginEmailAddress.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.loginEmailAddress.errorText}</span>
                        <Field
                          name="loginEmailAddress"
                          type="email"
                          label={this.state.accountFormDetails.loginEmailAddress.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddress', value: event.target.value }); }}
                          value={this.state.accountFormDetails.loginEmailAddress.value}
                        />
                      </p>
                      }
                      {this.state.accountCreationType === 'googleaccount' && <p>{this.state.accountFormDetails.loginEmailAddress.label}: <span style={{'fontWeight': 'bold'}}>{this.state.accountFormDetails.loginEmailAddress.value}</span></p>}
                      <br/>
                      {this.state.accountFormDetails.loginEmailAddressVerification.visible == true && <p>{this.state.accountFormDetails.loginEmailAddressVerification.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.loginEmailAddressVerification.errorText}</span>
                        <Field
                            name="loginEmailAddressVerification"
                            type="email"
                            label={JOIN_PAGE_MODEL.formFieldLabels.loginemailaddressverification.hintText}
                            component={InputField}
                            onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddressVerification', value: event.target.value }); }}
                            value={this.state.accountFormDetails.loginEmailAddressVerification.value}
                          />
                      </p>
                      }
                      <br/>
                      {this.state.accountFormDetails.password.visible == true && <p>{this.state.accountFormDetails.password.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.password.errorText}</span>
                        <Field
                          name="password"
                          type="password"
                          label={this.state.accountFormDetails.password.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'password', value: event.target.value }); }}
                        />
                      </p>
                      }
                      <br/>
                      {this.state.accountFormDetails.passwordVerification.visible == true && <p>{JOIN_PAGE_MODEL.formFieldLabels.passwordverification.label}: <span style={{'color': 'red', 'fontStyle': 'italic'}}>{this.state.accountFormDetails.passwordVerification.errorText}</span>
                        <Field
                          name="passwordVerification"
                          type="password"
                          label={this.state.accountFormDetails.passwordVerification.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'passwordVerification', value: event.target.value }); }}
                        />
                      </p>
                      }
                      <Button theme={{ margin: '0 auto'}} type="submit" text="Goto Payment" onClickEvent={null} />
                      <br/>
                      <br/>
                      <Link to="/join/step1"><Button theme={{ margin: '0 auto'}} type="button" text="Go Back"/></Link><br/>

                    </form>
                    <br/>
                    <br/>
                </Fragment>
              }
              </Fragment>
            )}
          />
      </div>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm: joinAccountForm,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', validate: joinStep2Validation, enableReinitialize: true, })(JoinStep2));
