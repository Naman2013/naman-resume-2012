import { func } from "prop-types";
import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from 'app/components/form/InputField';
import cloneDeep from 'lodash/cloneDeep';



import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';



class personalInfoRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {

            checkoutFormDetails: {
                AgeGroup: {
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
                firstName: {
                    label: '',
                    value: '',
                    hintText: '',
                    errorText: '',
                },
                lastName: {
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
                emailAddress: {
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

    /* This function handles a field change in the form and sets the state accordingly */
    handleFieldChange = ({ field, value }) => {
        /* Get the existing state of the signup form, modify it and re-set the state */
        const newAccountFormData = cloneDeep(this.state.checkoutFormDetails);
        if (field === 'legalGuardianCheckbox') {
            newAccountFormData[field].value = !newAccountFormData[field].value;
        } else {
            newAccountFormData[field].value = value;
        }
        this.setState(() => ({
            checkoutFormDetails: newAccountFormData,
        }));
    };

    handleSubmit = formValues => {
        alert('ff');

    }

    render() {
        const {
            checkoutFormDetails

        } = this.state;

        return (

            <div>
                <Button variant="primary" size="lg" style={{ color: "white", background: "#518EF8" }} active>
                    SIGN UP WIDTH GOOGLE
            </Button>
                {'\u00A0'}
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <>
                            <div className="mt-4">
                                <div className="form-field-container">
                                    <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                            __html: 'I Certify That I am 13 Years of Age Or Older:',
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
                        </>
                    </fieldset>

                    <div className="form-section">
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
                                    __html: '',
                                }}
                            />
                        </div>
                        <Field
                            name="School"
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
                    </div>


                    <div className="form-section split">
                        <div className='formSectionName'>

                            <div className="form-field-container form-field-half">

                                <div className="form-field-container">
                                    <span
                                        className="form-label"
                                        dangerouslySetInnerHTML={{
                                            __html: 'First Name',
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
                                    name="givenName"
                                    type="name"
                                    className="form-field"
                                    // label={accountFormDetails.givenName.hintText}
                                    component={InputField}
                                    onChange={event => {
                                        this.handleFieldChange({
                                            field: 'firstName',
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
                                            __html: ' Last Name',
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
                                    name="familyName"
                                    type="name"
                                    className="form-field"
                                    //label={accountFormDetails.familyName.hintText}
                                    component={InputField}
                                    onChange={event => {
                                        this.handleFieldChange({
                                            field: 'lastName',
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
                                        __html: 'Display Name(Optional)',
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
                                name="displayName"
                                type="name"
                                className="form-field"
                                //label={accountFormDetails.displayName.hintText}
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
                                name="emailAddress"
                                type="name"
                                className="form-field"
                                //label={accountFormDetails.displayName.hintText}
                                component={InputField}
                                onChange={event => {
                                    this.handleFieldChange({
                                        field: 'emailAddress',
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
                                        __html: 'Password',
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
                                name="password"
                                type="password"
                                className="form-field"
                                //label={accountFormDetails.password.hintText}
                                component={InputField}
                                onChange={event => {
                                    this.handleFieldChange({
                                        field: 'password',
                                        value: event.target.value,
                                    });
                                }}
                            />
                        </div>
                        <button className="submit-button" type="submit">
                            CONTINUE
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
        personalInfoRegistration
    )
);

