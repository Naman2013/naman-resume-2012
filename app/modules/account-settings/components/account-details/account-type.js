import React from 'react';
import { browserHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';

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
    backgroundImage: `url(${imageUrl})`,
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

export { AccountType };
