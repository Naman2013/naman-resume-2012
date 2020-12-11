import React, { Component, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion';
import { Container, Row, Col, CardSubtitle, CardText, Button } from 'react-bootstrap';
import TitleHeader from './component/title-header';

class checkoutStudentPlan extends Component {
    static defaultProps = {};

    state = {};

    render() {

        return (
            <>
                <div className="check-out-stu">
                    <Container>
                        <TitleHeader
                            heading="Join the Slooh Universe"
                            subHeading="Complete your order"
                        />
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
