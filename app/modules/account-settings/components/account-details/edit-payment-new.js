
import React, { useState } from 'react';
import { browserHistory } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { DeviceContext } from 'app/providers/DeviceProvider';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import EditPaymentModal from '../../containers/editpayment-modal';
import { AccountDetailsHeader } from './header';

const EditPaymentNew = props => {
  const {
    canUserEditPayment,
    editPaymentMethod,
    editPaymentMethod2,
    editPaymentButtonText,
    editPaymentHeading,
    editPaymentHeading2,
    curPaymentInfo,
  } = props.editPaymentSection;

  const {onbtnClick}=props;
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    <DeviceContext.Consumer>
      {context => (
        <div className="bot-20">
          <Row noGutters>
            <AccountDetailsHeader headerClass={'h-2 h-2-md text-no-transform'} hrclass={"hr left-right-15"} title={editPaymentHeading} showhr={true}/>
            
            <Container className="container-no-pad">
            <h2 className="h-2 h3-md col-md-12 text-no-transform">{editPaymentHeading2}</h2>            
              <div className="i-box i-box-white pad-10 thick-shadow">
                <Row>
                  <Col md={7}>
                    <h2 className="h-2 h3-md text-no-transform">{editPaymentMethod}</h2>
		                <br/>
                    <h2 className="h-2 h3-md text-no-transform">{editPaymentMethod2}</h2>
                    <h2 className="h-2 h3-md text-no-transform">{curPaymentInfo.paymentTypeStr}</h2>
                    {curPaymentInfo.hasExpirationDate === true && <h2 className="h-2 h3-md text-no-transform">Expiration Date: {curPaymentInfo.expirationDate}</h2>}
                  </Col>
                  <Col md={5} className="row-reverse">
                    {canUserEditPayment == true && <Btn onClick={onbtnClick}>{editPaymentButtonText}</Btn>}
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

export { EditPaymentNew };
