// @flow
import React, { Fragment, PureComponent } from 'react';
import { browserHistory } from 'react-router';
import { Field } from 'redux-form';
import InputField from 'app/components/form/InputField';
import { Container, Row, Col } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import { TFormField, TTypeSectionItem } from '../../types';
import img from './image-temp.png';

type TAccountDetails = {
  accountTypeSection: Array<TTypeSectionItem>,

  // mocked
  accountDetailsOptions: Array<TFormField>,
  paymentDetailsOptions: Array<TFormField>,
};

const AccountDetails = (props: TAccountDetails) => {
  const {
    accountTypeSection,
    accountDetailsOptions,
    paymentDetailsOptions,
  } = props;
  if (!accountTypeSection && !accountTypeSection.length) return null;
  const {
    currentSubscriptionPlan,
    accountTypeHeading,
    accountStatusLabel,
    accountStatus,
  } = accountTypeSection;

  return (
    <Fragment>
      <AccountType
        currentSubscriptionPlan={currentSubscriptionPlan}
        accountTypeHeading={accountTypeHeading}
        accountStatusLabel={accountStatusLabel}
        accountStatus={accountStatus}
      />

      <AccountDetailsHeader title="Account details" />

      <div className="margin-40-20">
        <Container fluid>
          {accountDetailsOptions.map((option, i) => {
            return <AccountOptionRow key={i} i={i} {...option} />;
          })}
        </Container>
      </div>

      <AccountDetailsHeader title="Payment details" />

      <div className="margin-40-20">
        <Container fluid>
          {paymentDetailsOptions.map((option, i) => {
            return <AccountOptionRow key={i} i={i} {...option} />;
          })}
        </Container>
      </div>
    </Fragment>
  );
};

const AccountType = props => {
  const {
    currentSubscriptionPlan,
    accountTypeHeading,
    accountStatusLabel,
    accountStatus,
  } = props;
  if (!currentSubscriptionPlan) return null;
  const {
    imageUrl,
    isUpgradeAvailable,
    nextRenewalDate,
    planId,
    planInfoUrl,
    planName,
    priceDisplayLabel,
    startDateText,
    upgradeButtonLabel,
  } = currentSubscriptionPlan;
  const styleBg = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  };

  const goToPlanInfoUrl = () => {
    const { localStorage } = window;
    localStorage.setItem('selectedPlanId', planId);
    if (localStorage.getItem('selectedPlanId')) {
      browserHistory.push(planInfoUrl);
    }
  };

  const renderActions = () => {
    return (
      <div className="btn-group pad-top-20 pad-bot-40">
        <Btn mod="circle" onClick={goToPlanInfoUrl}>
          <Icon i="info" />
        </Btn>
        {isUpgradeAvailable && <Btn>{upgradeButtonLabel}</Btn>}
      </div>
    );
  };
  return (
    <DeviceContext.Consumer>
      {context => (
        <div
          className="pad-40-20 shadow"
          style={context.isTablet ? styleBg : null}
        >
          <Container>
            <Row noGutters>
              {context.isDesktop ? (
                <Col md={4}>
                  <div className="i-image">
                    <img src={imageUrl} alt="" />
                  </div>
                </Col>
              ) : null}

              <Col md={context.isDesktop ? 8 : 12} className="flex-col">
                <div className="i-box i-box-white pad-40 no-bottom-pad">
                  <h4 className="h-4 pad-bot-20 font-weight-normal">
                    {accountTypeHeading}
                  </h4>
                  <hr className="hr" />
                  <h2 className="h-2 h-2-lg h-2-dark pad-top-15 pad-bot-10">
                    {planName}
                  </h2>
                  <hr className="hr" />
                  <ul className="list-with-params">
                    <li>
                      <h5 className="h-5 font-weight-normal">
                        {priceDisplayLabel}
                      </h5>
                    </li>
                    <li>
                      <h5 className="h-5 font-weight-normal">
                        {startDateText}
                      </h5>
                    </li>
                    <li>
                      <h5 className="h-5 font-weight-normal">
                        {nextRenewalDate}
                      </h5>
                    </li>
                    <li>
                      <h5 className="h-5 font-weight-normal">
                        {accountStatusLabel}
                        {accountStatus}
                      </h5>
                    </li>
                  </ul>

                  {renderActions()}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </DeviceContext.Consumer>
  );
};

const AccountDetailsHeader = props => {
  const { title } = props;
  return (
    <DeviceContext.Consumer>
      {context => (
        <div className="margin-40-20">
          <Container fluid>
            <Row className="align-items-center">
              <Col
                md={context.isMobile ? 12 : 8}
                className={
                  context.isMobile ? 'flex-row justify-content-center' : null
                }
              >
                <h2 className="h-2 h-2-primary h-2-bold">{title}</h2>
              </Col>

              <Col
                md={context.isMobile ? 12 : 4}
                className={
                  context.isMobile
                    ? 'flex-row justify-content-center margin-top-10'
                    : 'row-reverse'
                }
              >
                <Btn>
                  Edit all <Icon i="pencil" />
                </Btn>
              </Col>

              <hr className="hr margin-top-10 pad-bot-15 left-right-15" />
            </Row>
          </Container>
        </div>
      )}
    </DeviceContext.Consumer>
  );
};

class AccountOptionRow extends PureComponent {
  state = { editableId: null };

  onClick = id => () => {
    this.setState({ editableId: id });
  };

  render() {
    const { i, name, type } = this.props;
    const { editableId } = this.state;
    // TODO: replace with normal id
    const id = `${i}${name}`;

    return (
      <DeviceContext.Consumer>
        {context => (
          <div
            onClick={this.onClick(id)}
            className="i-box i-box-white pad-40 margin-bot-10"
          >
            <Row>
              <Col md={context.isDesktop ? 6 : 12}>
                <h4 className="h-4 h-4-normal">{name}</h4>

                <div className="margin-top-10">
                  <h2 className="h-2 h-2-md text-capitalize">
                    {editableId === id ? (
                      <Field
                        name="password"
                        type="password"
                        className="form-field ml-0 test"
                        label={type}
                        component={InputField}
                      />
                    ) : (
                      <span>{type}</span>
                    )}
                  </h2>
                </div>
              </Col>

              {context.isDesktop ? (
                <Col md={6} className="row-reverse">
                  {editableId === id ? (
                    <div className="btn-group margin-top-15">
                      <Btn>Submit</Btn>
                      <Btn>Cancel</Btn>
                    </div>
                  ) : (
                    <Btn mod="block-140">Edit</Btn>
                  )}
                </Col>
              ) : null}
            </Row>
          </div>
        )}
      </DeviceContext.Consumer>
    );
  }
}

export { AccountDetails };
