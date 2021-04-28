import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { JOIN_PAGE_ENDPOINT_URL, JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import { getUserInfo, deleteSessionToken, deleteMarketingTrackingId } from 'app/modules/User';
import { API } from 'app/api';
import { fireSloohFBPurchaseEvent } from 'app/utils/fb-wrapper';
import { resetLogIn, logUserIn, logGoogleUserIn } from 'app/modules/login/actions';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';


const propTypes = {
    actions: PropTypes.shape({
        logUserIn: PropTypes.func.isRequired,
        resetLogIn: PropTypes.func.isRequired,
        logGoogleUserIn: PropTypes.func.isRequired,
    }).isRequired,
};

class paymentDetails extends Component {

    static propTypes = propTypes;

    constructor(props) {
        super(props);
        window.localStorage.setItem('accountCreationType', 'userpass');
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

    componentDidMount() {
        //Listen for a message from the Window/IFrames to capture the ECommerce Hosted Payment Form Messaging
        window.addEventListener('message', this.handleIframeTask);
    }

    componentWillUnmount() {

        window.removeEventListener('message', this.handleIframeTask);
    }

    handleIframeTask = e => {

        /* Verify there is data in this event) */
        if (e.data) {
            const paymentMessageData = `${e.data}`;

            //determine if there is a slooh session token or slooh marketing tracking id
            const { _sloohsstkn, _sloohatid } = getUserInfo();

            let paymentMethod = 'creditcard';
            let paymentNonceTokenData = null;
          
            let paymentDataString = paymentMessageData.split(
                '!952bccf9afe8e4c04306f70f7bed6610'
            );

           
            /* make sure the data message we received is an ECommerce Payment Token */
            if (paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_')) {
                //Check to see if the payment token is a credit card payment token or a paypal payment token
                if (
                    paymentDataString[0].startsWith(
                        '__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__'
                    )
                ) {
                    paymentNonceTokenData = String.prototype.replace.call(
                        paymentDataString[0],
                        '__ECOMMERCE_PAYMENT_TOKEN_CREDITCARD__',
                        ''
                    );
                    paymentMethod = 'creditcard';
                } else if (
                    paymentDataString[0].startsWith('__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__')
                ) {
                    paymentNonceTokenData = String.prototype.replace.call(
                        paymentDataString[0],
                        '__ECOMMERCE_PAYMENT_TOKEN_PAYPAL__',
                        ''
                    );

                    paymentMethod = 'paypal';
                }

                

                /* Process the Customer's Activation and Sign the User into the website */
                const activatePendingCustomerData = {
                    paymentMethod,
                    paymentToken: paymentNonceTokenData,
                    customerId: window.localStorage.getItem('pending_cid'),
                    selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
                    isAstronomyClub:
                        window.localStorage.getItem('isAstronomyClub') === 'true',
                    clubCodeA: window.localStorage.getItem('clubCodeA'),
                    clubCodeB: window.localStorage.getItem('clubCodeB'),
                    billingAddressString: paymentDataString[3],
                    // sloohSiteSessionToken: _sloohsstkn,
                    sloohMarketingTrackingId: _sloohatid,
                    conditionType: _sloohatid ? 'join' : 'joinbyguestlanding',
                };

                API.post(
                    JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
                    activatePendingCustomerData
                )
                    .then(response => {
                        const res = response.data;
                        if (!res.apiError) {
                            if (res.status === 'success') {
                                const { actions } = this.props;

                                //fire off the Purchase Facebook Event
                                const myCID = window.localStorage.getItem('pending_cid');
                                fireSloohFBPurchaseEvent({
                                    cid: myCID,
                                    planName: res.PlanName,
                                    planCostInUSD: res.PlanCostInUSD,
                                });

                                //Cleanup local localStorage
                                //cleanup any hidden plan that was accessed now that a plan was redeemed.
                                window.localStorage.removeItem('enableHiddenPlanHashCode');

                                //cleanup other localstorage elements
                                window.localStorage.removeItem('pending_cid');
                                window.localStorage.removeItem('selectedPlanId');
                                window.localStorage.removeItem('isAstronomyClub');
                                window.localStorage.removeItem('clubCodeA');
                                window.localStorage.removeItem('clubCodeB');
                                // log the user in (userpass or googleaccount logins supported)
                                const { accountCreationType } = window.localStorage;
                                if (accountCreationType === 'userpass') {
                                    const loginDataPayload = {
                                        username: window.localStorage.username,
                                        pwd: window.localStorage.password,
                                    };

                                    /* cleanup local storage */
                                    window.localStorage.removeItem('accountCreationType');
                                    window.localStorage.removeItem('username');
                                    window.localStorage.removeItem('password');


                                    actions.logUserIn(loginDataPayload, { reload: false }).then(() => {
                                        deleteSessionToken();
                                        deleteMarketingTrackingId();
                                        const welcomepage = getUserInfo()._sloohatid ? "/join/purchaseConfirmation/join" : "/join/purchaseConfirmation/joinbyguestlanding";
                                        browserHistory.push(welcomepage);
                                    });
                                } else if (accountCreationType === 'googleaccount') {
                                    const loginDataPayload = {
                                        googleProfileId: window.localStorage.googleProfileId,
                                        googleProfileEmail: window.localStorage.username,
                                    };

                                    window.localStorage.removeItem('accountCreationType');
                                    actions.logGoogleUserIn(loginDataPayload, { reload: false }).then(() => {
                                        deleteSessionToken();
                                        deleteMarketingTrackingId();
                                        const welcomepage = getUserInfo()._sloohatid ? "/join/purchaseConfirmation/join" : "/join/purchaseConfirmation/joinbyguestlanding";
                                        browserHistory.push(welcomepage);
                                    });
                                }
                            } else {
                                /* process / display error to user */
                                document
                                    .getElementById('embeddedHostedPaymentForm')
                                    .contentWindow.captureActivationError(res);
                            }
                        }
                    })
                    .catch(err => {
                        throw ('Error: ', err);
                    });
            }
        }
    };

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
                        conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
                        selectedPlanId: window.localStorage.selectedPlanId,
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
                                                <li> {joinPageRes.bulletText1} </li>
                                                <li > {joinPageRes.bulletText2} </li>
                                            </ul>
                                        </div>
                                        <div className="payment-dateSec">
                                            <div className="text-dark">{joinPageRes.totalDueAfterFreeTrialText}</div>
                                            <div>{joinPageRes.planCostDescriptiveText}</div>

                                        </div>
                                        {/* <h5 className="text-dark mt-4 mb-4 "> Set up payment in the easy way wish </h5> */}
                                        <div className="payment-way mt-4">
                                            {/* <Button variant="dark btn-black" >
                                                <img alt="Apay" src="../assets/images/icons/aPay.png"></img>
                                            </Button> */}
                                            {/*  <Button variant="dark btn-black" >
                                                <img alt="Apay" src="../assets/images/icons/gpay.png"></img>
                                            </Button> */}
                                            {/*  <Button variant="dark btn-ppal" >
                                                <img alt="Apay" src="../assets/images/icons/paypal.png"></img>
                                            </Button> */}

                                        </div>
                                        <div><h5 className="payment-setup-card"> Set up payment with credit card </h5></div>
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
        paymentDetails
    )
);

