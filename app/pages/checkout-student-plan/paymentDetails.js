import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';





import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';



class paymentDetails extends Component {

    constructor(props) {
        super(props);
        window.localStorage.setItem('selectedPlanId', 6);
        this.state = {

            accountFormDetails: {
                cardNumber: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
                expiryDate: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
                cvvCode: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
                nameOnCard: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },

                email: {
                    label: '',
                    editable: true,
                    value: '',
                    hintText: '',
                    errorText: '',
                },


            }

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

        const { } = this.props;
        //assume the form is ready to submit unless validation issues occur.
        let formIsComplete = true;
        const { accountFormDetails, accountCreationType } = this.state;

        const accountFormDetailsData = cloneDeep(accountFormDetails);

        /* reset the error conditions */
        accountFormDetailsData.cardNumber.errorText = '';
        accountFormDetailsData.expiryDate.errorText = '';
        accountFormDetailsData.cvvCode.errorText = '';
        accountFormDetailsData.nameOnCard.errorText = '';
        accountFormDetailsData.email.errorText = '';


        if (accountFormDetailsData.cardNumber.value === '') {
            accountFormDetailsData.cardNumber.errorText =
                'Please enter  your card number.';
            formIsComplete = false;
        }

        if (accountFormDetailsData.expiryDate.value === '') {
            accountFormDetailsData.expiryDate.errorText =
                'Please enter expiry date';
            formIsComplete = false;
        }

        if (accountFormDetailsData.cvvCode.value === '') {
            accountFormDetailsData.cvvCode.errorText =
                'Please enter  your cvv code';
            formIsComplete = false;
        }
        if (accountFormDetailsData.nameOnCard.value === '') {
            accountFormDetailsData.nameOnCard.errorText =
                'Please enter your card holder name';
            formIsComplete = false;
        }
        if (accountFormDetailsData.email.value === '') {
            accountFormDetailsData.email.errorText =
                'Please enter  your  email ';
            formIsComplete = false;
        }
        if (formIsComplete) {

        } else {

            /* make sure to persist any changes to the account signup form (error messages) */
            this.setState(() => ({ accountFormDetails: accountFormDetailsData }));

        }


    }



    render() {
        const {
            accountFormDetails

        } = this.state;


        return (

            <div>
                <Request

                    serviceURL={JOIN_PAGE_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'providePaymentDetails',
                        selectedPlanId: 6,

                        cid: window.localStorage.getItem('pending_cid'),
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
                                        <div className="payment-instruct">
                                            <ul>
                                                <li> Total due during 7 day free trial $0 .00 </li>
                                                <li > No charge until 27 / 11 / 20 </li>
                                            </ul>
                                        </div>
                                        <div className="payment-dateSec">
                                            <p className="text-dark">Total after Novermber 27, 2020 <span className="text-dark font-weight-bold">$100 /
                                             <br />billed annually </span>
                                            </p>
                                        </div>
                                        <h5 className="text-dark mt-4 mb-4 "> Set up payment in the easy way wish </h5>
                                        <div className="payment-way mt-4">
                                            {/* <Button variant="dark btn-black" >
                                                <img alt="Apay" src="../assets/images/icons/aPay.png"></img>
                                            </Button> */}
                                            <Button variant="dark btn-black" >
                                                <img alt="Apay" src="../assets/images/icons/gpay.png"></img>
                                            </Button>
                                           {/*  <Button variant="dark btn-ppal" >
                                                <img alt="Apay" src="../assets/images/icons/paypal.png"></img>
                                            </Button> */}

                                        </div>
                                        <div><h5 className="text-dark mt-4 mb-4"> Set up payment with credit card </h5></div>
                                        <div className="inner-container">
                                            <DisplayAtBreakpoint
                                                screenMedium
                                                screenLarge
                                                screenXLarge
                                                screenSmall
                                            >
                                                <iframe
                                                    id="embeddedHostedPaymentForm"
                                                    title="PaymentFormLarge"
                                                    frameBorder="0"
                                                    style={{ width: '100%', height: '100vh' }}
                                                    src={joinPageRes.hostedPaymentFormURL}
                                                />
                                            </DisplayAtBreakpoint>
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
        paymentDetails
    )
);

