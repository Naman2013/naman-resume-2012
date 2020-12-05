import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';



import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';



class paymentDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {

            paymentFormDetails: {
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
        const newAccountFormData = cloneDeep(this.state.paymentFormDetails);
        if (field === 'legalGuardianCheckbox') {
            newAccountFormData[field].value = !newAccountFormData[field].value;
        } else {
            newAccountFormData[field].value = value;
        }
        this.setState(() => ({
            paymentFormDetails: newAccountFormData,
        }));
    };

    handleSubmit = formValues => {
        alert('ff');

    }

    render() {

        return (

            <div>
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
                    <Button variant="dark btn-black" >
                        <img alt="Apay" src="../assets/images/icons/aPay.png"></img>
                    </Button>
                    <Button variant="dark btn-black" >
                        <img alt="Apay" src="../assets/images/icons/gpay.png"></img>
                    </Button>
                    <Button variant="dark btn-ppal" >
                        <img alt="Apay" src="../assets/images/icons/paypal.png"></img>
                    </Button>

                </div>

                <div><h5 className="text-dark mt-4 mb-4"> Set up payment with credit card </h5></div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <div className="form-field-container">
                            <span
                                className="form-label"
                                dangerouslySetInnerHTML={{
                                    __html: 'Card Number',
                                }}
                            />
                              :
                              <span
                                className="form-error"
                                dangerouslySetInnerHTML={{
                                    __html: '',
                                }}
                            />
                        </div>
                        <Field
                            name="CardNumber"
                            type="name"
                            className="form-field"
                            //label={accountFormDetails.password.hintText}
                            component={InputField}
                            onChange={event => {
                                this.handleFieldChange({
                                      field: 'cardNumber',
                                      value: event.target.value,
                                });
                            }}
                        />
                    </div>


                    <div className="form-section split">
                        <div className='formSectionName'>

                            <div className="form-field-container form-field-half">

                                <div className="form-field-container">
                                    <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                            __html: 'Expiry Date',
                                        }}
                                    />
                              :
                              <span
                                        className="form-error"
                                        dangerouslySetInnerHTML={{
                                            __html: '',
                                        }}
                                    />
                                </div>
                                <Field
                                    name="expiryDate"
                                    type="name"
                                    className="form-field"
                                    // label={accountFormDetails.givenName.hintText}
                                    component={InputField}
                                    onChange={event => {
                                        this.handleFieldChange({
                                            field: 'expiryDate',
                                            value: event.target.value,
                                        });
                                    }}
                                //value={accountFormDetails.givenName.value}
                                />
                            </div>

                            <div className="form-field-container form-field-half">
                                <div className="form-field-container">
                                    <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                            __html: 'CCV Code',
                                        }}
                                    />
                              :
                              <span
                                        className="form-error"
                                        dangerouslySetInnerHTML={{
                                            __html: '',
                                        }}
                                    />
                                </div>
                                <Field
                                    name="cvvCode"
                                    type="name"
                                    className="form-field"
                                    //label={accountFormDetails.familyName.hintText}
                                    component={InputField}
                                    onChange={event => {
                                        this.handleFieldChange({
                                            field: 'cvvCode',
                                            value: event.target.value,
                                        });
                                    }}
                                //value={accountFormDetails.familyName.value}
                                />
                            </div>
                        </div>


                        <div className="form-section">
                            <div className="form-field-container">
                                <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                        __html: 'Name on the Card',
                                    }}
                                />
                              :
                              <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                        __html: '',
                                    }}
                                />
                            </div>

                            <Field
                                name="nameOnThecard"
                                type="name"
                                className="form-field"
                                //label={accountFormDetails.displayName.hintText}
                                component={InputField}
                                onChange={event => {
                                    this.handleFieldChange({
                                        field: 'nameOnCard',
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
                                        __html: 'Email',
                                    }}
                                />
                              :
                              <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                        __html: '',
                                    }}
                                />
                            </div>

                            <Field
                                name="Email"
                                type="name"
                                className="form-field"
                                //label={accountFormDetails.displayName.hintText}
                                component={InputField}
                                onChange={event => {
                                    this.handleFieldChange({
                                        field: 'email',
                                        value: event.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button className="submit-button" type="submit">
                            START FREE TRIAL NOW
                          </button>

                    </div>

                </form>
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

