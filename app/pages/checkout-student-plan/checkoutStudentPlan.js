import React, { Component, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion'
import {
    Container, Row, Col
} from 'reactstrap';

class checkoutStudentPlan extends Component {
    static defaultProps = {};

    state = {};

    render() {

        return (
            <>
                <div className="main-info">
                    <Container>
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
