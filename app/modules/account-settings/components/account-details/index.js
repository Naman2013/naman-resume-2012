// @flow
import React, { PureComponent, Fragment } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import { Container, Row } from 'react-bootstrap';
import Btn from 'app/atoms/Btn';
import { Modal } from '../../../../components/modal';
import { AccountDetailsHeader } from './header';
import { AccountOptionRow } from './option-row';
import { AccountType } from './account-type';
import { CancelAccount } from './cancel-account';
import { EditPayment } from './edit-payment';
import { TFormField, TTypeSectionItem } from '../../types';
import UpgradeModal from '../../containers/upgrade-modal';

type TAccountDetails = {
  accountTypeSection: Object<TTypeSectionItem>,
  accountDetails: Object<TFormField>,
  accountCancelSection: Object<TFormField>,
  fetchAccountFormFieldAction: Function,
};

// mocked
const mockedPaymentDetailsOptions = [
  {
    label: 'Reset password',
    currentValue: '********',
    formFieldName: 'password',
  },
];

class AccountDetails extends PureComponent<TAccountDetails> {
  render() {
    const {
      accountTypeSection,
      accountDetails,
      fetchAccountFormFieldAction,
      resetPassword,
      accountEmail,
      dismissResetPasswordPopup,
      showForgetPasswordPopup,
      forgetPasswordPopupText,
      isModalOpen,
      setModalOpen,
    } = this.props;

    if (isEmpty(accountTypeSection)) return null;

    const {
      currentSubscriptionPlan,
      accountTypeHeading,
      accountStatusLabel,
      accountStatus,
    } = accountTypeSection;

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
      <>
        <Fragment>
          <AccountType
            currentSubscriptionPlan={currentSubscriptionPlan}
            accountTypeHeading={accountTypeHeading}
            accountStatusLabel={accountStatusLabel}
            accountStatus={accountStatus}
            showInfoButton
          />
          <Container>
            <div className="top-bot-40 left-right-minus-20">
              <Row noGutters>
                <AccountDetailsHeader
                  title={accountDetails.accountDetailsHeading}
                  showhr={true}
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
                        fetchAccountFormFieldAction={
                          fetchAccountFormFieldAction
                        }
                      />
                    );
                  })}
                </Container>
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

            <EditPayment {...this.props} />

            <CancelAccount {...this.props} />
          </Container>

          <Modal
            show={showForgetPasswordPopup}
            onHide={dismissResetPasswordPopup}
          >
            <div
              className="color-white"
              dangerouslySetInnerHTML={{ __html: forgetPasswordPopupText }}
            />
            <Btn className="color-white" onClick={dismissResetPasswordPopup}>
              Close
            </Btn>
          </Modal>
        </Fragment>

        {isModalOpen && (
          <UpgradeModal
            subscriptionPlansCallSource="downgrade"
            show={isModalOpen}
            onHide={() => setModalOpen(false)}
          />
        )}
      </>
    );
  }
}

export { AccountDetails };
