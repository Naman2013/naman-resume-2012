import React, { Component, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion';
import { Container, Row, Col, CardSubtitle, CardText, Button } from 'react-bootstrap';
import TitleHeader from './component/title-header';
import { Spinner } from 'app/components/spinner/index';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL, JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';

class checkoutStudentPlan extends Component {
    static defaultProps = {};

    state = {};

    render() {

        return (
            <>
                <Request
                    serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'joinByGuestLanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    // serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => (
                        <div className="check-out-stu">                            
                            <Spinner loading={fetchingContent} />
                            {!fetchingContent && (
                                <Container>
                                    <TitleHeader
                                        heading="Join the Slooh Universe"
                                        subHeading="Complete your order"
                                    />
                                    <Row>
                                        <Col md="4">
                                            <CheckoutPlan 
                                                supscriptionResponse={joinPageRes}
                                            />
                                        </Col>
                                        <Col md="8">
                                            <Accordion />
                                        </Col>

                                    </Row>
                                </Container>
                            )}
                        </div>
                    )}/>

                
            </>
        );
    }
}

export default checkoutStudentPlan;
