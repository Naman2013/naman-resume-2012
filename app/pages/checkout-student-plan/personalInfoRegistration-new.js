import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import InputFieldNew from 'app/components/form/InputFieldNew';
import cloneDeep from 'lodash/cloneDeep';
import { GOOGLE_CLIENT_ID_ENDPOINT_URL, GOOGLE_SSO_SIGNIN_ENDPOINT_URL, VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL, VERIFY_CAPTCHA_CODE_URL, JOIN_PAGE_ENDPOINT_URL, JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL, VERIFY_CLUB_CODE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { GoogleLogin } from 'react-google-login';
import { API } from 'app/api';
import ReCAPTCHA from "react-google-recaptcha";
import { googleRecaptchaConfig } from 'app/config/project-config';
import { getUserInfo } from 'app/modules/User';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { withTranslation } from 'react-i18next';
import "./personalInfo.scss";


@withTranslation()

class personalInfoRegistrationNew extends Component {

    constructor(props) {
        super(props);

        window.localStorage.setItem('accountCreationType', 'userpass');

        this.state = {
            accountCreationType: 'userpass',
            showGoogleSSOButtonDescription: '',
            googleSSOButtonDescription: '',
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
        var { formFields } = this.state;
        formFields.forEach((element, index) => {
            if (element.key === field) {
                formFields[index].currentValue = value;
                return;
            }
            if (element.fieldOptions) {
                element.fieldOptions.forEach((innerElement, innerIndex) => {
                    if (innerElement.nestedFields && innerElement.key === formFields[index].currentValue) {
                        innerElement.nestedFields.forEach((nestedelement, nestedindex) => {
                            if (nestedelement.key === field) {
                                formFields[index].fieldOptions[innerIndex].nestedFields[nestedindex].currentValue = value;
                                return;
                            }
                        })
                    }
                })
            }
        });
        this.setState({ formFields })
        /* Get the existing state of the signup form, modify it and re-set the state */
        // const newAccountFormData = cloneDeep(this.state.accountFormDetails);

        // newAccountFormData[field].value = value;

        // this.setState(() => ({
        //     accountFormDetails: newAccountFormData,
        // }));
    };

    formValidationSuccess = true;

    checkFormValues = (arrayOfFields) => {
        arrayOfFields.forEach((element, index) => {
            if (element.required && (element.currentValue === false || (typeof element.currentValue === 'string' && element.currentValue.trim() === ""))) {
                Object.assign(arrayOfFields[index], { showError: true });
                this.formValidationSuccess = false;
            }
            else {
                Object.assign(arrayOfFields[index], { showError: false });
            }
            if (element.fieldOptions) {
                element.fieldOptions.forEach((innerElement, innerIndex) => {
                    if (innerElement.nestedFields && innerElement.key === arrayOfFields[index].currentValue) {
                        arrayOfFields[index].fieldOptions[innerIndex].nestedFields = this.checkFormValues(innerElement.nestedFields);
                    }
                })
            }
        });
        return arrayOfFields;
    }

    handleValidation = formValues => {
        formValues.preventDefault();
        let { formFields } = this.state;
        this.formValidationSuccess = true;
        const validatedData = this.checkFormValues(formFields);
        if (this.formValidationSuccess) {
            this.handleApiValidation();
        }
        else
            this.setState({ formFields: validatedData });
    }

    handleFormatdataConversion = (array) => {
        let formData = {};
        array.forEach((element, index) => {
            formData[element.key] = { "currentValue": element.currentValue, "required": element.required };
            if (element.fieldOptions) {
                element.fieldOptions.forEach((innerElement, innerIndex) => {
                    if (innerElement.nestedFields && innerElement.key === array[index].currentValue) {
                        formData = { ...formData, ...this.handleFormatdataConversion(innerElement.nestedFields) }
                    }
                })
            }
        });
        return formData;
    }

    handleErrorFormatdata = (array, errorArray) => {
        array.forEach((element, index) => {
            
            if (errorArray[element.key]) {
                Object.assign(array[index], { showError: errorArray[element.key].showError, errorText: errorArray[element.key].errorText });
            }
            if (element.fieldOptions) {
                element.fieldOptions.forEach((innerElement, innerIndex) => {
                    if (innerElement.nestedFields && innerElement.key === array[index].currentValue) {
                        innerElement.nestedFields.forEach((nestedElement, nestedIndex) => {
                            if (errorArray[nestedElement.key]) {
                                Object.assign(array[index].formFields[innerIndex].nestedFields[nestedIndex], { showError: errorArray[element.key].showError, errorText: errorArray[element.key].errorText });
                            }
                        })
                    }

                })
            }
        });
        return array;
    }

    handleApiValidation = () => {
        let { formFields } = this.state;
        let formData = this.handleFormatdataConversion(formFields);
        API.post(VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
            {
                accountFormFields: formData,
                conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
                selectedPlanId: window.localStorage.selectedPlanId,
                sloohMarketingTrackingId: getUserInfo()._sloohatid,
            }
        ).then(response => {
            const res = response.data;
            if (res.apiError == false) {
                if (res.accountFormHasErrors) {
                    const errorFormData = this.handleErrorFormatdata(formFields, res.accountFormFields);
                    this.setState({ formFields: errorFormData });
                }
                else {
                    //create pending customer
                    window.localStorage.setItem('clubCodeA', formData.discussionGroupCodeA.currentValue);
                    window.localStorage.setItem('clubCodeB', formData.discussionGroupCodeB.currentValue);
                    this.handleCreatePendingCustomer(formData);
                }
            }
        })
    }

    handleCreatePendingCustomer = (formData) => {
        const selectedSchoolId = window.localStorage.getItem('selectedSchoolId');
        let createPendingCustomerData = {
            accountCreationType: this.state.accountCreationType,
            selectedPlanId: window.localStorage.selectedPlanId,
            googleProfileId: this.state.googleProfileData.googleProfileId,
            accountFormDetails: formData,
            selectedSchoolId,
            conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
            // isAgeRestricted: this.state.isAgeRestricted,
            sloohMarketingTrackingId: getUserInfo()._sloohatid,
        };

        API.post(JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL, createPendingCustomerData).then(response => {
            const res = response.data;
            if (!res.apiError) {
                const pendingCustomerResult = {
                    status: res.status,
                    customerId: res.customerId,
                    message: res.message,
                };

                if (pendingCustomerResult.status === 'success') {
                    
                    window.localStorage.setItem('pending_cid', pendingCustomerResult.customerId);
                    window.localStorage.setItem('username', formData.loginEmailAddress.currentValue);
                    window.localStorage.setItem('password', formData.password.currentValue);

                    /*  this.setState( () =>({
                         accoridianActiveKey:"1"
                     })) */

                    const { onStepOneComplete } = this.props;

                    onStepOneComplete("1");
                    //  .log('Proceeding to create the customers pending account');
                    // browserHistory.push('/join/step3');
                } else {
                    // accountFormDetailsData.loginEmailAddress.errorText =
                    //     pendingCustomerResult.message;

                    // this.setState(() => ({ accountFormDetails: accountFormDetailsData }));

                    //show custom error dialog

                }
            }
        })
            .catch(err => {
                throw ('Error: ', err);
            });

    }


    handleClubCode = (codeA, codeB) => {
        if (codeA !== "" || codeB !== "") {
            API.post(VERIFY_CLUB_CODE_ENDPOINT_URL,
                {
                    clubCodeA: codeA,
                    clubCodeB: codeB,
                    selectedPlanId: window.localStorage.selectedPlanId,
                }
            ).then(response => {
                const res = response.data;
                if (!res.apiError && res.status !== "failed") {
                    window.localStorage.setItem('clubCodeA', codeA);
                    window.localStorage.setItem('clubCodeB', codeB);
                }
                // this.handleSubmit();
            });
        }
        else {
            //   this.handleSubmit();      
        }

    }

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
                    conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
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
            conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
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

                    let { formFields } = this.state;
                    formFields.forEach((element, index) => {
                        if (res.googleProfileInfo[element.key]) {
                            Object.assign(formFields[index], { editable: true, currentValue: res.googleProfileInfo[element.key].currentValue });
                        }
                        if (element.fieldOptions) {
                            element.fieldOptions.forEach((innerElement, innerIndex) => {
                                if (innerElement.nestedFields && innerElement.key === formFields[index].currentValue) {
                                    innerElement.forEach((nestedElement, nestedIndex) => {
                                        if (res.googleProfileInfo[nestedElement.key])
                                            Object.assign(formFields[index].fieldOptions[innerIndex].nestedFields[nestedIndex], { editable: true, currentValue: res.googleProfileInfo[nestedElement.key].currentValue });
                                    })
                                }
                            })
                        }
                    });
                    /* Capture the Google Profile Data and store it in state */
                    this.setState(() => ({ googleProfileData: googleProfileResult, formFields: formFields, accountCreationType: 'googleaccount', }));


                    /* Update the Account Form parameters to show/hide fields as a result of Google Login */
                    // const accountFormDetailsData = cloneDeep(
                    //     this.state.accountFormDetails
                    // );
                    /* Google Authentication technically does not require a password, but we want the user to use a backup password */
                    // accountFormDetailsData.password.visible = true;
                    //  accountFormDetailsData.passwordVerification.visible = true;

                    /* Set the customer's information that we got from google as a starting place for the user */
                    // accountFormDetailsData.givenName.value =
                    //     googleProfileResult.googleProfileGivenName;
                    // this.props.change(
                    //     'givenName',
                    //     googleProfileResult.googleProfileGivenName
                    // );

                    // accountFormDetailsData.familyName.value =
                    //     googleProfileResult.googleProfileFamilyName;
                    // this.props.change(
                    //     'familyName',
                    //     googleProfileResult.googleProfileFamilyName
                    // );

                    /* The primary key for Google Single Sign-in is the user's email address which can't be changed if using Google, update the form on screen accordingly so certain fields are hidden and not editable */
                    // accountFormDetailsData.loginEmailAddress.errorText =''; 
                    /* reset the error text in case the user uses another account after finding out their previous account was already a Slooh customer */
                    // accountFormDetailsData.loginEmailAddress.editable = false;
                    // accountFormDetailsData.loginEmailAddress.value =
                    //     googleProfileResult.googleProfileEmail;
                    // this.props.change(
                    //     'loginEmailAddress',
                    //     googleProfileResult.googleProfileEmail
                    // );

                    /* No need to verify the email address as its Google and it was already provided */
                    // accountFormDetailsData.loginEmailAddressVerification.visible = false;

                    // this.setState(() => ({
                    //     accountFormDetails: accountFormDetailsData,
                    //     /* Set the account creation type as Google */
                    //     accountCreationType: 'googleaccount',
                    // }));

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
        this.setState({
            formFields: result.formFieldLabels,
            showGoogleSSOButtonDescription: result.showGoogleSSOButtonDescription,
            googleSSOButtonDescription: result.googleSSOButtonDescription
        })
        // let test = Object.keys(result.formFieldLabels).sort(function(a, b) {            
        //     return (result.formFieldLabels[a].displayOrder - result.formFieldLabels[b].displayOrder)
        // }).reduce(function (sortedList, key) {
        //     sortedList[key] = result.formFieldLabels[key];
        //     return sortedList;
        //   }, {});        
        // const newAccountFormData = cloneDeep(this.state.accountFormDetails);


        // newAccountFormData.givenName.label = result.formFieldLabels.firstname.label;
        // newAccountFormData.familyName.label = result.formFieldLabels.lastname.label;
        // newAccountFormData.displayName.label =
        //     result.formFieldLabels.displayname.label;
        // newAccountFormData.loginEmailAddress.label =
        //     result.formFieldLabels.loginemailaddress.label;
        // /*  newAccountFormData.loginEmailAddressVerification.label =
        //      result.formFieldLabels.loginemailaddressverification.label; */
        // newAccountFormData.password.label = result.formFieldLabels.password.label;
        // /*  newAccountFormData.passwordVerification.label =
        //      result.formFieldLabels.passwordverification.label; */
        // /*  newAccountFormData.discussionGroupCode.label =
        //      result.formFieldLabels.discussionGroupCode.label; */
        // newAccountFormData.is13YearsAndOlder.label =
        //     result.formFieldLabels.is13YearsAndOlder.label;
        // newAccountFormData.not13YearsOldLegalGuardianOk.label =
        //     result.formFieldLabels.not13YearsOldLegalGuardianOk.label;
        // newAccountFormData.parentEmailAddress.label =
        //     result.formFieldLabels.parentEmailAddress.label;




        // newAccountFormData.givenName.hintText =
        //     result.formFieldLabels.firstname.hintText;
        // newAccountFormData.familyName.hintText =
        //     result.formFieldLabels.lastname.hintText;
        // newAccountFormData.displayName.hintText =
        //     result.formFieldLabels.displayname.hintText;
        // newAccountFormData.loginEmailAddress.hintText =
        //     result.formFieldLabels.loginemailaddress.hintText;
        // /*         newAccountFormData.loginEmailAddressVerification.hintText =
        //             result.formFieldLabels.loginemailaddressverification.hintText; */
        // newAccountFormData.password.hintText =
        //     result.formFieldLabels.password.hintText;
        // /* newAccountFormData.passwordVerification.hintText =
        //     result.formFieldLabels.passwordverification.hintText; */
        // /* newAccountFormData.discussionGroupCode.hintText =
        //     result.formFieldLabels.discussionGroupCode.hintText; */
        // newAccountFormData.is13YearsAndOlder.hintText =
        //     result.formFieldLabels.is13YearsAndOlder.hintText;
        // newAccountFormData.not13YearsOldLegalGuardianOk.hintText =
        //     result.formFieldLabels.not13YearsOldLegalGuardianOk.hintText;
        // newAccountFormData.parentEmailAddress.hintText =
        //     result.formFieldLabels.parentEmailAddress.hintText;
        // newAccountFormData.codeA.value =
        //     result.formFieldLabels.discussionGroupCodeA.currentValue;
        // newAccountFormData.codeB.value =
        //     result.formFieldLabels.discussionGroupCodeB.currentValue;

        // this.setState(() => ({
        //     accountFormDetails: newAccountFormData,
        //     //isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
        // }));
    }


    getFormField = (fieldType, label, hintText, keyName, onChange, errorText, fieldOptions, value, showError, required, fieldSize, editable) => {
        switch (fieldType) {
            case "select":
                return (<div className={"form-section " + fieldSize}>
                    <div className="form-field-container">
                        <span className="form-label"
                            dangerouslySetInnerHTML={{ __html: label }} />

                        <span className="form-error"
                            dangerouslySetInnerHTML={{ __html: showError ? errorText : '' }} />
                    </div>
                    <Field
                        name={keyName}
                        type="select"
                        className="field-input"
                        label={hintText}
                        component={"select"}
                        onChange={event => { onChange({ field: keyName, value: event.target.value }); }} >
                        {fieldOptions.map(field => (
                            <option value={field.key} selected={field.key === value}>{field.label}</option>
                        ))}
                    </Field>
                    <br />
                    {fieldOptions.map(field => (
                        field.key === value && field.nestedFields && (
                            field.nestedFields.map(nestItem => (
                                <fieldset style={{ paddingLeft: '25px' }}>
                                    {this.getFormField(nestItem.fieldType, nestItem.label, nestItem.hintText, nestItem.key, onChange, nestItem.errorText, nestItem.fieldOptions, nestItem.value, nestItem.showError, nestItem.required, nestItem.fieldSize, nestItem.editable)}
                                </fieldset>
                            )
                            )
                        )))}

                </div>);
                break;
            case "radio":
                return (<div className={"form-section " + fieldSize}>
                    <span className="form-label"
                        dangerouslySetInnerHTML={{ __html: label }} />

                    <span className="form-error"
                        dangerouslySetInnerHTML={{ __html: showError ? errorText : '' }} />
                    <br />
                    <fieldset className="row">
                        {fieldOptions.map(item => (
                            <div>
                                <label className="ageGroupStyle" style={{ paddingLeft: '25px' }}>
                                    <Field
                                        name={item.key}
                                        label={item.label}
                                        component="input"
                                        type="radio"
                                        value={item.key}
                                        checked={value === item.key}
                                        onClick={event => { onChange({ field: keyName, value: item.key }); }}
                                    />
                                    {" " + item.label}
                                </label>
                                <br />
                                {value === item.key && item.nestedFields && (
                                    item.nestedFields.map(nestItem => (
                                        <fieldset style={{ paddingLeft: '25px' }}>
                                            {this.getFormField(nestItem.fieldType, nestItem.label, nestItem.hintText, nestItem.key, onChange, nestItem.errorText, nestItem.fieldOptions, nestItem.value, nestItem.showError, nestItem.required, nestItem.fieldSize, nestItem.editable)}
                                        </fieldset>

                                    ))
                                )}
                            </div>
                        ))}
                    </fieldset>
                    {/* <br/> */}
                </div>);

            case "checkbox":
                return (<div>
                    <div className={"form-section " + fieldSize}>
                        <Field
                            name={keyName}
                            type="checkbox"
                            className="form-field"
                            label={label}
                            component="input"
                            value={value}
                            onClick={event => { onChange({ field: keyName, value: !value }); }} />
                        <div className="form-field-container inline">
                            <span className="form-label"
                                dangerouslySetInnerHTML={{ __html: label }} />

                            <span className="form-error"
                                dangerouslySetInnerHTML={{ __html: showError ? errorText : '' }} />
                        </div>
                    </div>
                    <br />
                </div>)

            case "hidden":
                return (
                    <div style={{ display: 'none' }}>
                        <Field
                            value={value}
                            className=""
                            component={InputFieldNew}
                            name={keyName}
                            type="hidden"
                        />

                    </div>
                );
            case "password":
            case "name":
            case "email":
            case "number":
            case "text":
                return (<div className={"form-section " + fieldSize}>
                    <div className="form-field-container">
                        <span className="form-label"
                            dangerouslySetInnerHTML={{ __html: label }} />

                        <span className="form-error"
                            dangerouslySetInnerHTML={{ __html: showError ? errorText : '' }} />
                    </div>
                    <Field
                        editable={editable}
                        name={keyName}
                        currentValue={value}
                        type={fieldType}
                        className="form-field"
                        label={hintText}
                        component={InputFieldNew}
                        onChange={event => { onChange({ field: keyName, value: event.target.value }); }} />
                </div>);
        }
    }


    render() {
        const { pathname, t } = this.props;

        const {
            accountFormDetails,
            captchaVerified,
            accountCreationType,
            googleSSOButtonDescription,
            showGoogleSSOButtonDescription

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
                        conditionType: _sloohatid ? 'join' : 'joinbyguestlanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => (

                        <Fragment>
                            {!fetchingContent && (
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
                                                                    {showGoogleSSOButtonDescription && (
                                                                        <div style={{ padding: '10px' }}>{googleSSOButtonDescription}</div>
                                                                    )
                                                                    }

                                                                </div>
                                                            )}
                                                        </Fragment>
                                                    )}
                                                />
                                                <br />
                                                <form className="row ml-0 mr-0" onSubmit={this.handleValidation}>

                                                    {this.state.formFields.map(field => (
                                                        this.getFormField(field.fieldType, field.label, field.hintText, field.key, this.handleFieldChange, field.errorText, field.fieldOptions, field.currentValue, field.showError, field.required, field.fieldSize, field.editable)
                                                    ))}




                                                    <div className="form-section mb-4">
                                                        <div className="form-field-container">
                                                            <ReCAPTCHA
                                                                sitekey={googleRecaptchaConfig.CAPTCHA_KEY_V2}
                                                                onChange={this.handleCaptchaCode}
                                                            />

                                                        </div>
                                                    </div>
                                                    <button className={"submit-button " + (!captchaVerified ? "disabled" : "")} type="submit" disabled={!captchaVerified}>
                                                        {joinPageRes.continueBtnTxt}
                                                    </button>
                                                </form>

                                            </div>
                                        </Fragment>
                                    )}
                                </DeviceContext.Consumer>
                            )}
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
        personalInfoRegistrationNew
    )
);

