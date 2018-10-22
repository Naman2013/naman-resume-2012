/** **********************************************************************************
* V4 Join with an Invitation Code - Enter Email Address/Invitation Code
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'components/form/InputField';
import { createValidator, required } from 'modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';
import JoinHeader from './partials/JoinHeader';

import {
  JOIN_PAGE_ENDPOINT_URL,
  JOIN_VALIDATE_INVITATIONCODE_ENDPOINT_URL,
} from 'services/registration/registration.js';
import styles from './JoinStep2.style';

const {
  string,
  func,
} = PropTypes;

class JoinByInviteCodeStep1 extends Component {
  static propTypes = {
    pathname: string.isRequired,
    change: func,
  };
  static defaultProps = {
    change: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      accountFormDetails: {
        loginEmailAddress: {
          label: '',
          editable: true,
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        invitationCode: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
      },
    }
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = (result) => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);

    newAccountFormData.loginEmailAddress.label = result.formFieldLabels.loginemailaddress.label;
    newAccountFormData.invitationCode.label = result.formFieldLabels.invitationcode.label;

    newAccountFormData.loginEmailAddress.hintText = result.formFieldLabels.loginemailaddress.hintText;
    newAccountFormData.invitationCode.hintText = result.formFieldLabels.invitationcode.hintText;

    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  }

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    newAccountFormData[field].value = value;

    this.setState(() => ({
      accountFormDetails: newAccountFormData,
    }));
  }

  /* Submit the Join Form and perform any validations as needed */
  handleSubmit = (formValues) => {
    formValues.preventDefault();
    //console.log(this.state.accountFormDetails);

    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;
    const {
      accountFormDetails,
    } = this.state;

    const accountFormDetailsData = cloneDeep(accountFormDetails);

    /* reset the error conditions */
    accountFormDetailsData.loginEmailAddress.errorText = '';
    accountFormDetailsData.invitationCode.errorText = '';

    if (accountFormDetailsData.loginEmailAddress.value === '') {
      accountFormDetailsData.loginEmailAddress.errorText = 'Please enter in your email address.';
      formIsComplete = false;
    }

    if (accountFormDetailsData.invitationCode.value === '') {
      accountFormDetailsData.invitationCode.errorText = 'Please enter in your invitation code.';
      formIsComplete = false;
    }

    if (formIsComplete === true) {
      /* Validate the Invitation Email Address and Code */

      const validInvitationCodeResult = axios.post(JOIN_VALIDATE_INVITATIONCODE_ENDPOINT_URL, {
        invitationCode: this.state.accountFormDetails.invitationCode.value,
        loginEmailAddress: this.state.accountFormDetails.loginEmailAddress.value,
      })
      .then((response) => {
        const res = response.data;
        if (res.apiError == false) {
          const invitationResult = {
            isInvitationValid: res.isInvitationValid,
            invitationNotValidMessage: res.invitationNotValidMessage,
          }

          /* need to force evaulation of "true"/"false" vs. true/false. */
          if (invitationResult.isInvitationValid === "true") {
            formIsComplete = true;

            /* set the email address and the invitation code */
            window.localStorage.setItem('inviteeEmailAddress', this.state.accountFormDetails.loginEmailAddress.value);
            window.localStorage.setItem('invitationCodeAlt', this.state.accountFormDetails.invitationCode.value);

            browserHistory.push('/join/inviteByCodeStep2');
          } else {
                /* Invitation Validation failed */
                accountFormDetailsData.invitationCode.errorText = invitationResult.invitationNotValidMessage;

                /* make sure to persist any changes to the account signup form (error messages) */
                this.setState({ accountFormDetails: accountFormDetailsData });

                formIsComplete = false;
              }
            }
          })
          .catch((err) => {
            throw ('Error: ', err);
          });
    } else {
      /* make sure to persist any changes to the account signup form (error messages) */
      this.setState(() => ({ accountFormDetails: accountFormDetailsData }));
    }
  }

  render() {
    const { pathname } = this.props;
    const {
      accountFormDetails,
    } = this.state;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ 'callSource': 'joinByInvitationAltStep1' }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({
            fetchingContent,
            serviceResponse: joinPageRes,
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                    <JoinHeader
                      mainHeading={joinPageRes.pageHeading1}
                      subHeading={joinPageRes.pageHeading2}
                      activeTab={pathname}
                    />
                    <div className="step-root">
                      <div className="inner-container">
                        <div className="section-heading">{joinPageRes.sectionHeading}</div>
                          <form onSubmit={this.handleSubmit}>
                            <div className="form-section">
                              <div className="form-field-container">
                                <span className="form-label" dangerouslySetInnerHTML={{ __html: accountFormDetails.loginEmailAddress.label }} />:
                                <span className="form-error" dangerouslySetInnerHTML={{ __html: accountFormDetails.loginEmailAddress.errorText }} />
                              </div>
                              <Field name="loginEmailAddress"
                                type="text"
                                className="form-field"
                                label={accountFormDetails.loginEmailAddress.hintText}
                                component={InputField}
                                onChange={(event) => { this.handleFieldChange({ field: 'loginEmailAddress', value: event.target.value }); }}
                              />
                            </div>

                            <div className="form-section">
                              <div className="form-field-container">
                                <span className="form-label" dangerouslySetInnerHTML={{ __html: accountFormDetails.invitationCode.label }} />:
                                <span className="form-error" dangerouslySetInnerHTML={{ __html: accountFormDetails.invitationCode.errorText }} />
                              </div>
                              <Field
                                name="invitationCode"
                                type="text"
                                className="form-field"
                                label={accountFormDetails.invitationCode.hintText}
                                component={InputField}
                                onChange={(event) => { this.handleFieldChange({ field: 'invitationCode', value: event.target.value }); }}
                              />
                            </div>
                            <div className="button-container">
                              <Button
                                type="button"
                                text="Go Back"
                                onClickEvent={() => { browserHistory.push('/'); }}
                              />
                              <button
                                className="submit-button"
                                type="submit"
                              >Continue
                              </button>
                            </div>
                          </form>
                      </div>
                    </div>
                  </Fragment>
                }
                </Fragment>
              )}
            />
          <style jsx>{styles}</style>
      </div>
    )
  }
}


const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

export default connect(mapStateToProps, null)(reduxForm({ form: 'joinAccountForm', enableReinitialize: true, })(JoinByInviteCodeStep1));
