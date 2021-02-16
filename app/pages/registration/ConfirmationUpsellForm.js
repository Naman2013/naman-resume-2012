/***********************************
 * V4 Join
 ***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';

import Button from 'app/components/common/style/buttons/Button';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_PAGE_ENDPOINT_URL,
  UPDATE_ACCOUNT_DETAILS_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import PlanDetailsCard from './partials/PlanDetailsCard';
import styles from './JoinStep2.style';
import { getUserInfo } from 'app/modules/User';

const { string, func } = PropTypes;

let inputs = {};
@withTranslation()
class ConfirmationUpsellForm extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
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
      isAstronomyClub:
        window.localStorage.getItem('isAstronomyClub') === 'true',
      isAgeRestricted: true,
      formIsComplete: null,
      accountFormDetails: {
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
        is13YearsAndOlder: {
          label: '',
          visible: true,
          currentValue: null,
          hintText: '',
          errorText: '',
        },
        not13YearsOldLegalGuardianOk: {
          label: '',
          visible: true,
          currentValue: false,
          hintText: '',
          errorText: '',
        },

        parentEmailAddress: {
          label: '',
          visible: true,
          currentValue: '',
          hintText: '',
          errorText: '',
        },
      },
    };
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = result => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);


    result.formFieldLabels.map((field) => {

      var keyval = field.key;
      if (newAccountFormData[keyval]) {

        newAccountFormData[keyval].hintText = field.hintText ? field.hintText : '';
        newAccountFormData[keyval].label = field.label ? field.label : '';
        newAccountFormData[keyval].currentValue = field.currentValue ? field.currentValue : '';
        newAccountFormData[keyval].required = field.required ? field.required : '';

        if (field.fieldOptions) {

          field.fieldOptions.map((fieldOptionData) => {

            if (fieldOptionData.key == 'Under13') {

              fieldOptionData.nestedFields.map((nestedFieldsData) => {

                console.log('nestedFieldsData:::', nestedFieldsData);
                let keyValueOfNested = nestedFieldsData.key;
                newAccountFormData[keyValueOfNested].label = nestedFieldsData.label ? nestedFieldsData.label : '';

                newAccountFormData[keyValueOfNested].hintText = nestedFieldsData.hintText ? nestedFieldsData.hintText : '';
                newAccountFormData[keyValueOfNested].required = nestedFieldsData.required ? nestedFieldsData.required : '';

              })

            } else {

            }

          })
        }

      }
    })

    /* newAccountFormData.givenName.label = result.formFieldLabels.firstName.label;
    newAccountFormData.familyName.label = result.formFieldLabels.lastName.label;
    newAccountFormData.displayName.label =
      result.formFieldLabels.displayName.label;
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
    newAccountFormData.is13YearsAndOlder.hintText =
      result.formFieldLabels.is13YearsAndOlder.hintText;
    newAccountFormData.not13YearsOldLegalGuardianOk.hintText =
      result.formFieldLabels.not13YearsOldLegalGuardianOk.hintText;
    newAccountFormData.parentEmailAddress.hintText =
      result.formFieldLabels.parentEmailAddress.hintText;

    newAccountFormData.givenName.value = result.formFieldLabels.firstName.currentValue;
    newAccountFormData.familyName.value = result.formFieldLabels.lastName.currentValue;
    newAccountFormData.displayName.value =
      result.formFieldLabels.displayName.currentValue;
    newAccountFormData.is13YearsAndOlder.value =
      result.formFieldLabels.is13YearsAndOlder.currentValue;
    newAccountFormData.not13YearsOldLegalGuardianOk.value =
      result.formFieldLabels.not13YearsOldLegalGuardianOk.currentValue;
    newAccountFormData.parentEmailAddress.value =
      result.formFieldLabels.parentEmailAddress.currentValue; */



    /* this.props.change(
      'givenName',
      result.formFieldLabels.firstName.currentValue
    );
    this.props.change(
      'familyName',
      result.formFieldLabels.lastName.currentValue
    );
    this.props.change(
      'parentEmailAddress',
      result.formFieldLabels.parentEmailAddress.currentValue
    );
    this.props.change(
      'displayName',
      result.formFieldLabels.displayName.currentValue
    ); */


    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
      isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
    }));
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, currentValue }) => {

    console.log('currentValue',currentValue);
    console.log('field',field);

    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    newAccountFormData[field].currentValue = currentValue;

    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  };


  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = formValues => {
    formValues.preventDefault();
    //console.log(this.state.accountFormDetails);

    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const { accountFormDetails, accountCreationType } = this.state;

    const { t, selectedPlanId, onContinueClick, onError } = this.props;

    const accountFormDetailsData = cloneDeep(accountFormDetails);

    /* reset the error conditions */
    accountFormDetailsData.firstName.errorText = '';
    accountFormDetailsData.lastName.errorText = '';

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

      if (accountFormDetailsData.firstName.currentValue === '') {
        accountFormDetailsData.firstName.errorText = t(
          'Ecommerce.FirstNameRequierMessage'
        );
        formIsComplete = false;
      }

      if (accountFormDetailsData.lastName.currentValue === '') {
        accountFormDetailsData.lastName.errorText = t(
          'Ecommerce.LastNameRequierMessage'
        );
        formIsComplete = false;
      }


      /* need to verify that the password meets the Slooh requirements */
    }


    if (this.state.isAgeRestricted === true) {
      /* Make sure that the 13/Older indicator is selected with a value */
      if (accountFormDetailsData.is13YearsAndOlder.currentValue === null) {
        accountFormDetailsData.is13YearsAndOlder.errorText = t(
          'Ecommerce.AgeRequierMessage'
        );
        formIsComplete = false;
      } else if (accountFormDetailsData.is13YearsAndOlder.currentValue === false) {
        //make sure the user has certified that they have their Legal Guardian's permission to sign up.
        if (
          accountFormDetailsData.not13YearsOldLegalGuardianOk.currentValue === false
        ) {
          accountFormDetailsData.not13YearsOldLegalGuardianOk.errorText = t(
            'Ecommerce.MinAgeErrorMessage'
          );
          formIsComplete = false;
        }

        //make sure the parent email address field is filled in.
        if (accountFormDetailsData.parentEmailAddress.currentValue === '') {
          accountFormDetailsData.parentEmailAddress.errorText = t(
            'Ecommerce.ParentEmailRequierMessage'
          );
          formIsComplete = false;
        }
      }
    }

    this.setState(() => ({ formIsComplete: formIsComplete }));

    if (formIsComplete === true) {
      /* The form is complete and valid, submit the pending customer request if the Password Enters meets the Slooh Requirements and the Email Address is not already taken in the system */

      /* Last Validation....password and email address validation */
      /* reach out to the Slooh API and verify the user's password and email address is not already taken, etc */

      const updateAccountDetailsData = {
        cid: getUserInfo().cid,
        at: getUserInfo().at,
        token: getUserInfo().token,
        selectedPlanId,
        accountFormDetails,
      };

      API.post(UPDATE_ACCOUNT_DETAILS_ENDPOINT_URL, updateAccountDetailsData)
        .then(response => {
          const res = response.data;
          if (!res.apiError && res.status !== "failed") {
            onContinueClick();
          }
          else {
            onError(res);
          }

        }).catch(err => {
          throw ('Error: ', err);
        });
    } else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
    }
  };

  render() {
    const { t, selectedPlanId, onCancelClick, conditionType } = this.props;
    const {
      // googleProfileData,
      accountFormDetails,
      formIsComplete,
    } = this.state;

    console.log('accountFormDetails',accountFormDetails);
    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'confirmExistingAccountDetails',
            conditionType,
            selectedPlanId,
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
                      <h1 className="modal-h left-align">{joinPageRes.pageHeading1}</h1>
                      <p className="modal-p mb-5">{joinPageRes.pageHeading2}</p>
                      <div className="step-root-upsell">
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
                          <form onSubmit={this.handleSubmit}>
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
                                        checked={accountFormDetails.is13YearsAndOlder.currentValue}
                                        component="input"
                                        type="radio"
                                        value="13andolder"
                                        onClick={event => {
                                          this.handleFieldChange({
                                            field: 'is13YearsAndOlder',
                                            currentValue: true,
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
                                          checked={accountFormDetails.is13YearsAndOlder.currentValue !== null ? !accountFormDetails.is13YearsAndOlder.currentValue : false}
                                          onClick={event => {
                                            this.handleFieldChange({
                                              field: 'is13YearsAndOlder',
                                              currentValue: false,
                                            });
                                          }}
                                        />
                                        {t('Ecommerce.No')}
                                      </label>
                                    </span>
                                  </fieldset>
                                </div>
                                <br />
                                {accountFormDetails.is13YearsAndOlder.currentValue ===
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
                                        checked={
                                          accountFormDetails
                                            .not13YearsOldLegalGuardianOk.currentValue
                                        }
                                        onClick={event => {
                                          this.handleFieldChange({
                                            field: 'not13YearsOldLegalGuardianOk',
                                            currentValue: !accountFormDetails
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
                                            currentValue: event.target.value,
                                          });
                                        }}
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
                                    __html: accountFormDetails.firstName.label,
                                  }}
                                />
                                :
                                <span
                                  className="form-error"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      accountFormDetails.firstName.errorText,
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
                                    __html:
                                      accountFormDetails.lastName.errorText,
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
                                    currentValue: event.target.value,
                                  });
                                }}
                              />
                            </div>



                            <div className="button-container">
                              <Button
                                type="button"
                                text={joinPageRes.cancelBtnTxt}
                                onClickEvent={onCancelClick}
                              />
                              {formIsComplete === false && <span style={{ color: "red", fontWeight: "bold" }}>Please complete the missing fields above.</span>}
                              <button className="submit-button" type="submit">
                                {joinPageRes.continueBtnTxt}
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

const mapStateToProps = ({ updateAccountDetailsForm }) => ({
  updateAccountDetailsForm,
});

const ConfirmationUpsellFormValidation = createValidator({
  username: [required],
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'updateAccountDetailsForm',
    validate: ConfirmationUpsellFormValidation,
    enableReinitialize: true,
  })(ConfirmationUpsellForm)
);
