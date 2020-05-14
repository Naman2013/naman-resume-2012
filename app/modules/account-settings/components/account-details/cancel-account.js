
import React, { useState } from 'react';
import { browserHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import UpgradeModal from '../../containers/upgrade-modal';
import { AccountDetailsHeader } from './header';

const CancelAccount = props => {
  const {
    canUserCancelTheirAccount,
    isCancellationInProgress,
    cancelInstructionalText,
    cancelButtonText,
    cancelHeading,
  } = props.accountCancelSection;

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    <DeviceContext.Consumer>
      {context => (
        <div className="top-bot-40 left-right-minus-20">

          <Row noGutters>
            <AccountDetailsHeader title={cancelHeading} showhr={true}/>
            <Container>
              <div className="i-box i-box-white pad-40 margin-bot-10 min-height-150">
                <Row>
                  <Col md={7}>
                    <h2 className="h-4">{cancelInstructionalText}</h2>
                  </Col>
                  <Col md={5} className="row-reverse">
                    {canUserCancelTheirAccount == true && <Btn onClick={() => setModalOpen(true)}>{cancelButtonText}</Btn>}
                  </Col>
                </Row>
              </div>
            </Container>
          </Row>
        </div>
      )}
    </DeviceContext.Consumer>

    {isModalOpen && (
      <UpgradeModal subscriptionPlansCallSource="downgrade" show={isModalOpen} onHide={() => setModalOpen(false)} />
    )}
    </>
  );
};

export { CancelAccount };
