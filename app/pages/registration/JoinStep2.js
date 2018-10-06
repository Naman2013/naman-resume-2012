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

    this.handleJoinPageServiceResponse = this.handleJoinPageServiceResponse.bind(this);
  }

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

  /* Obtain access to the join api service response */
  handleJoinPageServiceResponse(result) {
      var accountFormDetailsData = this.state.accountFormDetails;
      accountFormDetailsData.givenName.hintText = result.formFieldLabels.firstname.hintText;
      accountFormDetailsData.familyName.hintText = result.formFieldLabels.lastname.hintText;
      accountFormDetailsData.displayName.hintText = result.formFieldLabels.displayname.hintText;
      accountFormDetailsData.loginEmailAddress.hintText = result.formFieldLabels.loginemailaddress.hintText;
      accountFormDetailsData.loginEmailAddressVerification.hintText = result.formFieldLabels.loginemailaddressverification.hintText;
      accountFormDetailsData.password.hintText = result.formFieldLabels.password.hintText;
      accountFormDetailsData.passwordVerification.hintText = result.formFieldLabels.passwordverification.hintText;

      /* update the account form details state */
      this.setState({'accountFormDetails': accountFormDetailsData});
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange({ field, value }) {
    var accountFormDetailsData = this.state.accountFormDetails;
    accountFormDetailsData[field].value = value;

    this.setState({
      'accountFormDetails': accountFormDetailsData,
    });
  }

  handleSubmit = (formValues) => {
    formValues.preventDefault();
    console.log(this.state.accountFormDetails);
  }

  processGoogleFailureResponse = (googleMessageData) => {
      console.log(googleMessageData);
  };

  processGoogleSuccessResponse = (googleTokenData) => {
    //console.log("Processing Google Signin: " + googleTokenData);

    /* Process the token and get back information about this user, etc. */
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

          this.setState({'googleProfileData': googleProfileResult});

          /* Update the Account Form parameters to show/hide fields as a result of Google Login */
          var accountFormDetailsData = this.state.accountFormDetails;
          /* Google Authentication does not require the customer to create a password */
          accountFormDetailsData.password.visible = false;
          accountFormDetailsData.passwordVerification.visible = false;

          /* Set the customer's information that we got from google */
          accountFormDetailsData.givenName.value = googleProfileResult.googleProfileGivenName;
          accountFormDetailsData.familyName.value = googleProfileResult.googleProfileFamilyName;

          /* The data for Google Single Sign-in is the user's email address which can't be changed if using Google */
          accountFormDetailsData.loginEmailAddress.value = googleProfileResult.googleProfileEmail;
          accountFormDetailsData.loginEmailAddress.editable = false;
          accountFormDetailsData.loginEmailAddress.hintText = googleProfileResult.googleProfileEmail;

          /* No need to verify the email address as its Google and it was already provided */
          accountFormDetailsData.loginEmailAddressVerification.visible = false;
          this.setState({'accountFormDetails': accountFormDetailsData});

          /* Set the account creation type as Google */
          this.setState({'accountCreationType': 'googleaccount'});

          /* Log this user in via Google SSO */
          //actions.logGoogleUserIn(googleProfileResult);
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  }

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
                          label={JOIN_PAGE_MODEL.formFieldLabels.firstname.hintText}
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
                          label={JOIN_PAGE_MODEL.formFieldLabels.lastname.hintText}
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
                          label={JOIN_PAGE_MODEL.formFieldLabels.displayname.hintText}
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


const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', validate: joinStep2Validation, enableReinitialize: true, })(JoinStep2));
