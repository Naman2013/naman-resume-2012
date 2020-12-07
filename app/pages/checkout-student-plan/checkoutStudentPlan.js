import React, { Component, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion';
import { Container, Row, Col, CardSubtitle, CardText, Button } from 'react-bootstrap';


class checkoutStudentPlan extends Component {
    static defaultProps = {};

    state = {};

    render() {

        return (
            <>
                <div className="main-info">
                    <Container>
                        <div className="mt-4 pt-4 mb-4">
                            <h1 className="text-center text-dark">Join The Slooh Universe</h1>
                            <p className="text-center text-dark">Complete Your Order</p>
                        </div>

                        <Row>
                            <Col md="4">
                                <CheckoutPlan />
                            </Col>
                            <Col md="8">
                                <Accordion />
                            </Col>

                        </Row>
                    </Container>

                </div>
            </>
        );
    }
}

export default checkoutStudentPlan;
