// @flow
import React, {Fragment} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type TAccountDetails = {

};

const AccountDetails = (props: TAccountDetails) => {
  return (
    <section className="account-details">
      <Container>
        <Row noGutters className="shadow">
          <Col md={3}>
            <img src="https://via.placeholder.com/320x300" alt=""/>
          </Col>

          <Col md={9} className="flex-col">
            <div className="i-box i-box-white">
              <h4 className="h-4 text-uppercase">Account type:</h4>
              <hr/>
              <h2>Astronomer</h2>
              <hr/>
              <ul>
                <li><p>$00.oo USD / monthly</p></li>
                <li><p>Joined: Sept. 12, 2018</p></li>
                <li><p>Renews: Oct. 22, 2019</p></li>
                <li><p>Status: active</p></li>
              </ul>
              <hr/>
              <div className="btn-group">
                <button>i</button>
                <button>...</button>
                <button>Upgrade</button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <header>
              <h2 className="h-2 text-uppercase">Account details</h2>
            </header>
          </Col>

          <Col md={4}>
            <header>
              <button>Edit all</button>
            </header>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <header>
              <h4 className="h-4 text-uppercase">Name on account:</h4>
              <h2 className="h-2">John Snow</h2>
            </header>
          </Col>

          <Col md={4}>
            <header>
              <button>Edit</button>
            </header>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { AccountDetails };
