import React, { Fragment, useState } from 'react';
import { browserHistory } from 'react-router';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import UpgradeModal from '../../containers/upgrade-modal';
import './account-type.scss';

const AccountType = props => {
  const {
    currentSubscriptionPlan,
    accountTypeHeading,
    accountStatusLabel,
    accountStatus,
    showInfoButton,
  } = props;

  const [isModalOpen, setModalOpen] = useState(false);

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
    showPricingInformation,
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

  const renderActions = showInfoButton => {
    return (
      <div className="btn-group pad-top-15">
        {showInfoButton === true && (
          <Fragment>
            <Btn mod="circle" onClick={goToPlanInfoUrl}>
              <Icon i="info" />
            </Btn>
            {isUpgradeAvailable === true ? 
             <Button onClick={() => setModalOpen(true)}>
             {upgradeButtonLabel}
           </Button>
           :null
            }
          </Fragment>
        )}
        {showInfoButton === false && (
          <p style={{ paddingTop: '22px' }}>&nbsp;</p>
        )}
      </div>
    );
  };
  return (
    <>
      <DeviceContext.Consumer>
        {context => (
          <div
            className="account-general"
            style={context.isTablet ? styleBg : null}
          >
            <Container>
              <Row noGutters>
                {context.isDesktop ? (
                  <Col md={4} className="account-general__image">
                    <div className="i-image">
                      <img src={imageUrl} alt="" />
                    </div>
                  </Col>
                ) : null}

                <Col md={context.isDesktop ? 8 : 12} className="flex-col">
                  <div className="account-general__info">
                    <div className="i-box i-box-white pad-40 no-bottom-pad">
                      <h4 className="h-4 pad-bot-20 font-weight-normal">
                        {accountTypeHeading}
                      </h4>
                      <hr className="hr" />
                      <h2 className="h-2 h-2-lg h-2-dark pad-top-15 pad-bot-10 text-capitalize">
                        {planName}
                      </h2>
                      <hr className="hr" />
                      <ul className="list-with-params">
                        {showPricingInformation && (
                          <li>
                            <h5
                              className="h-5 font-weight-normal"
                              dangerouslySetInnerHTML={{
                                __html: priceDisplayLabel,
                              }}
                            />
                          </li>
                        )}
                        
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

                      <div className="account-general__info__actions">
                        {renderActions(showInfoButton)}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </DeviceContext.Consumer>

      {isModalOpen && (
        <UpgradeModal
          subscriptionPlansCallSource="upgrade"
          show={isModalOpen}
          onHide={() => setModalOpen(false)}
          returnLinkType={"closeandrefresh"}
          returnLinkLabel={"CANCEL"}
        />
      )}
    </>
  );
};

export { AccountType };
