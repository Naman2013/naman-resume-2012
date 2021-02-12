/***********************************
 * V4 Join
 ***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';

import Button from 'app/components/common/style/buttons/Button';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { getUserInfo } from 'app/modules/User';
import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL,
  VERIFY_CLUB_CODE_ENDPOINT_URL,
  VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
  VERIFY_CAPTCHA_CODE_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import { DEFAULT_JOIN_TABS, CLASSROOM_JOIN_TABS } from './StaticNavTabs';
import ReactDOM from 'react-dom';
import styles from './JoinStep2.style';
import ReCAPTCHA from "react-google-recaptcha";
import { googleRecaptchaConfig } from 'app/config/project-config';

const { string, func } = PropTypes;

let inputs = {};
@withTranslation()
class JoinStep2 extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
  };

  static defaultProps = {
    change: noop,
  };

  maxLength = (max, fieldName) => (value, previousValue, allValues) => {
    let v;
    let result = value.length > max;
    if(result === false) {
      if(!(value && /[^a-zA-Z0-9 ]/i.test(value))){
        v = value;
        this.handleFieldChange({
          field: fieldName,
          value: v,
        });
      }
    }      
    return v;
  };

  handleLiscenceText1=(text)=>{
    if(text.length==5)
      ReactDOM.findDOMNode(inputs['codeB']).focus();
  }

    
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
      isAstronomyClub:
        window.localStorage.getItem('isAstronomyClub') === 'true',
      isAgeRestricted: true,
      googleProfileData: {
        googleProfileId: '',
        googleProfileEmail: '',
        googleProfileGivenName: '',
        googleProfileFamilyName: '',
        googleProfilePictureURL: '',
      },
      formIsComplete: null,
      captchaCode: null,
      captchaVerified: false,      
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
        is13YearsAndOlder: {
          label: '',
          visible: true,
          value: null,
          hintText: '',
          errorText: '',
        },
        not13YearsOldLegalGuardianOk: {
          label: '',
          visible: true,
          value: false,
          hintText: '',
          errorText: '',
        },

        parentEmailAddress: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        discussionGroupCode:{
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        codeA: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        codeB: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },        
      },
    };
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = result => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);

    newAccountFormData.givenName.label = result.formFieldLabels.firstName.label;
    newAccountFormData.familyName.label = result.formFieldLabels.lastName.label;
    newAccountFormData.displayName.label =
      result.formFieldLabels.displayName.label;
    newAccountFormData.loginEmailAddress.label =
      result.formFieldLabels.loginEmailAddress.label;
    newAccountFormData.loginEmailAddressVerification.label =
      result.formFieldLabels.loginEmailAddressVerification.label;
    newAccountFormData.password.label = result.formFieldLabels.password.label;
    newAccountFormData.passwordVerification.label =
      result.formFieldLabels.passwordverification.label;
    newAccountFormData.discussionGroupCode.label =
      result.formFieldLabels.discussionGroupCode.label;
    newAccountFormData.is13YearsAndOlder.label =
      result.formFieldLabels.is13YearsAndOlder.label;
    newAccountFormData.not13YearsOldLegalGuardianOk.label =
      result.formFieldLabels.not13YearsOldLegalGuardianOk.label;
    newAccountFormData.parentEmailAddress.label =
      result.formFieldLabels.parentEmailAddress.label;
      
    newAccountFormData.givenName.hintText =
      result.formFieldLabels.firstName.hintText;
    newAccountFormData.familyName.hintText =
      result.formFieldLabels.lastName.hintText;
    newAccountFormData.displayName.hintText =
      result.formFieldLabels.displayName.hintText;
    newAccountFormData.loginEmailAddress.hintText =
      result.formFieldLabels.loginEmailAddress.hintText;
    newAccountFormData.loginEmailAddressVerification.hintText =
      result.formFieldLabels.loginEmailAddressVerification.hintText;
    newAccountFormData.password.hintText =
      result.formFieldLabels.password.hintText;
    newAccountFormData.passwordVerification.hintText =
      result.formFieldLabels.passwordverification.hintText;
    newAccountFormData.discussionGroupCode.hintText =
      result.formFieldLabels.discussionGroupCode.hintText;
    newAccountFormData.is13YearsAndOlder.hintText =
      result.formFieldLabels.is13YearsAndOlder.hintText;
    newAccountFormData.not13YearsOldLegalGuardianOk.hintText =
      result.formFieldLabels.not13YearsOldLegalGuardianOk.hintText;
    newAccountFormData.parentEmailAddress.hintText =
      result.formFieldLabels.parentEmailAddress.hintText;

    newAccountFormData.codeA.value =
      result.formFieldLabels.discussionGroupCodeA.currentValue;
    newAccountFormData.codeB.value =
      result.formFieldLabels.discussionGroupCodeB.currentValue;

      this.props.change('codeA',result.formFieldLabels.discussionGroupCodeA.currentValue);
      this.props.change('codeB',result.formFieldLabels.discussionGroupCodeB.currentValue);
    /* update the account form details state so the correct hinText will show on each form field */
    
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
      isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
    }));
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    newAccountFormData[field].value = value;

    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  };
    
  handleCaptchaCode=(token)=>{   
    const { _sloohsstkn } = getUserInfo();    
    if(token !==null){
      API.post(VERIFY_CAPTCHA_CODE_URL,
        {
          siteSessionToken: _sloohsstkn,
          recaptchaResponse: token
  
        }).then( response => {            
            const res=response.data;
            if(!res.apiError){
              if(res.status === "success")
                this.setState({captchaVerified: true});
              
            }
            
        });
    }
    else{
      this.setState({captchaVerified: false});
    }
    
  }

  handleClubCode = formValues => {   
    formValues.preventDefault();    
    const{accountFormDetails, captchaVerified} = this.state;
    const{codeA, codeB} = accountFormDetails;
    
    if(!captchaVerified){
        return;
    }

    if(codeA.value !== "" || codeB.value !== "" ){
      API.post(VERIFY_CLUB_CODE_ENDPOINT_URL,
      {
        clubCodeA: codeA.value,
        clubCodeB: codeB.value,
        selectedPlanId: window.localStorage.selectedPlanId,
      }
    ).then(response => {
        const res = response.data;
        if (!res.apiError && res.status !== "failed") {
          window.localStorage.setItem('clubCodeA', codeA.value);
          window.localStorage.setItem('clubCodeB', codeB.value);
          this.handleSubmit(formValues);
        }
        else{
          accountFormDetails.discussionGroupCode.errorText='';
          const accountFormDetailsData = cloneDeep(accountFormDetails);
          accountFormDetailsData.discussionGroupCode.errorText = res.statusMessage;
          this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
        }
      });
    }
    else{
      this.handleSubmit(formValues);      
    }
    
  }

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = formValues => {
    formValues.preventDefault();
    //console.log(this.state.accountFormDetails);

    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const { accountFormDetails, accountCreationType } = this.state;

    const { t } = this.props;

    const accountFormDetailsData = cloneDeep(accountFormDetails);

    /* reset the error conditions */
    accountFormDetailsData.givenName.errorText = '';
    accountFormDetailsData.familyName.errorText = '';
    accountFormDetailsData.loginEmailAddress.errorText = '';
    accountFormDetailsData.loginEmailAddressVerification.errorText = '';
    accountFormDetailsData.password.errorText = '';
    accountFormDetailsData.passwordVerification.errorText = '';
    accountFormDetailsData.discussionGroupCode.errorText = '';
    accountFormDetailsData.is13YearsAndOlder.errorText = '';
    accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = '';
    accountFormDetailsData.parentEmailAddress.errorText = '';

    if (accountCreationType === 'userpass') {
      /* Verify that the user has provided:
            Firstname
            Lastname
            Displayname - optional
            Email address and matches verification email fields
            Password and matches password verification field
        */

      if (accountFormDetailsData.givenName.value === '') {
        accountFormDetailsData.givenName.errorText = t(
          'Ecommerce.FirstNameRequierMessage'
        );
        formIsComplete = false;
      }

      if (accountFormDetailsData.familyName.value === '') {
        accountFormDetailsData.familyName.errorText = t(
          'Ecommerce.LastNameRequierMessage'
        );
        formIsComplete = false;
      }

      if (accountFormDetailsData.loginEmailAddress.value === '') {
        accountFormDetailsData.loginEmailAddress.errorText = t(
          'Ecommerce.EmailRequierMessage'
        );
        formIsComplete = false;
      } else {
        /* verify the email address and the verification email address fields match */
        accountFormDetailsData.loginEmailAddress.errorText = '';
        if (
          accountFormDetailsData.loginEmailAddress.value !==
          accountFormDetailsData.loginEmailAddressVerification.value
        ) {
          accountFormDetailsData.loginEmailAddressVerification.errorText = t(
            'Ecommerce.EmailsDontMatchMessage'
          );
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
        accountFormDetailsData.givenName.errorText = t(
          'Ecommerce.FirstNameRequireMessage'
        );
        formIsComplete = false;
      }

      if (accountFormDetailsData.familyName.value === '') {
        accountFormDetailsData.familyName.errorText = t(
          'Ecommerce.LastNameRequireMessage'
        );
        formIsComplete = false;
      }
    }

    if (this.state.isAgeRestricted === true) {
      /* Make sure that the 13/Older indicator is selected with a value */
      if (accountFormDetailsData.is13YearsAndOlder.value === null) {
        accountFormDetailsData.is13YearsAndOlder.errorText = t(
          'Ecommerce.AgeRequierMessage'
        );
        formIsComplete = false;
      } else if (accountFormDetailsData.is13YearsAndOlder.value === false) {
        //make sure the user has certified that they have their Legal Guardian's permission to sign up.
        if (
          accountFormDetailsData.not13YearsOldLegalGuardianOk.value === false
        ) {
          accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = t(
            'Ecommerce.MinAgeErrorMessage'
          );
          formIsComplete = false;
        }

        //make sure the parent email address field is filled in.
        if (accountFormDetailsData.parentEmailAddress.value === '') {
          accountFormDetailsData.parentEmailAddress.errorText = t(
            'Ecommerce.ParentEmailRequierMessage'
          );
          formIsComplete = false;
        }
      }
    }

    /* a password is assigned to a Google account even though they can sign-in using google, this way they can login without google if needed */
    if (accountFormDetailsData.password.value === '') {
      accountFormDetailsData.password.errorText = t(
        'Ecommerce.PasswordRequierMessage'
      );
      formIsComplete = false;
    } else {
      /* verify the password and the verification password fields match */
      accountFormDetailsData.password.errorText = '';
      if (
        accountFormDetailsData.password.value !==
        accountFormDetailsData.passwordVerification.value
      ) {
        accountFormDetailsData.passwordVerification.errorText = t(
          'Ecommerce.PasswordsDontMatchMessage'
        );
        formIsComplete = false;
      }
    }

    this.setState(() => ({ formIsComplete: formIsComplete }));

    if (formIsComplete === true) {
      /* The form is complete and valid, submit the pending customer request if the Password Enters meets the Slooh Requirements and the Email Address is not already taken in the system */

      /* Last Validation....password and email address validation */
      /* reach out to the Slooh API and verify the user's password and email address is not already taken, etc */

      const customerDetailsMeetsRequirementsResult = API.post(
        VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
        {
          userEnteredPassword: this.state.accountFormDetails.password.value,
          userEnteredLoginEmailAddress: this.state.accountFormDetails
            .loginEmailAddress.value,
            clubCodeA: this.state.accountFormDetails.codeA.value,
            clubCodeB: this.state.accountFormDetails.codeB.value,
          selectedPlanId: window.localStorage.selectedPlanId,
        }
      )
        .then(response => {
          const res = response.data;
          if (res.apiError == false) {
            const validationResults = {
              passwordAcceptable: res.passwordAcceptable,
              passwordNotAcceptedMessage: res.passwordNotAcceptedMessage,
              emailAddressAcceptable: res.emailAddressAcceptable,
              emailAddressNotAcceptedMessage:
                res.emailAddressNotAcceptedMessage,
            };

            if (validationResults.passwordAcceptable === false) {
              /* Password did not meet Slooh requirements, provide the error messaging */
              accountFormDetailsData.password.errorText =
                validationResults.passwordNotAcceptedMessage;

              /* make sure to persist any changes to the account signup form (error messages) */
              this.setState({ accountFormDetails: accountFormDetailsData });

              formIsComplete = false;
            }

            if (validationResults.emailAddressAcceptable === false) {
              /* Email address is already taken or some other validation error occurred. */
              accountFormDetailsData.loginEmailAddress.errorText =
                validationResults.emailAddressNotAcceptedMessage;

              /* make sure to persist any changes to the account signup form (error messages) */
              this.setState({ accountFormDetails: accountFormDetailsData });

              formIsComplete = false;
            }

            if (formIsComplete === true) {
              /* create the pending customer result */
              this.createPendingCustomerRecordAndNextScreen();
            }
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });
    } else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
    }
  };

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
      selectedSchoolId,
      isAgeRestricted: this.state.isAgeRestricted,
    };

    // JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL
    API.post(
      JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL,
      createPendingCustomerData
    )
      .then(response => {
        const res = response.data;
        if (!res.apiError) {
          const pendingCustomerResult = {
            status: res.status,
            customerId: res.customerId,
          };

          if (pendingCustomerResult.status === 'success') {
            window.localStorage.setItem(
              'pending_cid',
              pendingCustomerResult.customerId
            );
            window.localStorage.setItem(
              'username',
              this.state.accountFormDetails.loginEmailAddress.value
            );
            window.localStorage.setItem(
              'password',
              this.state.accountFormDetails.password.value
            );
            // console.log('Proceeding to create the customers pending account');
            browserHistory.push('/join/step3');
          } else {
            /* process / display error to user */
          }
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = googleTokenData => {
    // console.log("Processing Google Signin: " + googleTokenData);

    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    API.post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL, {
      authenticationCode: googleTokenData.code,
    })
      .then(response => {
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
          const accountFormDetailsData = cloneDeep(
            this.state.accountFormDetails
          );
          /* Google Authentication technically does not require a password, but we want the user to use a backup password */
          accountFormDetailsData.password.visible = true;
          accountFormDetailsData.passwordVerification.visible = true;

          /* Set the customer's information that we got from google as a starting place for the user */
          accountFormDetailsData.givenName.value =
            googleProfileResult.googleProfileGivenName;
          this.props.change(
            'givenName',
            googleProfileResult.googleProfileGivenName
          );

          accountFormDetailsData.familyName.value =
            googleProfileResult.googleProfileFamilyName;
          this.props.change(
            'familyName',
            googleProfileResult.googleProfileFamilyName
          );

          /* The primary key for Google Single Sign-in is the user's email address which can't be changed if using Google, update the form on screen accordingly so certain fields are hidden and not editable */
          accountFormDetailsData.loginEmailAddress.errorText =
            ''; /* reset the error text in case the user uses another account after finding out their previous account was already a Slooh customer */
          accountFormDetailsData.loginEmailAddress.editable = false;
          accountFormDetailsData.loginEmailAddress.value =
            googleProfileResult.googleProfileEmail;
          this.props.change(
            'loginEmailAddress',
            googleProfileResult.googleProfileEmail
          );

          /* No need to verify the email address as its Google and it was already provided */
          accountFormDetailsData.loginEmailAddressVerification.visible = false;

          this.setState(() => ({
            accountFormDetails: accountFormDetailsData,
            /* Set the account creation type as Google */
            accountCreationType: 'googleaccount',
          }));

          /* Set the account creation type as Google and the Google Profile Id in browser storage */
          window.localStorage.setItem('accountCreationType', 'googleaccount');
          window.localStorage.setItem(
            'googleProfileId',
            googleProfileResult.googleProfileId
          );
          window.localStorage.setItem(
            'googleProfileEmail',
            googleProfileResult.googleProfileEmail
          );
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  processGoogleFailureResponse = googleMessageData => {
    // console.log(googleMessageData);
  };

  render() {
    const { pathname, t } = this.props;
    const {
      // googleProfileData,
      accountFormDetails,
      accountCreationType,
      isAstronomyClub,
      formIsComplete,
      captchaVerified,
    } = this.state;
    const { _sloohatid } = getUserInfo();
    const selectedPlanId = window.localStorage.getItem('selectedPlanId');
    
    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'setupCredentials',
            selectedPlanId,
            sloohMarketingTrackingId: _sloohatid,
            enableHiddenPlanHashCode: window.localStorage.getItem(
              'enableHiddenPlanHashCode'
            ),
          }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({ fetchingContent, serviceResponse: joinPageRes }) => (
            <Fragment>
              {!fetchingContent && selectedPlanId && (
                <DeviceContext.Consumer>
                  {({ isMobile, isDesktop, isTablet }) => (
                    <Fragment>
                      <JoinHeader
                        mainHeading={joinPageRes.pageHeading1}
                        subHeading={joinPageRes.pageHeading2}
                        activeTab={pathname}
                        tabs={DEFAULT_JOIN_TABS}
                        backgroundImage={
                          isMobile
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Mobile
                            : isDesktop
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Desktop
                            : isTablet
                            ? joinPageRes.selectedSubscriptionPlan
                                ?.planSelectedBackgroundImageUrl_Tablet
                            : ''
                        }
                      />
                      <div className="step-root">
                        <DisplayAtBreakpoint
                          screenMedium
                          screenLarge
                          screenXLarge
                        >
                          <PlanDetailsCard
                            {...joinPageRes.selectedSubscriptionPlan}
                          />
                        </DisplayAtBreakpoint>
                        <div className="inner-container">
                          <div className="section-heading">
                            {joinPageRes.sectionHeading}
                          </div>
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
                            requestBody={{
                              callSource: 'join',
                            }}
                            render={({
                              fetchingContent: fetchingGoogleClient,
                              serviceResponse: googleClientResponse,
                            }) => (
                              <Fragment>
                                {!fetchingGoogleClient && (
                                  <div className="google-login-button">
                                    <GoogleLogin
                                      prompt="select_account"
                                      responseType={
                                        googleClientResponse.googleClientResponseType
                                      }
                                      fetchBasicProfile={
                                        googleClientResponse.googleClientFetchBasicProfile
                                      }
                                      accessType={
                                        googleClientResponse.googleClientAccessType
                                      }
                                      scope={
                                        googleClientResponse.googleClientScope
                                      }
                                      clientId={
                                        googleClientResponse.googleClientID
                                      }
                                      buttonText={
                                        googleClientResponse.loginButtonText
                                      }
                                      onSuccess={
                                        this.processGoogleSuccessResponse
                                      }
                                      onFailure={
                                        this.processGoogleFailureResponse
                                      }
                                    />
                                  </div>
                                )}
                              </Fragment>
                            )}
                          />
                          <form onSubmit={this.handleClubCode}>
                            {this.state.isAgeRestricted && (
                              <div className="form-section">
                                <div>
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.is13YearsAndOlder
                                          .label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.is13YearsAndOlder
                                          .errorText,
                                    }}
                                  />
                                  <br />
                                  <br />
                                  <fieldset>
                                    <label>
                                      <Field
                                        name="13andOlder"
                                        label="Yes"
                                        component="input"
                                        type="radio"
                                        value="13andolder"
                                        onClick={event => {
                                          this.handleFieldChange({
                                            field: 'is13YearsAndOlder',
                                            value: true,
                                          });
                                        }}
                                      />{' '}
                                      {t('Ecommerce.Yes')}
                                    </label>
                                    <span style={{ paddingLeft: '15px' }}>
                                      <label>
                                        <Field
                                          name="13andOlder"
                                          label="No"
                                          component="input"
                                          type="radio"
                                          value="under13"
                                          onClick={event => {
                                            this.handleFieldChange({
                                              field: 'is13YearsAndOlder',
                                              value: false,
                                            });
                                          }}
                                        />
                                        {t('Ecommerce.No')}
                                      </label>
                                    </span>
                                  </fieldset>
                                </div>
                                <br />
                                {accountFormDetails.is13YearsAndOlder.value ===
                                  false && (
                                  <div>
                                    <div className="form-field-container">
                                      <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            accountFormDetails
                                              .not13YearsOldLegalGuardianOk
                                              .label,
                                        }}
                                      />
                                      :
                                      <span
                                        className="form-error"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            accountFormDetails
                                              .not13YearsOldLegalGuardianOk
                                              .errorText,
                                        }}
                                      />
                                    </div>
                                    <Field
                                      name="not13YearsOldLegalGuardianOk"
                                      type="checkbox"
                                      className="form-field"
                                      label={
                                        accountFormDetails
                                          .not13YearsOldLegalGuardianOk.hintText
                                      }
                                      component="input"
                                      value={
                                        accountFormDetails
                                          .not13YearsOldLegalGuardianOk.value
                                      }
                                      onClick={event => {
                                        this.handleFieldChange({
                                          field: 'not13YearsOldLegalGuardianOk',
                                          value: !accountFormDetails
                                            .not13YearsOldLegalGuardianOk.value,
                                        });
                                      }}
                                    />
                                    <br />
                                    <br />
                                    <span
                                      className="form-label"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          accountFormDetails.parentEmailAddress
                                            .label,
                                      }}
                                    />
                                    :
                                    <span
                                      className="form-error"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          accountFormDetails.parentEmailAddress
                                            .errorText,
                                      }}
                                    />
                                    <Field
                                      name="parentEmailAddress"
                                      type="name"
                                      className="form-field"
                                      label={
                                        accountFormDetails.parentEmailAddress
                                          .hintText
                                      }
                                      component={InputField}
                                      onChange={event => {
                                        this.handleFieldChange({
                                          field: 'parentEmailAddress',
                                          value: event.target.value,
                                        });
                                      }}
                                      value={
                                        accountFormDetails.parentEmailAddress
                                          .value
                                      }
                                    />
                                    <br />
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="form-section split">
                              <div className="form-field-container form-field-half">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html: accountFormDetails.givenName.label,
                                  }}
                                />
                                :
                                <span
                                  className="form-error"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      accountFormDetails.givenName.errorText,
                                  }}
                                />
                                <Field
                                  name="givenName"
                                  type="name"
                                  className="form-field"
                                  label={accountFormDetails.givenName.hintText}
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'givenName',
                                      value: event.target.value,
                                    });
                                  }}
                                  value={accountFormDetails.givenName.value}
                                />
                              </div>

                              <div className="form-field-container form-field-half">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html: accountFormDetails.familyName.label,
                                  }}
                                />
                                :
                                <span
                                  className="form-error"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      accountFormDetails.familyName.errorText,
                                  }}
                                />
                                <Field
                                  name="familyName"
                                  type="name"
                                  className="form-field"
                                  label={accountFormDetails.familyName.hintText}
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'familyName',
                                      value: event.target.value,
                                    });
                                  }}
                                  value={accountFormDetails.familyName.value}
                                />
                              </div>
                            </div>

                            <div className="form-section">
                              <div className="form-field-container">
                                <span
                                  className="form-label"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      accountFormDetails.displayName.label,
                                  }}
                                />
                                :
                              </div>
                              <Field
                                name="displayName"
                                type="name"
                                className="form-field"
                                label={accountFormDetails.displayName.hintText}
                                component={InputField}
                                onChange={event => {
                                  this.handleFieldChange({
                                    field: 'displayName',
                                    value: event.target.value,
                                  });
                                }}
                              />
                            </div>

                            {accountCreationType === 'userpass' ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.loginEmailAddress
                                          .label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.loginEmailAddress
                                          .errorText,
                                    }}
                                  />
                                </div>
                                <Field
                                  name="loginEmailAddress"
                                  type="email"
                                  className="form-field"
                                  label={
                                    accountFormDetails.loginEmailAddress
                                      .hintText
                                  }
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'loginEmailAddress',
                                      value: event.target.value,
                                    });
                                  }}
                                  value={
                                    accountFormDetails.loginEmailAddress.value
                                  }
                                />
                              </div>
                            ) : null}

                            {accountCreationType === 'googleaccount' ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.loginEmailAddress
                                          .label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.loginEmailAddress
                                          .errorText,
                                    }}
                                  />
                                </div>
                                <span className="google-field">
                                  {accountFormDetails.loginEmailAddress.value}
                                </span>
                              </div>
                            ) : null}

                            {accountFormDetails.loginEmailAddressVerification
                              .visible ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails
                                          .loginEmailAddressVerification.label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails
                                          .loginEmailAddressVerification
                                          .errorText,
                                    }}
                                  />
                                </div>
                                <Field
                                  name="loginEmailAddressVerification"
                                  type="email"
                                  className="form-field"
                                  label={
                                    joinPageRes.formFieldLabels
                                      .loginemailaddressverification.hintText
                                  }
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'loginEmailAddressVerification',
                                      value: event.target.value,
                                    });
                                  }}
                                  value={
                                    accountFormDetails
                                      .loginEmailAddressVerification.value
                                  }
                                />
                              </div>
                            ) : null}

                            {accountFormDetails.password.visible ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html: accountFormDetails.password.label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.password.errorText,
                                    }}
                                  />
                                </div>
                                <Field
                                  name="password"
                                  type="password"
                                  className="form-field"
                                  label={accountFormDetails.password.hintText}
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'password',
                                      value: event.target.value,
                                    });
                                  }}
                                />
                              </div>
                            ) : null}

                            {accountFormDetails.passwordVerification.visible ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        joinPageRes.formFieldLabels
                                          .passwordverification.label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.passwordVerification
                                          .errorText,
                                    }}
                                  />
                                </div>
                                <Field
                                  name="passwordVerification"
                                  type="password"
                                  className="form-field"
                                  label={
                                    accountFormDetails.passwordVerification
                                      .hintText
                                  }
                                  component={InputField}
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'passwordVerification',
                                      value: event.target.value,
                                    });
                                  }}
                                />
                              </div>
                            ) : null}

                            {accountFormDetails.codeA.visible ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        joinPageRes.formFieldLabels
                                          .discussionGroupCode.label,
                                    }}
                                  />
                                  : {joinPageRes.formFieldLabels.discussionGroupCode.hintText}
                                  {/* <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.discussionGroupCode
                                          .errorText,
                                    }}
                                  /> */}
                                </div>
                                <div className="flex-container">
                                  <div className="form-field-quater">
                                    <Field
                                      ref={input => { inputs['codeA'] = input }}
                                      name="codeA"
                                      type="text"
                                      className="form-field"
                                      disabled={joinPageRes.formFieldLabels.discussionGroupCodeA.currentValue && joinPageRes.formFieldLabels.discussionGroupCodeA.currentValue !== ""}
                                      label={''
                                        // accountFormDetails.discussionGroupCode
                                        //   .hintText
                                      }
                                      component={InputField}
                                      onChange={event => {this.handleLiscenceText1(event.target.value);}}
                                      normalize={this.maxLength(5,'codeA')}
                                    />
                                    </div>
                                    <h1>-</h1>
                                    <div className="form-field-quater">
                                    <Field
                                      name="codeB"
                                      type="text"
                                      className="form-field"                                      
                                      disabled={joinPageRes.formFieldLabels.discussionGroupCodeB.currentValue && joinPageRes.formFieldLabels.discussionGroupCodeB.currentValue !== ""}                              // input={{disabled:  accountFormDetails.codeB.value && accountFormDetails.codeB.value !== ""}}
                                      label={''
                                        // accountFormDetails.discussionGroupCode
                                        //   .hintText
                                      }
                                      component={InputField}
                                      onChange={event => {
                                        this.handleFieldChange({
                                          field: 'codeB',
                                          value: event.target.value,
                                        });}}
                                      normalize={this.maxLength(5, 'codeB')}
                                      ref={input => { inputs['codeB'] = input }}
                                    />
                                  </div>
                                </div>
                                <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.discussionGroupCode
                                          .errorText,
                                    }}
                                  />
                              </div>
                            ) : null}
                            <div className="form-section">
                                <div className="form-field-container">
                                <ReCAPTCHA
                                  sitekey={googleRecaptchaConfig.CAPTCHA_KEY_V2}
                                  onChange={this.handleCaptchaCode}
                                />
                                 
                                </div>
                              </div>

                            <div className="button-container">
                              <Button
                                type="button"
                                text="Go Back"
                                onClickEvent={() => {
                                  browserHistory.push('/join/step1');
                                }}
                              />
			                      {formIsComplete === false && <span style={{color: "red", fontWeight: "bold"}}>Please complete the missing fields above.</span>}
                              <button className={"submit-button " + (!captchaVerified ? "disabled" : "")} type="submit" disabled={!captchaVerified}>
                                {t('Ecommerce.GoToPayment')}
                              </button>			  
                            </div>
                          </form>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </DeviceContext.Consumer>
              )}
            </Fragment>
          )}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'joinAccountForm',
    validate: joinStep2Validation,
    enableReinitialize: true,
  })(JoinStep2)
);
