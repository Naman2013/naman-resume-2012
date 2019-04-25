// @flow
import React, { Fragment } from 'react';
import { Container, Row } from 'react-bootstrap';
import { AccountDetailsHeader } from './header';
import { AccountOptionRow } from './option-row';
import { AccountType } from './account-type';
import { TFormField, TTypeSectionItem } from '../../types';

type TAccountDetails = {
  accountTypeSection: Object<TTypeSectionItem>,
  accountDetails: Object<TFormField>,
  accountCancelSection: Object<TFormField>,
};

// mocked
const mockedPaymentDetailsOptions = [
  { count: 1, name: 'Payment method', type: 'Credit card' },
  { count: 2, name: 'Reset password', type: '********' },
];

const mockedTitle = 'Payment details';

const AccountDetails = (props: TAccountDetails) => {
  const { accountTypeSection, accountDetails, accountCancelSection } = props;
  if (!accountTypeSection && !accountTypeSection.length) return null;
  const {
    currentSubscriptionPlan,
    accountTypeHeading,
    accountStatusLabel,
    accountStatus,
  } = accountTypeSection;

  const getFormFields = data => {
    return data ? Object.values(data).map(item => item) : [];
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
                    i={i}
                    {...el}
                    key={`${el.label}-${el.currentValue}`}
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
                return <AccountOptionRow key={i} i={i} {...option} />;
              })}
            </Container>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export { AccountDetails };
