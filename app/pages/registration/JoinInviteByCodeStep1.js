/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { API } from 'app/api';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import InputField from 'app/components/form/InputField';
import { createValidator, required } from 'app/modules/utils/validation';

import Button from 'app/components/common/style/buttons/Button';
import Request from 'app/components/common/network/Request';
import {
  JOIN_PAGE_ENDPOINT_URL,
  JOIN_VALIDATE_INVITATIONCODE_ENDPOINT_URL,
  JOIN_VALIDATE_INVITATION_GIFT_CARD_ENDPOINT_URL,
  JOIN_VALIDATE_INVITATION_CODE_DETAILS_URL,
} from 'app/services/registration/registration.js';
import JoinHeader from './partials/JoinHeader';
import { JOIN_BY_INVITE_TABS } from './StaticNavTabs';
import { Spinner } from 'app/components/spinner/index';
import styles from './JoinStep2.style';
import { logGoogleUserIn } from 'app/modules/login/actions';

const { string, func } = PropTypes;
@withTranslation()
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
          applyGiftCode: ''
        },
        clubInviteAndGiftCard: {
          label: '',
          visible: true,
          value: '',
          hintText: '',
          errorText: '',
        },
      },
    };
  }

  // Obtain access to the join api service response and update the accountFormDetails state to reflect the Join Page response (set form labels)
  handleJoinPageServiceResponse = result => {
    const newAccountFormData = cloneDeep(this.state.accountFormDetails);
    let formFieldData = result.formFieldLabels;
    result.formFieldLabels.map((formFieldData) => {

      newAccountFormData[formFieldData.key].label = formFieldData.label;

      newAccountFormData[formFieldData.key].hintText = formFieldData.hintText;

    })

   /*  newAccountFormData.loginEmailAddress.label =
      result.formFieldLabels.loginEmailAddress.label;
    newAccountFormData.invitationCode.label =
      result.formFieldLabels.invitationCode.label;

    newAccountFormData.loginEmailAddress.hintText =
      result.formFieldLabels.loginEmailAddress.hintText;

    newAccountFormData.invitationCode.hintText =
      result.formFieldLabels.invitationCode.hintText; */

    /* update the account form details state so the correct hinText will show on each form field */
    this.setState(() => ({
      accountFormDetails: newAccountFormData,
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


    //assume the form is ready to submit unless validation issues occur.
    let formIsComplete = true;

    const { accountFormDetails } = this.state;
    const { t } = this.props;

    const accountFormDetailsData = cloneDeep(accountFormDetails);
    /* reset the error conditions */
    accountFormDetailsData.loginEmailAddress.errorText = '';
    accountFormDetailsData.invitationCode.errorText = '';

    if (accountFormDetailsData.loginEmailAddress.value === '') {
      accountFormDetailsData.loginEmailAddress.errorText = t(
        '.PleaseEnterEmail'
      );
      formIsComplete = false;
    }

    if (accountFormDetailsData.invitationCode.value === '') {
      accountFormDetailsData.invitationCode.errorText = t(
        '.PleaseEnterInvitationCode'
      );
      formIsComplete = false;
    }

    if (formIsComplete === true) {
      accountFormDetailsData.isFetching = true;
      const checkGiftCardType = API.post(
        JOIN_VALIDATE_INVITATION_CODE_DETAILS_URL,
        {
          giftCardCode: this.state.accountFormDetails.invitationCode.value,
          loginEmailAddress: this.state.accountFormDetails.loginEmailAddress
            .value,
        }
      ).then(response => {
        const res = response.data;
       
        if (res.apiError == false) {
          const giftCardTypeResult = {
            apiStatusMessage: res.statusMessage,
            checkGiftCodeValid: res.isGiftCodeValid,
            giftCodeMessage: res.giftCodeNotValidMessage,
            apiStatus: res.status,
            invitationCodeType: res.invitationCodeType,
            AccountType: res.AccountType,
          };
          if (giftCardTypeResult.apiStatus === "failed") {


            accountFormDetailsData.loginEmailAddress.errorText = giftCardTypeResult.apiStatusMessage;
            formIsComplete = false;
            accountFormDetailsData.isFetching = false;
            this.setState({ accountFormDetails: accountFormDetailsData });

          }
          if (!giftCardTypeResult.checkGiftCodeValid) {
            /* Invitation Validation failed */

            accountFormDetailsData.invitationCode.errorText = giftCardTypeResult.giftCodeMessage;
            formIsComplete = false;
            accountFormDetailsData.isFetching = false;
            this.setState({ accountFormDetails: accountFormDetailsData });

          }
          /* need to force evaulation of "true"/"false" vs. true/false. */
          if (formIsComplete) {

            /* Gift Code Apply */
            accountFormDetailsData.invitationCode.applyGiftCode = giftCardTypeResult.giftCodeMessage;
            accountFormDetailsData.clubInviteAndGiftCard.value = giftCardTypeResult.invitationCodeType
            window.localStorage.setItem(
              'AccountType',
              giftCardTypeResult.AccountType
            );
            accountFormDetailsData.isFetching = false;
            this.setState({ accountFormDetails: accountFormDetailsData });

          } else {

            accountFormDetailsData.isFetching = false;
            this.setState({ accountFormDetails: accountFormDetailsData });


          }

        }
      }).then(() => {

        if (formIsComplete) {
          /* Validate the Invitation Email Address and Code */
          if (accountFormDetailsData.clubInviteAndGiftCard.value === "SloohCard") {
            const validInvitationCodeResult = API.post(
              JOIN_VALIDATE_INVITATION_GIFT_CARD_ENDPOINT_URL,
              {
                giftCardCode: this.state.accountFormDetails.invitationCode.value,
                loginEmailAddress: this.state.accountFormDetails.loginEmailAddress
                  .value,
                callSource: 'joinbyinvitationaltstep2giftcard',
                accountType: 'Confluence',
                type: accountFormDetailsData.clubInviteAndGiftCard.value,

              }
            )
              .then(response => {
                const res = response.data;
               
                if (res.apiError == false) {
                  const giftCodeResult = {
                    invitationNotValidMessage: res.invitationNotValidMessage,
                    checkGiftCodeValid: res.isGiftCodeValid,
                    giftCodeMessage: res.giftCodeNotValidMessage,
                    apiStatus: res.status,
                    apiStatusMessage: res.statusMessage
                  };

                  if (giftCodeResult.apiStatus === "failed") {
                    accountFormDetailsData.loginEmailAddress.errorText = giftCodeResult.apiStatusMessage;
                    this.setState({ accountFormDetails: accountFormDetailsData });
                    formIsComplete = false;
                  }
                  if (!giftCodeResult.checkGiftCodeValid) {
                    /* Invitation Validation failed */
                    accountFormDetailsData.invitationCode.errorText = giftCodeResult.giftCodeMessage;
                    this.setState({ accountFormDetails: accountFormDetailsData });
                    formIsComplete = false;
                  }
                  /* need to force evaulation of "true"/"false" vs. true/false. */
                  else {
                    if (formIsComplete) {
                      /* set the email address and the invitation code */
                      window.localStorage.setItem(
                        'inviteeEmailAddress',
                        this.state.accountFormDetails.loginEmailAddress.value
                      );
                      window.localStorage.setItem(
                        'invitationCodeAlt',
                        this.state.accountFormDetails.invitationCode.value
                      );
                      window.localStorage.setItem(
                        'clubInviteAndGiftCardDetials',
                        accountFormDetailsData.clubInviteAndGiftCard.value
                      );

                      /* Gift Code Apply */
                      accountFormDetailsData.invitationCode.applyGiftCode = giftCodeResult.giftCodeMessage;
                      this.setState({ accountFormDetails: accountFormDetailsData });

                      browserHistory.push('/join/inviteByCodeStep2')


                    }
                  }
                }
              })
              .catch(err => {
                throw ('Error: ', err);
              });

          } else {

            const validInvitationCodeResult = API.post(
              JOIN_VALIDATE_INVITATIONCODE_ENDPOINT_URL,
              {
                invitationCode: this.state.accountFormDetails.invitationCode.value,
                loginEmailAddress: this.state.accountFormDetails.loginEmailAddress
                  .value,
              }
            )
              .then(response => {
                const res = response.data;

                if (res.apiError == false) {
                  const invitationResult = {
                    isInvitationValid: res.isInvitationValid,
                    invitationNotValidMessage: res.invitationNotValidMessage,
                  };

                  /* need to force evaulation of "true"/"false" vs. true/false. */
                  if (invitationResult.isInvitationValid === 'true') {
                    formIsComplete = true;

                    /* set the email address and the invitation code */
                    window.localStorage.setItem(
                      'inviteeEmailAddress',
                      this.state.accountFormDetails.loginEmailAddress.value
                    );
                    window.localStorage.setItem(
                      'invitationCodeAlt',
                      this.state.accountFormDetails.invitationCode.value
                    );

                    window.localStorage.setItem(
                      'clubInviteAndGiftCardDetials',
                      accountFormDetailsData.clubInviteAndGiftCard.value
                    );

                    browserHistory.push('/join/inviteByCodeStep2');
                  } else {
                    /* Invitation Validation failed */
                    accountFormDetailsData.invitationCode.errorText =
                      invitationResult.invitationNotValidMessage;

                    /* make sure to persist any changes to the account signup form (error messages) */
                    this.setState({ accountFormDetails: accountFormDetailsData });

                    formIsComplete = false;
                  }
                }
              })
              .catch(err => {
                throw ('Error: ', err);
              });
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
  };

  render() {
    const { pathname, t } = this.props;
    const { accountFormDetails } = this.state;
    return (
      <div>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{ callSource: 'joinByInvitationAltStep1' }}
          serviceResponseHandler={this.handleJoinPageServiceResponse}
          render={({ fetchingContent, serviceResponse: joinPageRes }) => (
            <Fragment>
              {!fetchingContent && (
                <Fragment>
                  <JoinHeader
                    mainHeading={joinPageRes.pageHeading1}
                    subHeading={joinPageRes.pageHeading2}
                    activeTab={pathname}
                    tabs={JOIN_BY_INVITE_TABS}
                  />
                  <div className="step-root">
                    <div className="inner-container">
                      <div className="section-heading">
                        {joinPageRes.sectionHeading}
                      </div>
                      <Spinner
                        loading={accountFormDetails.isFetching}
                        text="Please wait..."
                      />
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-section">
                          <div className="form-field-container">
                            <span
                              className="form-label"
                              dangerouslySetInnerHTML={{
                                __html:
                                  accountFormDetails.loginEmailAddress.label,
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
                            type="text"
                            className="form-field"
                            label={
                              accountFormDetails.loginEmailAddress.hintText
                            }
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
                                __html: accountFormDetails.invitationCode.label,
                              }}
                            />
                            :
                            <span
                              className="form-error"
                              dangerouslySetInnerHTML={{
                                __html:
                                  accountFormDetails.invitationCode.errorText,
                              }}
                            />
                            <span
                              className="form-success"
                              dangerouslySetInnerHTML={{
                                __html:
                                  accountFormDetails.invitationCode.applyGiftCode,
                              }}
                            />
                          </div>
                          <Field
                            name="invitationCode"
                            type="text"
                            className="form-field"
                            label={accountFormDetails.invitationCode.hintText}
                            component={InputField}
                            onChange={event => {
                              this.handleFieldChange({
                                field: 'invitationCode',
                                value: event.target.value,
                              });
                            }}
                          />

                          {/*  <fieldset>
                            <div>
                              <label>
                                <Field
                                  name="Invitation"
                                  label="clubInvite"
                                  component="input"
                                  type="radio"
                                  checked={accountFormDetails.clubInviteAndGiftCard.value == "clubInvite"}
                                  value="clubInvite"
                                  onClick={event => {
                                    this.handleFieldChange({
                                      field: 'clubInviteAndGiftCard',
                                      value: event.target.value,
                                    });
                                  }}
                                />{' '}
                                {t('Club Invite')}
                              </label>

                              <span style={{ paddingLeft: '15px' }}>
                                <label>
                                  <Field
                                    name="Invitation"
                                    label="giftInvite"
                                    component="input"
                                    type="radio"
                                    value="SloohCard"
                                    onClick={event => {
                                      this.handleFieldChange({
                                        field: 'clubInviteAndGiftCard',
                                        value: event.target.value,
                                      });
                                    }}
                                  />
                                  {'\u00A0'}
                                  {t('Gift Card')}
                                </label>
                              </span>
                            </div>
                          </fieldset> */}
                        </div>
                        <div className="button-container">
                          <Button
                            type="button"
                            text={t('Ecommerce.GoBack')}
                            onClickEvent={() => {
                              browserHistory.push('/');
                            }}
                          />
                          <button className="submit-button" type="submit">
                            {t('Ecommerce.Continue')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Fragment>
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

export default connect(
  mapStateToProps,
  null
)(
  reduxForm({ form: 'joinAccountForm', enableReinitialize: true })(
    JoinByInviteCodeStep1
  )
);
