// @flow
import React, { PureComponent, Fragment } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import { Col, Container, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import { Modal } from '../../../../components/modal';
import { AccountDetailsHeader } from './header';
import { AccountOptionRow } from './option-row';
import { AccountType } from './account-type';
import { TFormField, TTypeSectionItem } from '../../types';

type TAccountDetails = {
  accountTypeSection: Object<TTypeSectionItem>,
  accountDetails: Object<TFormField>,
  accountCancelSection: Object<TFormField>,
  fetchAccountFormFieldAction: Function,
};

// mocked
const mockedPaymentDetailsOptions = [
  {
    label: 'Payment method',
    currentValue: 'Credit card',
    formFieldName: 'payment',
  },
  {
    label: 'Reset password',
    currentValue: '********',
    formFieldName: 'password',
  },
];

const mockedTitle = 'Payment details';

class AccountDetails extends PureComponent<TAccountDetails> {
  render() {
    const {
      accountTypeSection,
      accountDetails,
      fetchAccountFormFieldAction,
      accountCancelSection,
      resetPassword,
      accountEmail,
      dismissResetPasswordPopup,
      showForgetPasswordPopup,
      forgetPasswordPopupText,
    } = this.props;
    if (isEmpty(accountTypeSection)) return null;
    const {
      currentSubscriptionPlan,
      accountTypeHeading,
      accountStatusLabel,
      accountStatus,
    } = accountTypeSection;
    const {
      userCancellationHeading1,
      userCancellationInstructionsText,
      userCancellationInProgressExplaination,
      userCancellationInProgress,
      canUserCancelTheirAccount,
    } = accountCancelSection;

    const getFormFields = data => {
      return data
        ? Object.entries(data).map(item => {
            return {
              formFieldName: item[0],
              currentValue: item[1].currentValue,
              hintText: item[1].hintText,
              label: item[1].label,
            };
          })
        : [];
    };

    const formFields = getFormFields(accountDetails.formFields);

    return (
      <Fragment>
        <AccountType
          currentSubscriptionPlan={currentSubscriptionPlan}
          accountTypeHeading={accountTypeHeading}
          accountStatusLabel={accountStatusLabel}
          accountStatus={accountStatus}
        />

        <Container>
          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <AccountDetailsHeader
                title={accountDetails.accountDetailsHeading}
              />
            </Row>
          </div>

          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <Container>
                {formFields.map((el, i) => {
                  return (
                    <AccountOptionRow
                      withReset={el.formFieldName === 'displayName'}
                      i={i}
                      {...el}
                      key={`${el.label}-${el.currentValue}`}
                      fetchAccountFormFieldAction={fetchAccountFormFieldAction}
                    />
                  );
                })}
              </Container>
            </Row>
          </div>

          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <AccountDetailsHeader title={mockedTitle} />
            </Row>
          </div>

          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <Container>
                {mockedPaymentDetailsOptions.map((option, i) => {
                  return (
                    <AccountOptionRow
                      key={i}
                      i={i}
                      {...option}
                      isPassword={option.formFieldName === 'password'}
                      resetPassword={resetPassword}
                      email={accountEmail}
                    />
                  );
                })}
              </Container>
            </Row>
          </div>

          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <AccountDetailsHeader title={userCancellationHeading1} noEdit />
            </Row>
          </div>

          <div className="top-bot-40 left-right-minus-20">
            <Row noGutters>
              <Container>
                <div className="i-box i-box-white pad-40 margin-bot-10 min-height-150">
                  <Row>
                    <Col md={7}>
                      {userCancellationInstructionsText}
                      {userCancellationInProgressExplaination}
                    </Col>
                    <Col md={5} className="row-reverse">
                      {canUserCancelTheirAccount && (
                        <div className="btn-group margin-top-15">
                          <Btn>Cancel</Btn>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </Container>
            </Row>
          </div>
        </Container>
        <Modal
          show={showForgetPasswordPopup}
          onHide={dismissResetPasswordPopup}
        >
          <div dangerouslySetInnerHTML={{ __html: forgetPasswordPopupText }} />
          <Btn onClick={dismissResetPasswordPopup}>Close</Btn>
        </Modal>
      </Fragment>
    );
  }
}

export { AccountDetails };
