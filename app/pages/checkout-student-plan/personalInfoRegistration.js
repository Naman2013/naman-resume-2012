import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';
import { GOOGLE_CLIENT_ID_ENDPOINT_URL, GOOGLE_SSO_SIGNIN_ENDPOINT_URL, VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL, VERIFY_CAPTCHA_CODE_URL, JOIN_PAGE_ENDPOINT_URL, JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { GoogleLogin } from 'react-google-login';
import { API } from 'app/api';
import ReCAPTCHA from "react-google-recaptcha";
import { googleRecaptchaConfig } from 'app/config/project-config';
import { getUserInfo } from 'app/modules/User';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { withTranslation } from 'react-i18next';



@withTranslation()

class personalInfoRegistration extends Component {

    constructor(props) {
        super(props);

        window.localStorage.setItem('accountCreationType', 'userpass');

        this.state = {
            accountCreationType: 'userpass',
            isAgeRestricted: true,
            captchaVerified: false,
            googleProfileData: {
                googleProfileId: '',
                googleProfileEmail: '',
                googleProfileGivenName: '',
                googleProfileFamilyName: '',
                googleProfilePictureURL: '',
            },
            accountFormDetails: {


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
                school: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
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
                password: {
                    label: '',
                    visible: true,
                    value: '',
                    hintText: '',
                    errorText: '',
                },

            }

        }
    }
    handleLanguage = (langValue) => {

        this.setState({ language: langValue });
    }

    handleCaptchaCode = (token) => {
        const { _sloohsstkn } = getUserInfo();
        if (token !== null) {
            API.post(VERIFY_CAPTCHA_CODE_URL,
                {
                    siteSessionToken: _sloohsstkn,
                    recaptchaResponse: token

                }).then(response => {
                    const res = response.data;
                    if (!res.apiError) {
                        if (res.status === "success")
                            this.setState({ captchaVerified: true });

                    }

                });
        }
        else {
            this.setState({ captchaVerified: false });
        }

    }


    /* This function handles a field change in the form and sets the state accordingly */
    handleFieldChange = ({ field, value }) => {

        /* Get the existing state of the signup form, modify it and re-set the state */
        const newAccountFormData = cloneDeep(this.state.accountFormDetails);

        newAccountFormData[field].value = value;

        this.setState(() => ({
            accountFormDetails: newAccountFormData,
        }));
    };

    handleSubmit = formValues => {
        formValues.preventDefault();

        const { accountFormDetails, accountCreationType, captchaVerified } = this.state;
        const { t } = this.props;
        // console.log('accountCreationType', accountCreationType);

        if (!captchaVerified) {
            return;
        }

        //assume the form is ready to submit unless validation issues occur.
        let formIsComplete = true;

        const accountFormDetailsData = cloneDeep(accountFormDetails);

        /* reset the error conditions */

        accountFormDetailsData.givenName.errorText = '';
        accountFormDetailsData.familyName.errorText = '';
        accountFormDetailsData.displayName.errorText = '';
        accountFormDetailsData.loginEmailAddress.errorText = '';
        accountFormDetailsData.school.errorText
        accountFormDetailsData.password.errorText = '';

        accountFormDetailsData.is13YearsAndOlder.errorText = '';
        accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = '';
        accountFormDetailsData.parentEmailAddress.errorText = '';

        if (accountCreationType === 'userpass') {

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
                /*  accountFormDetailsData.loginEmailAddress.errorText = '';
                 if (
                     accountFormDetailsData.loginEmailAddress.value !==
                     accountFormDetailsData.loginEmailAddressVerification.value
                 ) {
                     accountFormDetailsData.loginEmailAddressVerification.errorText = t(
                         'Ecommerce.EmailsDontMatchMessage'
                     );
                     formIsComplete = false;
                 } */
            }
            /* if (accountFormDetailsData.school.value === '') {
                accountFormDetailsData.school.errorText =
                    'Please enter in your  school name';
                formIsComplete = false;
            } */

            if (accountFormDetailsData.password.value === '') {
                accountFormDetailsData.password.errorText =
                    'Please enter in a password.';
                formIsComplete = false;
            }

        }
        else if (accountCreationType === 'googleaccount') {
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
            /* accountFormDetailsData.password.errorText = '';
            if (
                accountFormDetailsData.password.value !==
                accountFormDetailsData.passwordVerification.value
            ) {
                accountFormDetailsData.passwordVerification.errorText = t(
                    'Ecommerce.PasswordsDontMatchMessage'
                );
                formIsComplete = false;
            } */
        }

        this.setState(() => ({ formIsComplete: formIsComplete }));

        if (formIsComplete === true) {

            const customerDetailsMeetsRequirementsResult = API.post(
                VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
                {
                    userEnteredPassword: this.state.accountFormDetails.password.value,
                    userEnteredLoginEmailAddress: this.state.accountFormDetails
                        .loginEmailAddress.value,
                    //clubCodeA: this.state.accountFormDetails.codeA.value,
                    //clubCodeB: this.state.accountFormDetails.codeB.value,
                    conditionType: getUserInfo()._sloohatid ? 'join' : 'joinByGuestLanding',
                    selectedPlanId: window.localStorage.selectedPlanId,
                    sloohMarketingTrackingId: getUserInfo()._sloohatid,
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
                        } else {
                            accountFormDetailsData.loginEmailAddress.errorText =
                                validationResults.emailAddressNotAcceptedMessage;
                            this.setState({ accountFormDetails: accountFormDetailsData });
                            formIsComplete = true;

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

    }

    createPendingCustomerRecordAndNextScreen = () => {
        const { accountFormDetails, } = this.state;


        const selectedSchoolId = window.localStorage.getItem('selectedSchoolId');
        const accountFormDetailsData = cloneDeep(accountFormDetails);

        let createPendingCustomerData = {
            accountCreationType: this.state.accountCreationType,
            selectedPlanId: window.localStorage.selectedPlanId,
            googleProfileId: this.state.googleProfileData.googleProfileId,
            accountFormDetails: this.state.accountFormDetails,
            selectedSchoolId,
            conditionType: getUserInfo()._sloohatid ? 'join' : 'joinByGuestLanding',
            isAgeRestricted: this.state.isAgeRestricted,
            sloohMarketingTrackingId: getUserInfo()._sloohatid,
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
                        message: res.message,
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

                        /*  this.setState( () =>({
                             accoridianActiveKey:"1"
                         })) */

                        const { onStepOneComplete } = this.props;

                        onStepOneComplete("1");
                        //  .log('Proceeding to create the customers pending account');
                        // browserHistory.push('/join/step3');
                    } else {
                        accountFormDetailsData.loginEmailAddress.errorText =
                            pendingCustomerResult.message;

                        this.setState(() => ({ accountFormDetails: accountFormDetailsData }));

                    }
                }
            })
            .catch(err => {
                throw ('Error: ', err);
            });
    }


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
                    //  accountFormDetailsData.passwordVerification.visible = true;

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
                   // accountFormDetailsData.loginEmailAddressVerification.visible = false;

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

    };

    handleJoinPageServiceResponse = result => {
        // console.log('result', result)
        const newAccountFormData = cloneDeep(this.state.accountFormDetails);


        newAccountFormData.givenName.label = result.formFieldLabels.firstname.label;
        newAccountFormData.familyName.label = result.formFieldLabels.lastname.label;
        newAccountFormData.displayName.label =
            result.formFieldLabels.displayname.label;
        newAccountFormData.loginEmailAddress.label =
            result.formFieldLabels.loginemailaddress.label;
        /*  newAccountFormData.loginEmailAddressVerification.label =
             result.formFieldLabels.loginemailaddressverification.label; */
        newAccountFormData.password.label = result.formFieldLabels.password.label;
        /*  newAccountFormData.passwordVerification.label =
             result.formFieldLabels.passwordverification.label; */
        /*  newAccountFormData.discussionGroupCode.label =
             result.formFieldLabels.discussionGroupCode.label; */
        newAccountFormData.is13YearsAndOlder.label =
            result.formFieldLabels.is13YearsAndOlder.label;
        newAccountFormData.not13YearsOldLegalGuardianOk.label =
            result.formFieldLabels.not13YearsOldLegalGuardianOk.label;
        newAccountFormData.parentEmailAddress.label =
            result.formFieldLabels.parentEmailAddress.label;




        newAccountFormData.givenName.hintText =
            result.formFieldLabels.firstname.hintText;
        newAccountFormData.familyName.hintText =
            result.formFieldLabels.lastname.hintText;
        newAccountFormData.displayName.hintText =
            result.formFieldLabels.displayname.hintText;
        newAccountFormData.loginEmailAddress.hintText =
            result.formFieldLabels.loginemailaddress.hintText;
        /*         newAccountFormData.loginEmailAddressVerification.hintText =
                    result.formFieldLabels.loginemailaddressverification.hintText; */
        newAccountFormData.password.hintText =
            result.formFieldLabels.password.hintText;
        /* newAccountFormData.passwordVerification.hintText =
            result.formFieldLabels.passwordverification.hintText; */
        /* newAccountFormData.discussionGroupCode.hintText =
            result.formFieldLabels.discussionGroupCode.hintText; */
        newAccountFormData.is13YearsAndOlder.hintText =
            result.formFieldLabels.is13YearsAndOlder.hintText;
        newAccountFormData.not13YearsOldLegalGuardianOk.hintText =
            result.formFieldLabels.not13YearsOldLegalGuardianOk.hintText;
        newAccountFormData.parentEmailAddress.hintText =
            result.formFieldLabels.parentEmailAddress.hintText;


        this.setState(() => ({
            accountFormDetails: newAccountFormData,
            //isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
        }));
    }


    render() {
        const { pathname, t } = this.props;

        const {
            accountFormDetails,
            captchaVerified,
            accountCreationType

        } = this.state;
        console.log('accountFormDetails',accountFormDetails);
        const selectedPlanId = window.localStorage.getItem('selectedPlanId');
        const { _sloohatid } = getUserInfo();
        
        return (
            <div>
                <Request
                    serviceURL={JOIN_PAGE_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'setupCredentials',
                        selectedPlanId,
                        sloohMarketingTrackingId: _sloohatid,
                        conditionType: 'joinbyguestlanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => (

                        <Fragment>
                            <DeviceContext.Consumer>
                                {({ isMobile, isDesktop, isTablet }) => (
                                    <Fragment>
                                        <div className="inner-container">
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
                                                                    onSuccess={this.processGoogleSuccessResponse
                                                                    }
                                                                    onFailure={this.processGoogleFailureResponse
                                                                    }
                                                                />

                                                            </div>
                                                        )}
                                                    </Fragment>
                                                )}
                                            />

                                            <form onSubmit={this.handleSubmit}>

                                                {this.state.isAgeRestricted && (
                                                    <div className="form-section mt-3">
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
                                                                <label className="ageGroupStyle">
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
                                                                    <label className="ageGroupStyle">
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

                                                {/*  <div className="form-section">
                                                    <div className="form-field-container">
                                                        <span
                                                            className="form-label"
                                                            dangerouslySetInnerHTML={{
                                                                __html: 'School',
                                                            }}
                                                        />
                                                        :
                                                        <span
                                                            className="form-error"
                                                            dangerouslySetInnerHTML={{
                                                                __html: accountFormDetails.school.errorText,

                                                            }}
                                                        />
                                                    </div>
                                                    <Field
                                                        name="SchoolName"
                                                        type="name"
                                                        className="form-field"
                                                        //label={accountFormDetails.password.hintText}
                                                        component={InputField}
                                                        onChange={event => {
                                                            this.handleFieldChange({
                                                                field: 'school',
                                                                value: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                </div> */}


                                                <div className="form-section split">
                                                    <div className='formSectionName'>

                                                        <div className="form-field-container form-field-half">

                                                            <div className="form-field-container">
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
                                                                        __html: accountFormDetails.givenName.errorText,

                                                                    }}
                                                                />
                                                            </div>
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
                                                            <div className="form-field-container">
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
                                                                        __html: accountFormDetails.familyName.errorText,

                                                                    }}
                                                                />
                                                            </div>
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
                                                                    __html: accountFormDetails.displayName.label,

                                                                }}
                                                            />
                                                            :
                                                            <span
                                                                className="form-error"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: accountFormDetails.displayName.errorText,

                                                                }}
                                                            />
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
                                                                    value: event.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="form-section mb-4">
                                                        <div className="form-field-container">
                                                            <ReCAPTCHA
                                                                sitekey={googleRecaptchaConfig.CAPTCHA_KEY_V2}
                                                                onChange={this.handleCaptchaCode}
                                                            />

                                                        </div>
                                                    </div>
                                                    <button className={"submit-button " + (!captchaVerified ? "disabled" : "")} type="submit" disabled={!captchaVerified}>
                                                        CONTINUE
                                                     </button>
                                                </div>

                                            </form>

                                        </div>
                                    </Fragment>
                                )}
                            </DeviceContext.Consumer>


                        </Fragment>


                    )}
                />

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
            //resetLogIn,
            // logUserIn,
            //logGoogleUserIn,
        },
        dispatch
    ),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    reduxForm({ form: 'joinAccountForm', enableReinitialize: true })(
        personalInfoRegistration
    )
);

