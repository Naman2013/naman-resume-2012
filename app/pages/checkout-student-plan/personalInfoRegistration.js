import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';
import { GOOGLE_CLIENT_ID_ENDPOINT_URL, VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL, VERIFY_CAPTCHA_CODE_URL, JOIN_PAGE_ENDPOINT_URL, JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { GoogleLogin } from 'react-google-login';
import { API } from 'app/api';
import ReCAPTCHA from "react-google-recaptcha";
import { googleRecaptchaConfig } from 'app/config/project-config';
import { getUserInfo } from 'app/modules/User';
import { DeviceContext } from 'app/providers/DeviceProvider';





class personalInfoRegistration extends Component {

    constructor(props) {
        super(props);


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
                AgeGroup: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
                legalGuardianCheckbox: {
                    label: '',
                    value: false,
                    hintText: '',
                    errorText: '',
                },
                ParentEmail: {
                    label: '',
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
        if (field === 'legalGuardianCheckbox') {
            newAccountFormData[field].value = !newAccountFormData[field].value;
        } else {
            newAccountFormData[field].value = value;
        }
        this.setState(() => ({
            accountFormDetails: newAccountFormData,
        }));
    };

    handleSubmit = formValues => {
        formValues.preventDefault();

        const { accountFormDetails, accountCreationType, captchaVerified } = this.state;
        // console.log('accountCreationType', accountCreationType);

        if (!captchaVerified) {
            return;
        }

        //assume the form is ready to submit unless validation issues occur.
        let formIsComplete = true;

        const accountFormDetailsData = cloneDeep(accountFormDetails);

        /* reset the error conditions */
        accountFormDetailsData.AgeGroup.errorText = '';
        accountFormDetailsData.givenName.errorText = '';
        accountFormDetailsData.familyName.errorText = '';
        accountFormDetailsData.displayName.errorText = '';
        accountFormDetailsData.legalGuardianCheckbox.errorText = '';
        accountFormDetailsData.loginEmailAddress.errorText = '';
        accountFormDetailsData.school.errorText
        accountFormDetailsData.password.errorText = '';

        if (accountCreationType === 'userpass') {

            if (accountFormDetailsData.givenName.value === '') {
                accountFormDetailsData.givenName.errorText =
                    'Please enter in your first name.';
                formIsComplete = false;
            }

            if (accountFormDetailsData.familyName.value === '') {
                accountFormDetailsData.familyName.errorText =
                    'Please enter in your last name.';
                formIsComplete = false;
            }

            if (accountFormDetailsData.loginEmailAddress.value === '') {
                accountFormDetailsData.loginEmailAddress.errorText =
                    'Please enter in your email address.';
                formIsComplete = false;
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

            if (accountFormDetailsData.AgeGroup.value === '') {
                accountFormDetailsData.AgeGroup.errorText =
                    'You must certify that you are 13 years or older.';
                formIsComplete = false;
            }

            if (accountFormDetailsData.AgeGroup.value === 'Under13') {

                if (accountFormDetailsData.AgeGroup.value === 'Under13' && accountFormDetailsData.legalGuardianCheckbox.value === false && accountFormDetailsData.ParentEmail.value === '') {
                    accountFormDetailsData.legalGuardianCheckbox.errorText =
                        'You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.';
                    accountFormDetailsData.ParentEmail.errorText =
                        'You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.';
                    formIsComplete = false;
                }

                if (accountFormDetailsData.AgeGroup.value === 'Under13' && accountFormDetailsData.legalGuardianCheckbox.value === true) {
                    accountFormDetailsData.legalGuardianCheckbox.errorText = "";
                    accountFormDetailsData.ParentEmail.errorText = "You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.";
                    formIsComplete = false;
                }

                if (accountFormDetailsData.legalGuardianCheckbox.value === false && accountFormDetailsData.ParentEmail.value) {
                    accountFormDetailsData.legalGuardianCheckbox.errorText = "You have indicated you are under 13 years old , please certify that your Legal Guardian has signed you up for this service.";
                    accountFormDetailsData.ParentEmail.errorText = "";
                    formIsComplete = false;
                }

                if (accountFormDetailsData.legalGuardianCheckbox.value === true && accountFormDetailsData.ParentEmail.value) {
                    accountFormDetailsData.legalGuardianCheckbox.errorText = "";
                    accountFormDetailsData.ParentEmail.errorText = "";
                    formIsComplete = true;
                }

            }

        } else if (accountCreationType === 'googleaccount') {
            /* Verify that the user has provided:
              Firstname
              Lastname
            */

            if (accountFormDetailsData.givenName.value === '') {
                accountFormDetailsData.givenName.errorText =
                    'Please enter in your first name.';
                formIsComplete = false;
            }

            if (accountFormDetailsData.familyName.value === '') {
                accountFormDetailsData.familyName.errorText =
                    'Please enter in your last name.';
                formIsComplete = false;
            }
        }

        if (formIsComplete === true) {

            const customerDetailsMeetsRequirementsResult = API.post(
                VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
                {
                    userEnteredPassword: this.state.accountFormDetails.password.value,
                    userEnteredLoginEmailAddress: this.state.accountFormDetails
                        .loginEmailAddress.value,
                    //clubCodeA: this.state.accountFormDetails.codeA.value,
                    //clubCodeB: this.state.accountFormDetails.codeB.value,
                    conditionType: 'joinbyguestlanding',
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
            conditionType: 'joinbyguestlanding',
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
                        // console.log('Proceeding to create the customers pending account');
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
                        googleProfileFamilyName: res.googleProfileInfo.familyName,
                        googleProfilePictureURL: res.googleProfileInfo.profilePictureURL,
                    };

                    /* Needed to capture the Google Profile information in our system as the refresh_token is only given one time.
                     * MUST validate that the Google Account Email Address matches the invitation */

                    if (
                        googleProfileResult.googleProfileEmail !=
                        this.state.accountFormDetails.loginEmailAddress.value
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
                        accountFormDetailsData.loginEmailAddress.editable = false;
                        accountFormDetailsData.loginEmailAddress.value =
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

    handleJoinPageServiceResponse = result => {
        // console.log('result', result)
        const newAccountFormData = cloneDeep(this.state.accountFormDetails);

        newAccountFormData.AgeGroup.label = result.formFieldLabels.is13YearsAndOlder.label;
        newAccountFormData.legalGuardianCheckbox.label = result.formFieldLabels.not13YearsOldLegalGuardianOk.label;
        newAccountFormData.ParentEmail.label = result.formFieldLabels.parentEmailAddress.label;

        newAccountFormData.givenName.label = result.formFieldLabels.firstname.label;
        newAccountFormData.familyName.label = result.formFieldLabels.lastname.label;
        newAccountFormData.displayName.label =
            result.formFieldLabels.displayname.label;
        newAccountFormData.loginEmailAddress.label =
            result.formFieldLabels.loginemailaddress.label;
        /* newAccountFormData.loginEmailAddressVerification.label =
            result.formFieldLabels.loginemailaddressverification.label; */
        newAccountFormData.password.label = result.formFieldLabels.password.label;


        this.setState(() => ({
            accountFormDetails: newAccountFormData,
            //isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
        }));
    }


    render() {
        const {
            accountFormDetails,
            captchaVerified

        } = this.state;
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
                                                                        onSuccess={this.processGoogleSuccessResponse}
                                                                        onFailure={this.processGoogleFailureResponse}
                                                                    />

                                                                </div>
                                                            )}
                                                        </Fragment>
                                                    )}
                                            />

                                            <form onSubmit={this.handleSubmit}>
                                                <fieldset>
                                                    <>
                                                        <div className="mt-4">
                                                            <div className="form-field-container">
                                                                <span
                                                                    className="form-label"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: accountFormDetails.AgeGroup.label,

                                                                    }}
                                                                />
                                                                 :
                                                                <span
                                                                    className="form-error"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: accountFormDetails.AgeGroup.errorText,

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
                                                                value="13andOlder"
                                                                onChange={event => {
                                                                    this.handleFieldChange({
                                                                        field: 'AgeGroup',
                                                                        value: event.target.value,
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
                                                                    value="Under13"
                                                                    onChange={event => {
                                                                        this.handleFieldChange({
                                                                            field: 'AgeGroup',
                                                                            value: event.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                                {'\u00A0'}
                                                              No
                                                        </label>
                                                        </span>
                                                        <br />

                                                        {accountFormDetails.AgeGroup.value === "Under13" ?
                                                            <>
                                                                <div className="">
                                                                    <div className="form-field-container">
                                                                        <span
                                                                            className="form-label"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: accountFormDetails.legalGuardianCheckbox.label,

                                                                            }}
                                                                        />
                                                                       :
                                                                        <span
                                                                            className="form-error"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: accountFormDetails.legalGuardianCheckbox.errorText,

                                                                            }}
                                                                        />

                                                                    </div>
                                                                    <Field
                                                                        name="legalGuardianCheckbox"
                                                                        component="input"
                                                                        type="Checkbox"
                                                                        checked={accountFormDetails.legalGuardianCheckbox.value}
                                                                        onChange={event => {
                                                                            this.handleFieldChange({
                                                                                field: 'legalGuardianCheckbox',
                                                                                value: event.target.value,
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="form-section">
                                                                    <div className="form-field-container">
                                                                        <span
                                                                            className="form-label"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: accountFormDetails.ParentEmail.label,

                                                                            }}
                                                                        />
                                                                         :
                                                                        <span
                                                                            className="form-error"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: accountFormDetails.ParentEmail.errorText,

                                                                            }}
                                                                        />

                                                                    </div>
                                                                    <Field
                                                                        name="displayEmail"
                                                                        type="name"
                                                                        className="form-field"
                                                                        //  label={accountFormDetails.ParentEmail.hintText}
                                                                        component={InputField}
                                                                        onChange={event => {
                                                                            this.handleFieldChange({
                                                                                field: 'ParentEmail',
                                                                                value: event.target.value,
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                            </>

                                                            : null

                                                        }
                                                    </>
                                                </fieldset>

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
                                                                // label={accountFormDetails.givenName.hintText}
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
                                                                //label={accountFormDetails.familyName.hintText}
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
                                                                    __html: '' /* accountFormDetails.displayName.label */,

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

                                                    <div className="form-section">
                                                        <div className="form-field-container">
                                                            <span
                                                                className="form-label"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: accountFormDetails.loginEmailAddress.label,

                                                                }}
                                                            />
                                                            :
                                                            <span
                                                                className="form-error"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: accountFormDetails.loginEmailAddress.errorText,

                                                                }}
                                                            />
                                                        </div>

                                                        <Field
                                                            name="loginEmailAddress"
                                                            type="name"
                                                            className="form-field"
                                                            label={accountFormDetails.displayName.hintText}
                                                            component={InputField}
                                                            onChange={event => {
                                                                this.handleFieldChange({
                                                                    field: 'loginEmailAddress',
                                                                    value: event.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </div>




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

