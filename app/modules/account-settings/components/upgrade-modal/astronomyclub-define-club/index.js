/***********************************
 * V4 Join
 ***********************************/

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';
import { browserHistory } from 'react-router';
import Button from 'app/components/common/style/buttons/Button';
import Request from 'app/components/common/network/Request';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  JOIN_PAGE_ENDPOINT_URL,
  SUBSCRIPTION_PLANS_ENDPOINT_URL,
  GOOGLE_CLIENT_ID_ENDPOINT_URL,
  GOOGLE_SSO_SIGNIN_ENDPOINT_URL,
  JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL,
  VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL,
} from 'app/services/registration/registration.js';
import { DeviceContext } from 'app/providers/DeviceProvider';
import styles from 'app/pages/registration/JoinStep2.style';
import messages from 'app/pages/registration/JoinStep2.messages';

const { string, func } = PropTypes;

class AstronomyClubDefineClubGeneral extends Component {
  static propTypes = {
    change: func,
    intl: intlShape.isRequired,
    goNext: func,
  };

  static defaultProps = {
    change: noop,
  };

  constructor(props) {
    super(props);

    /* Configure the default state for:
      accountFormDetails - the details and data values of the account signup form
    */

    //reset all relevant localstorage
    window.localStorage.removeItem('isAstronomyClub');
    window.localStorage.removeItem('astronomyClubName');
    window.localStorage.removeItem('astronomyClub18AndOver');

    this.state = {
      isAstronomyClub: false,
      isAgeRestricted: true,
      isClassroom: false,
      googleProfileData: {
        googleProfileId: '',
        googleProfileEmail: '',
        googleProfileGivenName: '',
        googleProfileFamilyName: '',
        googleProfilePictureURL: '',
      },
      accountFormDetails: {
        astronomyClubName: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
        astronomyClub18AndOver: {
          label: '',
          visible: true,
          value: false,
          hintText: '',
          errorText: '',
        },
      },
    };
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = result => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);

    newAccountFormData.astronomyClubName.label =
    result.formFieldLabels.astronomyClubName.label;
    newAccountFormData.astronomyClub18AndOver.label =
    result.formFieldLabels.astronomyClub18AndOver.label;

    newAccountFormData.astronomyClubName.hintText =
    result.formFieldLabels.astronomyClubName.hintText;
    newAccountFormData.astronomyClub18AndOver.hintText =
    result.formFieldLabels.astronomyClub18AndOver.hintText;

    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      isAstronomyClub: result.selectedSubscriptionPlan.isAstronomyClub,
      isClassroom: result.selectedSubscriptionPlan.isClassroom,
      accountFormDetails: newAccountFormData,
      isAgeRestricted: result.selectedSubscriptionPlan.isAgeRestricted,
    }));
  };

  /* This function handles a field change in the form and sets the state accordingly */
  handleFieldChange = ({ field, value }) => {
    /* Get the existing state of the signup form, modify it and re-set the state */
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    newAccountFormData[field].value = value;

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

    const { intl } = this.props;

    const accountFormDetailsData = cloneDeep(accountFormDetails);

    /* reset the error conditions */
    accountFormDetailsData.astronomyClubName.errorText = '';

    /* Special Verifications if this is an Astronomy Club */
    if (this.state.isAstronomyClub) {
      if (accountFormDetailsData.astronomyClubName.value === '') {
          accountFormDetailsData.astronomyClubName.errorText = intl.formatMessage(
          messages.AstronomyClubRequierMessage
        );
        formIsComplete = false;
      }
    }

    if (formIsComplete === true) {
      window.localStorage.setItem('isAstronomyClub', this.state.isAstronomyClub )
      window.localStorage.setItem('astronomyClubName', accountFormDetailsData.astronomyClubName.value);
      window.localStorage.setItem('astronomyClub18AndOver', this.state.accountFormDetails.astronomyClub18AndOver.value);
      this.props.goNext();
    }
  };

  render() {
    const {
      accountFormDetails,
      isAstronomyClub,
    } = this.state;

    const selectedPlanId = this.props.selectedPlan.planID;

    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'setupCredentials',
            selectedPlanId,
          }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({ fetchingContent, serviceResponse: joinPageRes }) => (
            <Fragment>
              {!fetchingContent && selectedPlanId && (
                <DeviceContext.Consumer>
                  {({ isMobile, isDesktop, isTablet }) => (
                    <Fragment>
                      <h1 className="modal-h">Astronomy Club Set Up</h1>
                      <p className="modal-p mb-5">We need a few more details to complete your astronomy club account.</p>

                      <div className="step-root">
                        <DisplayAtBreakpoint
                          screenMedium
                          screenLarge
                          screenXLarge
                        >
                        </DisplayAtBreakpoint>
                        <div className="inner-container">
                          <div className="section-heading">
                            Astronomy Club Details
                          </div>
                          <form onSubmit={this.handleSubmit}>
                            {isAstronomyClub ? (
                              <div className="form-section">
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.astronomyClubName
                                          .label,
                                    }}
                                  />
                                  :
                                  <span
                                    className="form-error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails.astronomyClubName
                                          .errorText,
                                    }}
                                  />
                                  <Field
                                    className="form-field"
                                    name="astronomyClubName"
                                    type="name"
                                    label={
                                      accountFormDetails.astronomyClubName
                                        .hintText
                                    }
                                    component={InputField}
                                    onChange={event => {
                                      this.handleFieldChange({
                                        field: 'astronomyClubName',
                                        value: event.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                <br/>
                                <div className="form-field-container">
                                  <span
                                    className="form-label"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        accountFormDetails
                                          .astronomyClub18AndOver.label,
                                    }}
                                  />
                                  :
                                  <Field
                                    className="form-field"
                                    name="astronomyClub18AndOver"
                                    component={InputField}
                                    type="checkbox"
                                    onChange={event => {
                                      this.handleFieldChange({
                                        field: 'astronomyClub18AndOver',
                                        value: event.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            ) : null}

                            <div style={{float: "right"}}  className="button-container">
                              <button className="submit-button" type="submit">
                                <FormattedMessage {...messages.GoToPayment} />
                              </button>
                            </div>
                            <br/>
                            <br/>
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

const mapStateToProps = ({ joinAccountForm }) => ({
  joinAccountForm,
});

const joinStep2Validation = createValidator({
  username: [required],
});

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({
    form: 'joinAccountForm',
    validate: joinStep2Validation,
    enableReinitialize: true,
  })(injectIntl(AstronomyClubDefineClubGeneral))
);
