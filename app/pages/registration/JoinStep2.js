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
import Button from 'components/common/style/buttons/Button';

import Request from 'components/common/network/Request';
import axios from 'axios';

import { GoogleLogin } from 'react-google-login';

class JoinStep2 extends Component {
  constructor(props) {
    super(props);

    /* bind the Join Page Service Response to "this" so it can access the form on the page */
    this.handleJoinPageServiceResponse = this.handleJoinPageServiceResponse.bind(this);
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
    'accountCreationType': 'userpass',
    'googleProfileData': {
      googleAPIFlowState: '',
      googleAccessToken: '',
      googleRefreshToken: '',
      googleProfileId: '',
      googleProfileEmail: '',
      googleProfileGivenName: '',
      googleProfileFamilyName: '',
      googleProfilePictureURL: '',
    },
    'accountFormDetails': {
      givenName: { value: '', hintText: ''},
      familyName: { value: '', hintText: ''},
      displayName: { value: '', hintText: ''},
      loginEmailAddress: { editable: true, value: '', hintText: '' },
      loginEmailAddressVerification: {visible: true, value: '', hintText: '' },
      password: { visible: true, value: '', hintText: '' },
      passwordVerification: { visible: true, value: '', hintText: '' },
    },
  };

  /* Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)*/
  handleJoinPageServiceResponse(result) {
      var accountFormDetailsData = this.state.accountFormDetails;
      accountFormDetailsData.givenName.hintText = result.formFieldLabels.firstname.hintText;
      accountFormDetailsData.familyName.hintText = result.formFieldLabels.lastname.hintText;
      accountFormDetailsData.displayName.hintText = result.formFieldLabels.displayname.hintText;
      accountFormDetailsData.loginEmailAddress.hintText = result.formFieldLabels.loginemailaddress.hintText;
      accountFormDetailsData.loginEmailAddressVerification.hintText = result.formFieldLabels.loginemailaddressverification.hintText;
      accountFormDetailsData.password.hintText = result.formFieldLabels.password.hintText;
      accountFormDetailsData.passwordVerification.hintText = result.formFieldLabels.passwordverification.hintText;

      /* update the account form details state so the correct hinText will show on each form field */
      this.setState({'accountFormDetails': accountFormDetailsData});
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange({ field, value }) {
    /* Get the existing state of the signup form, modify it and re-set the state */
    var accountFormDetailsData = this.state.accountFormDetails;
    accountFormDetailsData[field].value = value;

    this.setState({
      'accountFormDetails': accountFormDetailsData,
    });
  }

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    formValues.preventDefault();
    console.log(this.state.accountFormDetails);
  }

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = (googleTokenData) => {
    //console.log("Processing Google Signin: " + googleTokenData);

    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    const googleSSOResult = axios.post('/api/registration/processGoogleSSOSignin',
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
          this.setState({'googleProfileData': googleProfileResult});

          /* Update the Account Form parameters to show/hide fields as a result of Google Login */
          var accountFormDetailsData = this.state.accountFormDetails;

          /* Google Authentication does not require the customer to create a password/hide the form field */
          accountFormDetailsData.password.visible = false;
          accountFormDetailsData.passwordVerification.visible = false;

          /* Set the customer's information that we got from google as a starting place for the user */
          accountFormDetailsData.givenName.hintText = googleProfileResult.googleProfileGivenName;
          accountFormDetailsData.givenName.value = googleProfileResult.googleProfileGivenName;
          this.props.change('givenName', googleProfileResult.googleProfileGivenName);

          accountFormDetailsData.familyName.hintText = googleProfileResult.googleProfileFamilyName;
          accountFormDetailsData.familyName.value = googleProfileResult.googleProfileFamilyName;
          this.props.change('familyName', googleProfileResult.googleProfileFamilyName);

          /* The primary key for Google Single Sign-in is the user's email address which can't be changed if using Google, update the form on screen accordingly so certain fields are hidden and not editable */
          accountFormDetailsData.loginEmailAddress.hintText = googleProfileResult.googleProfileEmail;
          accountFormDetailsData.loginEmailAddress.editable = false;
          accountFormDetailsData.loginEmailAddress.value = googleProfileResult.googleProfileEmail;

          /* No need to verify the email address as its Google and it was already provided */
          accountFormDetailsData.loginEmailAddressVerification.visible = false;
          this.setState({'accountFormDetails': accountFormDetailsData});

          /* Set the account creation type as Google */
          this.setState({'accountCreationType': 'googleaccount'});
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  }

  processGoogleFailureResponse = (googleMessageData) => {
      console.log(googleMessageData);
  };

  render() {
    const JOIN_PAGE_ENDPOINT_URL = '/api/page/join';

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

    const GOOGLE_CLIENT_ID_ENDPOINT = '/api/registration/getGoogleClientID';

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

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
      <Request
        serviceURL={JOIN_PAGE_ENDPOINT_URL}
        model={joinPageModel}
        requestBody={{ 'callSource': 'setupCredentials', 'selectedPlanID': this.props.params.subscriptionPlanID }}
        serviceResponseHandler={this.handleJoinPageServiceResponse}
        render={({
          fetchingContent,
          modeledResponses: { JOIN_PAGE_MODEL },
        }) => (
          <Fragment>
            {
              !fetchingContent && this.props.params.subscriptionPlanID &&
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
                    <p>Selected Plan: {JOIN_PAGE_MODEL.selectedSubscriptionPlan.planName} (Plan ID: {this.props.params.subscriptionPlanID})</p>
                    <p>Account Creation Type: {accountCreationType}</p>
                    <br/>
                    <br/>
                    <div>
                      <p>Flow State for Google: {googleProfileData.googleAPIFlowState}</p>
                      <p>Google Profile ID: {googleProfileData.googleProfileId}</p>
                      <p>Google Profile Name: {googleProfileData.googleProfileGivenName} {googleProfileData.googleProfileFamilyName}</p>
                      <p>Google Profile Email: {googleProfileData.googleProfileEmail}</p>
                    </div>

                    <Request
                      serviceURL={GOOGLE_CLIENT_ID_ENDPOINT}
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
                      <p>{JOIN_PAGE_MODEL.formFieldLabels.firstname.label}:
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
                      <p>{JOIN_PAGE_MODEL.formFieldLabels.lastname.label}:
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
                      <p>{JOIN_PAGE_MODEL.formFieldLabels.displayname.label}:
                        <Field
                          name="displayName"
                          type="name"
                          label={this.state.accountFormDetails.displayName.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'displayName', value: event.target.value }); }}
                        />
                      </p>
                      <br/>
                      <p>{JOIN_PAGE_MODEL.formFieldLabels.loginemailaddress.label}:
                        <Field
                          input={{'disabled': ! this.state.accountFormDetails.loginEmailAddress.editable}}
                          name="loginEmailAddress"
                          type="email"
                          label={this.state.accountFormDetails.loginEmailAddress.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddress', value: event.target.value }); }}
                          value={this.state.accountFormDetails.loginEmailAddress.value}
                        />
                      </p>
                      <br/>
                      {this.state.accountFormDetails.loginEmailAddressVerification.visible == true && <p>{JOIN_PAGE_MODEL.formFieldLabels.loginemailaddressverification.label}:
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
                      {this.state.accountFormDetails.password.visible == true && <p>{JOIN_PAGE_MODEL.formFieldLabels.password.label}:
                        <Field
                          name="password"
                          type="password"
                          label={JOIN_PAGE_MODEL.formFieldLabels.password.hintText}
                          component={InputField}
                          onChange={(event) => { this.handleFieldChange({ field: 'password', value: event.target.value }); }}
                        />
                      </p>
                      }
                      <br/>
                      {this.state.accountFormDetails.passwordVerification.visible == true && <p>{JOIN_PAGE_MODEL.formFieldLabels.passwordverification.label}:
                        <Field
                          name="passwordVerification"
                          type="password"
                          label={JOIN_PAGE_MODEL.formFieldLabels.passwordverification.hintText}
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
