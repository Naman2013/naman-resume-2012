/** **********************************************************************************
 * V4 Join by Invite - Account signup form for Email Step 1 and Join by Code Step 2
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { API } from 'app/api';
import has from 'lodash/has';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import JoinHeader from '../partials/JoinHeader';
import PlanDetailsCard from '../partials/PlanDetailsCard';
import {
  resetLogIn,
  logUserIn,
  logGoogleUserIn,
} from 'app/modules/login/actions';

import {
  JOIN_PAGE_ENDPOINT_URL,
  JOIN_CREATE_INVITED_CUSTOMER_ENDPOINT_URL,
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
  CHECK_ACTIVE_GIFT_CARD_SUBSCRIPTION
} from 'app/services/registration/registration.js';
import styles from '../JoinStep2.style';



const { string, func } = PropTypes;

class JoinByInviteAccountSignup extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
    actions: PropTypes.shape({
      logUserIn: PropTypes.func.isRequired,
      resetLogIn: PropTypes.func.isRequired,
      logGoogleUserIn: PropTypes.func.isRequired,
    }).isRequired,
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
      isClassroom: false,
      selectedSchoolId: '',
      selectedPlanId: '',
      googleProfileData: {
        googleProfileId: '',
        googleProfileEmail: '',
        googleProfileGivenName: '',
        googleProfileFamilyName: '',
        googleProfilePictureURL: '',
      },
      inviteDetails: {
        parentCustomerId: '',
        parentCustomerRole: '',
        childCustomerRole: '',
      },
      accountFormDetails: {
        is13YearsAndOlder: {
          label: '',
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        parentEmailAddress: {
          label: '',
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        not13YearsOldLegalGuardianOk: {
          label: '',
          currentValue: false,
          hintText: '',
          errorText: '',
        },
        firstName: {
          label: '',
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        lastName: {
          label: '',
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        displayName: {
          label: '',
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        loginEmailAddress: {
          label: '',
          editable: true,
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        password: {
          label: '',
          visible: true,
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        passwordVerification: {
          label: '',
          visible: true,
          currentValue: '',
          hintText: '',
          errorText: '',
        },
        astronomyClubName: {
          label: '',
          visible: true,
          currentValue: '',
          hintText: '',
          errorText: '',
        },
      },
    };
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLogIn();
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = result => {
    const newInviteDetails = cloneDeep(this.state.inviteDetails);
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    const { clubInviteAndGiftCardDetials } = this.props;
    
   /*  result.formFieldLabels.map((formFieldData) => {
      let keyValue = formFieldData.key;
      if (newAccountFormData[keyValue]) {

        newAccountFormData[keyValue].label = formFieldData.label;

        newAccountFormData[keyValue].hintText = formFieldData.hintText;

      }

    }) */


    result.formFieldLabels.map((field) => {

      var keyval = field.key;
      if (newAccountFormData[keyval]) {

        newAccountFormData[keyval].hintText = field.hintText;
        newAccountFormData[keyval].label = field.label;

        newAccountFormData[keyval].currentValue = field.currentValue;
        newAccountFormData[keyval].required = field.required;

        if (field.fieldOptions) {

          field.fieldOptions.map((fieldOptionData) => {

            if (fieldOptionData.key == 'Under13') {

              fieldOptionData.nestedFields.map((nestedFieldsData) => {


                let keyValueOfNested = nestedFieldsData.key;
                newAccountFormData[keyValueOfNested].label = nestedFieldsData.label;
                newAccountFormData[keyValueOfNested].hintText = nestedFieldsData.hintText;
                newAccountFormData[keyValueOfNested].required = nestedFieldsData.required;
                newAccountFormData[keyValueOfNested].currentValue = nestedFieldsData.currentValue;


              })

            } else {

            }

          })
        }

      }
    })

    /*  newAccountFormData.givenName.label = result.formFieldLabels.firstName.label;
     newAccountFormData.familyName.label = result.formFieldLabels.lastName.label;
     newAccountFormData.displayName.label =
       result.formFieldLabels.displayName.label;
 
     newAccountFormData.loginEmailAddress.label =
       result.formFieldLabels.loginEmailAddress.label;
 
     newAccountFormData.password.label = result.formFieldLabels.password.label;
     newAccountFormData.passwordVerification.label =
       result.formFieldLabels.passwordverification.label;
     newAccountFormData.astronomyClubName.label =
       result.formFieldLabels.astronomyClubName.label;
 
     newAccountFormData.givenName.hintText =
       result.formFieldLabels.firstName.hintText;
     newAccountFormData.familyName.hintText =
       result.formFieldLabels.lastName.hintText;
     newAccountFormData.displayName.hintText =
       result.formFieldLabels.displayName.hintText;
     newAccountFormData.loginEmailAddress.hintText =
       result.formFieldLabels.loginEmailaddress.hintText;
     newAccountFormData.password.hintText =
       result.formFieldLabels.password.hintText;
     newAccountFormData.passwordVerification.hintText =
       result.formFieldLabels.passwordverification.hintText;
     newAccountFormData.astronomyClubName.hintText =
       result.formFieldLabels.astronomyClubName.hintText; */


   /*  if (clubInviteAndGiftCardDetials === 'SloohCard') {
      newAccountFormData.AgeGroup.label =
        result.formFieldLabels.AgeGroupUnderandOlderLabel.label;

      newAccountFormData.not13YearsOldLegalGuardianOk.label =
        result.formFieldLabels.AgeGroupCertifyCheckBoxLabel.label;

      newAccountFormData.ParentEmail.label =
        result.formFieldLabels.AgeGroupParentEmailLabel.label;
    } */


    if (clubInviteAndGiftCardDetials === 'SloohCard') {

    }else{ 

      newAccountFormData.firstName.currentValue = result.invitee.firstName;
      this.props.change('firstName', result.invitee.firstName);
  
      newAccountFormData.lastName.currentValue = result.invitee.lastName;
      this.props.change('lastName', result.invitee.lastName);
  
      newAccountFormData.loginEmailAddress.currentValue = result.invitee.emailAddress;
  
      newInviteDetails.parentCustomerId = result.invitedBy.customerId;
      newInviteDetails.parentCustomerRole = result.invitedBy.role;
      newInviteDetails.childCustomerRole = result.invitee.role;

    }





    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
      inviteDetails: newInviteDetails,
      /* was the selected plan a classroom? */
      isAstronomyClub: has(result, 'selectedSubscriptionPlan')
        ? result.selectedSubscriptionPlan.isAstronomyClub
        : false,
      isClassroom: has(result, 'selectedSubscriptionPlan')
        ? result.selectedSubscriptionPlan.isClassroom
        : false,
      selectedSchoolId: has(result, 'selectedSchool')
        ? result.selectedSchool.schoolId
        : null,
      selectedPlanId: has(result, 'selectedSubscriptionPlan')
        ? result.selectedSubscriptionPlan.planId
        : null,
    }));
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, currentValue }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    if (field === 'not13YearsOldLegalGuardianOk') {
      newAccountFormData[field].currentValue = !newAccountFormData[field].currentValue;
    } else {
      newAccountFormData[field].currentValue = currentValue;
    }

    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  };

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = formValues => {
    formValues.preventDefault();

    const { clubInviteAndGiftCardDetials, joinByInviteParams, AccountType } = this.props;
    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const { accountFormDetails, accountCreationType } = this.state;

    const accountFormDetailsData = cloneDeep(accountFormDetails);
    
    /* reset the error conditions */
    accountFormDetailsData.firstName.errorText = '';
    accountFormDetailsData.lastName.errorText = '';
    accountFormDetailsData.loginEmailAddress.errorText = '';
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

      if (accountFormDetailsData.firstName.currentValue === '') {
        accountFormDetailsData.firstName.errorText =
          'Please enter in your first name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.lastName.currentValue === '') {
        accountFormDetailsData.lastName.errorText =
          'Please enter in your last name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.loginEmailAddress.currentValue === '') {
        accountFormDetailsData.loginEmailAddress.errorText =
          'Please enter in your email address.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.password.currentValue === '') {
        accountFormDetailsData.password.errorText =
          'Please enter in a password.';
        formIsComplete = false;
      } else {
        /* verify the password and the verification password fields match */
        /*  accountFormDetailsData.password.errorText = '';
         if (
           accountFormDetailsData.password.value !==
           accountFormDetailsData.passwordVerification.value
         ) {
           accountFormDetailsData.passwordVerification.errorText =
             'Your password and the password you entered into the verification field must match.';
           formIsComplete = false;
         } */
      }
      //AgeGroup Validation
      if (clubInviteAndGiftCardDetials === 'SloohCard') {
        

        if (accountFormDetailsData.is13YearsAndOlder.currentValue === '') {
          accountFormDetailsData.is13YearsAndOlder.errorText =
            'You must certify that you are 13 years or older.';
          formIsComplete = false;
        } else {
          accountFormDetailsData.is13YearsAndOlder.errorText = '';
          formIsComplete = true;
        }
        if (accountFormDetailsData.is13YearsAndOlder.currentValue === false) {

          if (accountFormDetailsData.is13YearsAndOlder.currentValue === false && accountFormDetailsData.not13YearsOldLegalGuardianOk.currentValue === false && accountFormDetailsData.parentEmailAddress.currentValue === '') {
            accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText =
              'You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.';
            accountFormDetailsData.parentEmailAddress.errorText =
              'You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.';
            formIsComplete = false;
          }

          if (accountFormDetailsData.is13YearsAndOlder.currentValue === false && accountFormDetailsData.not13YearsOldLegalGuardianOk.currentValue === true) {
            accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = "";
            accountFormDetailsData.parentEmailAddress.errorText = "You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.";
            formIsComplete = false;
          }

          if (accountFormDetailsData.not13YearsOldLegalGuardianOk.currentValue === false && accountFormDetailsData.parentEmailAddress.currentValue) {
            accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = "You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.";
            accountFormDetailsData.parentEmailAddress.errorText = "";
            formIsComplete = false;
          }

          if (accountFormDetailsData.not13YearsOldLegalGuardianOk.currentValue === true && accountFormDetailsData.parentEmailAddress.currentValue) {
            accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = "";
            accountFormDetailsData.parentEmailAddress.errorText = "";
            formIsComplete = true;
          }

        }


      }

      /* need to verify that the password meets the Slooh requirements */
    } else if (accountCreationType === 'googleaccount') {
      /* Verify that the user has provided:
        Firstname
        Lastname
      */

      if (accountFormDetailsData.firstName.currentValue === '') {
        accountFormDetailsData.firstName.errorText =
          'Please enter in your first name.';
        formIsComplete = false;
      }

      if (accountFormDetailsData.lastName.currentValue === '') {
        accountFormDetailsData.lastName.errorText =
          'Please enter in your last name.';
        formIsComplete = false;
      }
    }
    

    if (formIsComplete === true) {
      

      /* The form is complete and valid, submit the customer request if the Password Enters meets the Slooh Requirements */

      /* Last Validation....password and email address validation */
      /* reach out to the Slooh API and verify the user's password and email address is not already taken, etc */
      if (clubInviteAndGiftCardDetials === 'SloohCard') {
      

        if (formIsComplete) {

          const { actions } = this.props;
          const customerDetailsMeetsRequirementsResult = API
            .post(CHECK_ACTIVE_GIFT_CARD_SUBSCRIPTION, {
              loginEmailAddress: this.state.accountFormDetails
                .loginEmailAddress.currentValue,
              loginPassword: this.state.accountFormDetails.password.currentValue,
              giftCardCode: joinByInviteParams.invitationCodeAlt,
              accountType: 'Confluence',
              type: clubInviteAndGiftCardDetials,
              selectedPlanId: 14,
              givenName: this.state.accountFormDetails.firstName.currentValue,
              familyName: this.state.accountFormDetails.lastName.currentValue,
              displayName: this.state.accountFormDetails.displayName.currentValue,
              '2018AccountType': AccountType,
              ageGroup: this.state.accountFormDetails.is13YearsAndOlder.currentValue,
              parentEmail: this.state.accountFormDetails.parentEmailAddress.currentValue,


            })
            .then(response => {
              const res = response.data;
              

              formIsComplete === true;
              if (res.apiError == false) {
                const validationResults = {
                  status: res.status,
                  statusMessage: res.statusMessage

                };
                if (validationResults.status === 'failed') {
                  /* Email address is already taken or some other validation error occurred. */
                  accountFormDetailsData.loginEmailAddress.errorText =
                    validationResults.statusMessage;
                  /* make sure to persist any changes to the account signup form (error messages) */
                  this.setState({ accountFormDetails: accountFormDetailsData });
                  formIsComplete = false;
                }
                

                if (formIsComplete === true) {

                  const loginDataPayload = {
                    username: this.state.accountFormDetails.loginEmailAddress.currentValue,
                    pwd: this.state.accountFormDetails.password.currentValue,
                  };
                  

                  actions.logUserIn(loginDataPayload, { reload: false, redirectUrl: '/join/purchaseConfirmation/join' });
                }
              }
            })
            .catch(err => {
              throw ('Error: ', err);
            });
        } else {

          this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
        }


      } else {
       

        const customerDetailsMeetsRequirementsResult = API
          .post(VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL, {
            userEnteredPassword: this.state.accountFormDetails.password.currentValue,
            userEnteredLoginEmailAddress: this.state.accountFormDetails
              .loginEmailAddress.currentValue,
            selectedPlanId: window.localStorage.selectedPlanId,
          })
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
                /* create the customer result */
                this.createCustomerRecordAndNextScreen();
              }
            }
          })
          .catch(err => {
            throw ('Error: ', err);
          });

      }

    } else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
    }
  };

  createCustomerRecordAndNextScreen = () => {

    


    /*
     * Set up a Customer Account
     */

    /* prepare the payload to the Create Customer API call. */
    let createCustomerData = {
      accountCreationType: this.state.accountCreationType,
      selectedPlanId: this.state.selectedPlanId,
      googleProfileId: this.state.googleProfileData.googleProfileId,
      accountFormDetails: this.state.accountFormDetails,
      //selectedSchoolId: this.state.selectedSchoolId,
      isAstronomyClub: this.state.isAstronomyClub,
      isClassroom: this.state.isClassroom,
      inviteDetails: this.state.inviteDetails,
    };

    const accountFormDetailsData = cloneDeep(createCustomerData.accountFormDetails);

    accountFormDetailsData.loginEmailAddress
      .errorText = '';

     

    // JOIN_CREATE_INVITED_CUSTOMER_ENDPOINT_URL
    API
      .post(JOIN_CREATE_INVITED_CUSTOMER_ENDPOINT_URL, createCustomerData)
      .then(response => {
        const res = response.data;
        if (!res.apiError) {
          const { actions } = this.props;
          const createCustomerResult = {
            status: res.status,
            customerId: res.customerId,
            statusMessage: res.statusMessage
          };
          

          if (createCustomerResult.status === 'success') {
            if (this.state.accountCreationType === 'userpass') {
              const loginDataPayload = {
                username: this.state.accountFormDetails.loginEmailAddress.currentValue,
                pwd: this.state.accountFormDetails.password.currentValue,
              };

              /* Log the user in */
             

              actions.logUserIn(loginDataPayload);
              browserHistory.push('/');

            } else if (this.state.accountCreationType === 'googleaccount') {
              const loginDataPayload = {
                googleProfileId: window.localStorage.googleProfileId,
                googleProfileEmail: window.localStorage.username,
              };
              actions.logGoogleUserIn(loginDataPayload);
              browserHistory.push('/');

            }
          } else {
            /* process / display error to user */
            accountFormDetailsData.loginEmailAddress.errorText = createCustomerResult.statusMessage;
            this.setState({ accountFormDetails: accountFormDetailsData });
          }
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  /* The API response to the Google SSO Request was successful, process the response data elements accordingly and send the information back to the Slooh servers */
  processGoogleSuccessResponse = googleTokenData => {


    /* Process the Google SSO tokens and get back information about this user via the Slooh APIs/Google APIs, etc. */
    API
      .post(GOOGLE_SSO_SIGNIN_ENDPOINT_URL, {
        authenticationCode: googleTokenData.code,
      })
      .then(response => {
        const res = response.data;
        if (!res.apiError) {
          const googleProfileResult = {
            googleProfileId: res.googleProfileId,
            googleProfileEmail: res.googleProfileInfo.email,
            googleProfileGivenName: res.googleProfileInfo.givenName,
            googleProfileFamilyName: res.googleProfileInfo.lastName,
            googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
          };

          /* Needed to capture the Google Profile information in our system as the refresh_token is only given one time.
           * MUST validate that the Google Account Email Address matches the invitation */

          if (
            googleProfileResult.googleProfileEmail !=
            this.state.accountFormDetails.loginEmailAddress.currentValue
          ) {
            const accountFormDetailsData = cloneDeep(
              this.state.accountFormDetails
            );
            accountFormDetailsData.loginEmailAddress.errorText =
              'Your Google Account Email Address does not match your Invitation to Join Slooh.  If the email address needs to be updated, please contact the person who created the invitation.';

            this.setState(() => ({
              accountFormDetails: accountFormDetailsData,
            }));
          } else {
            /* Capture the Google Profile Data and store it in state */
            this.setState(() => ({ googleProfileData: googleProfileResult }));

            /* Update the Account Form parameters to show/hide fields as a result of Google Login */
            const accountFormDetailsData = cloneDeep(
              this.state.accountFormDetails
            );
            /* Google Authentication does not require the customer to create a password/hide the form field */
            accountFormDetailsData.password.visible = false;
            accountFormDetailsData.passwordVerification.visible = false;

            /* Set the customer's information that we got from google as a starting place for the user */
            accountFormDetailsData.firstName.currentValue =
              googleProfileResult.googleProfileGivenName;
            this.props.change(
              'firstName',
              googleProfileResult.googleProfileGivenName
            );

            accountFormDetailsData.lastName.currentValue =
              googleProfileResult.googleProfileFamilyName;
            this.props.change(
              'lastName',
              googleProfileResult.googleProfileFamilyName
            );

            /* The primary key for Google Single Sign-in is the user's email address which can't be changed if using Google, update the form on screen accordingly so certain fields are hidden and not editable */
            accountFormDetailsData.loginEmailAddress.editable = false;
            accountFormDetailsData.loginEmailAddress.currentValue =
              googleProfileResult.googleProfileEmail;
            this.props.change(
              'loginEmailAddress',
              googleProfileResult.googleProfileEmail
            );

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
        }
      })
      .catch(err => {
        throw ('Error: ', err);
      });
  };

  processGoogleFailureResponse = googleMessageData => {

  };

  render() {
    const { pathname, navTabs, joinByInviteParams, clubInviteAndGiftCardDetials } = this.props;
    const {
      // googleProfileData,
      accountFormDetails,
      accountCreationType,
      isAstronomyClub,
      isClassroom,
    } = this.state;

    console.log('accountFormDetails', accountFormDetails);
    //console.log('accountFormDetails',accountFormDetails);
    /*   accountFormDetails.loginEmailAddress.currentValue = joinByInviteParams.inviteeEmailAddress; */

    /*  this.setState({
       accountFormDetails:accountFormDetails
     }) */

    const selectedPlanId = this.state.selectedPlanId;

    //for classroom accounts
    const selectedSchoolId = this.state.selectedSchoolId;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ ...joinByInviteParams }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({ fetchingContent, serviceResponse: joinPageRes }) => (
            <Fragment>
              {!fetchingContent && joinPageRes.selectedSubscriptionPlan && (
                <Fragment>
                  <JoinHeader
                    mainHeading={joinPageRes.pageHeading1}
                    subHeading={joinPageRes.pageHeading2}
                    activeTab={pathname}
                    callSource={joinByInviteParams.callSource}
                    tabs={navTabs}
                  />
                  <div className="step-root">
                    <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
                      <PlanDetailsCard
                        {...joinPageRes.selectedSubscriptionPlan}
                      />
                    </DisplayAtBreakpoint>
                    <div className="inner-container">
                      <div className="section-heading">
                        {joinPageRes.sectionHeading}
                      </div>
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
                                  scope={googleClientResponse.googleClientScope}
                                  clientId={googleClientResponse.googleClientID}
                                  buttonText={
                                    googleClientResponse.loginButtonText
                                  }
                                  onSuccess={this.processGoogleSuccessResponse}
                                  onFailure={this.processGoogleFailureResponse}
                                />
                              </div>
                            )}
                          </Fragment>
                        )}
                      />
                      <form onSubmit={this.handleSubmit}>
                        {clubInviteAndGiftCardDetials === 'SloohCard' ?
                          <fieldset>
                            <>
                              <div className="">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html: accountFormDetails.is13YearsAndOlder.label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html: accountFormDetails.is13YearsAndOlder.errorText,
                                    }}
                                  />
                                </div>
                              </div>
                              <br />
                              <label>
                                <Field
                                  name="Age"
                                  component="input"
                                  type="radio"
                                  checked={accountFormDetails.is13YearsAndOlder.currentValue}
                                  //value="13andOlder"
                                  onChange={event => {
                                    this.handleFieldChange({
                                      field: 'is13YearsAndOlder',
                                      currentValue: true,
                                    });
                                  }}
                                />
                                {'\u00A0'}
                                Yes
                              </label>
                              <span style={{ paddingLeft: '15px' }}>
                                <label>
                                  <Field
                                    name="Age"
                                    component="input"
                                    type="radio"
                                    checked={accountFormDetails.is13YearsAndOlder.currentValue !== '' ? !accountFormDetails.is13YearsAndOlder.currentValue : false}
                                    //value="Under13"
                                    onChange={event => {
                                      this.handleFieldChange({
                                        field: 'is13YearsAndOlder',
                                        currentValue:false,
                                      });
                                    }}
                                  />
                                  {'\u00A0'}
                                  No
                                </label>
                              </span>
                              <br />

                              {accountFormDetails.is13YearsAndOlder.currentValue === false ?
                                <>
                                  <div className="">
                                    <div className="form-field-container">
                                      <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                          __html: accountFormDetails.not13YearsOldLegalGuardianOk.label,
                                        }}
                                      />
                                  :
                                  <span
                                        className="form-error"
                                        dangerouslySetInnerHTML={{
                                          __html: accountFormDetails.not13YearsOldLegalGuardianOk.errorText,
                                        }}
                                      />

                                    </div>
                                    <Field
                                      name="not13YearsOldLegalGuardianOk"
                                      component="input"
                                      type="Checkbox"
                                      checked={accountFormDetails.not13YearsOldLegalGuardianOk.value}
                                      onChange={event => {
                                        this.handleFieldChange({
                                          field: 'not13YearsOldLegalGuardianOk',
                                          currentValue: event.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="form-section">
                                    <div className="form-field-container">
                                      <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                          __html: accountFormDetails.parentEmailAddress.label,
                                        }}
                                      />
                                  :
                                  <span
                                        className="form-error"
                                        dangerouslySetInnerHTML={{
                                          __html: accountFormDetails.parentEmailAddress.errorText,
                                        }}
                                      />

                                    </div>
                                    <Field
                                      name="displayEmail"
                                      type="name"
                                      className="form-field"
                                      label={accountFormDetails.parentEmailAddress.currentValue ? accountFormDetails.parentEmailAddress.currentValue : accountFormDetails.parentEmailAddress.hintText}
                                      component={InputField}
                                      onChange={event => {
                                        this.handleFieldChange({
                                          field: 'parentEmailAddress',
                                          currentValue: event.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </>

                                : null

                              }
                            </>
                          </fieldset>


                          : null
                        }


                        {!clubInviteAndGiftCardDetials === 'SloohCard' ?
                          <div className="form-section">
                            <div className="form-field-container invited-by">
                              {<span
                                className="form-label"
                                dangerouslySetInnerHTML={{
                                  __html: joinPageRes.invitedBy.heading,
                                }}
                              />}
                              <span
                                className="form-label inviter"
                                dangerouslySetInnerHTML={{
                                  __html: joinPageRes.invitedBy.displayName,
                                }}
                              />
                            </div>
                          </div>
                          : null
                        }
                        <div className="form-section split">
                          <div className="form-field-container form-field-half">
                            <span
                              className="form-label"
                              dangerouslySetInnerHTML={{
                                __html: accountFormDetails.firstName.label,
                              }}
                            />
                            :
                            <span
                              className="form-error"
                              dangerouslySetInnerHTML={{
                                __html: accountFormDetails.firstName.errorText,
                              }}
                            />
                            <Field
                              name="firstName"
                              type="name"
                              className="form-field"
                              label={accountFormDetails.firstName.hintText}
                              component={InputField}
                              onChange={event => {
                                this.handleFieldChange({
                                  field: 'firstName',
                                  currentValue: event.target.value,
                                });
                              }}
                              value={accountFormDetails.firstName.currentValue}
                            />
                          </div>

                          <div className="form-field-container form-field-half">
                            <span
                              className="form-label"
                              dangerouslySetInnerHTML={{
                                __html: accountFormDetails.lastName.label,
                              }}
                            />
                            :
                            <span
                              className="form-error"
                              dangerouslySetInnerHTML={{
                                __html: accountFormDetails.lastName.errorText,
                              }}
                            />
                            <Field
                              name="lastName"
                              type="name"
                              className="form-field"
                              label={accountFormDetails.lastName.hintText}
                              component={InputField}
                              onChange={event => {
                                this.handleFieldChange({
                                  field: 'lastName',
                                  currentValue: event.target.value,
                                });
                              }}
                              value={accountFormDetails.lastName.currentValue}
                            />
                          </div>
                        </div>
                        <br />
                        <div className="form-section">
                          <div className="form-field-container">
                            <span
                              className="form-label"
                              dangerouslySetInnerHTML={{
                                __html: accountFormDetails.displayName.label,
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
                                currentValue: event.target.value,
                              });
                            }}
                          />
                        </div>

                        <div className="form-section">
                          <div className="form-field-container">
                            <span
                              className="form-label"
                              dangerouslySetInnerHTML={{
                                __html:
                                  accountFormDetails.loginEmailAddress.label,
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
                            {accountFormDetails.loginEmailAddress.currentValue}
                          </span>
                        </div>

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
                                  __html: accountFormDetails.password.errorText,
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
                                  currentValue: event.target.value,
                                });
                              }}
                            />
                          </div>
                        ) : null}

                        {/*   {accountFormDetails.passwordVerification.visible ? (
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
                                accountFormDetails.passwordVerification.hintText
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
                        ) : null} */}
                        <div className="button-container">
                          <Button
                            type="button"
                            text="Go Back"
                            onClickEvent={() => {
                              browserHistory.push('/join/step1');
                            }}
                          />
                          <button className="submit-button" type="submit">
                            Complete Signup
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Fragment>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetLogIn,
      logUserIn,
      logGoogleUserIn,
    },
    dispatch
  ),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: 'joinAccountForm', enableReinitialize: true })(
    JoinByInviteAccountSignup
  )
);
