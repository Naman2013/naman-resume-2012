import React from 'react';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { Col, Container, Row } from 'react-bootstrap';

const AccountDetailsHeader = props => {
  const { title, noEdit } = props;
  return (
    <DeviceContext.Consumer>
      {context => (
        <Container>
          <Row className="align-items-center">
            <Col
              md={context.isMobile || noEdit ? 12 : 8}
              className={
                context.isMobile ? 'flex-row justify-content-center' : null
              }
            >
              <h2 className="h-2 h-2-primary h-2-bold">{title}</h2>
            </Col>

            <hr className="hr margin-top-10 pad-bot-15 left-right-15" />
          </Row>
        </Container>
      )}
    </DeviceContext.Consumer>
  );
};

export { AccountDetailsHeader };
