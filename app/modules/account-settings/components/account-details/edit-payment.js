
import React, { useState } from 'react';
import { browserHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import EditPaymentModal from '../../containers/editpayment-modal';
import { AccountDetailsHeader } from './header';

const EditPayment = props => {
  const {
    canUserEditPayment,
    editPaymentMethod,
    editPaymentMethod2,
    editPaymentButtonText,
    editPaymentHeading,
    curPaymentInfo,
  } = props.editPaymentSection;

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    <DeviceContext.Consumer>
      {context => (
        <div className="top-bot-40 left-right-minus-20">

          <Row noGutters>
            <AccountDetailsHeader title={editPaymentHeading} showhr={true}/>
            <Container>
              <div className="i-box i-box-white pad-40 margin-bot-10 min-height-150">
                <Row>
                  <Col md={7}>
                    <h2 className="h-4">{editPaymentMethod}</h2>
		                <br/>
                    <h2 className="h-2 h-2-md text-no-transform">{editPaymentMethod2}</h2>
                    <h2 className="h-2 h3-md text-no-transform">{curPaymentInfo.paymentTypeStr}</h2>
                    {curPaymentInfo.hasExpirationDate === true && <h2 className="h-2 h3-md text-no-transform">Expiration Date: {curPaymentInfo.expirationDate}</h2>}
                  </Col>
                  <Col md={5} className="row-reverse">
                    {canUserEditPayment == true && <Btn onClick={() => setModalOpen(true)}>{editPaymentButtonText}</Btn>}
                  </Col>
                </Row>
              </div>
            </Container>
          </Row>
        </div>
      )}
    </DeviceContext.Consumer>

    {isModalOpen && (
      <EditPaymentModal {...props.editPaymentSection} show={isModalOpen} onHide={() => setModalOpen(false)} />
    )}
    </>
  );
};

export { EditPayment };
