import React, { Component, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion';
import { Container, Row, Col } from 'react-bootstrap';
import TitleHeader from './component/title-header';
import { Spinner } from 'app/components/spinner/index';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL,  } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { getUserInfo } from 'app/modules/User';

class checkoutStudentPlan extends Component {
    static defaultProps = {};

    state = {};    
    render() {        
        return (
            <>
                <Request
                    serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                    requestBody={{
                        callSource: getUserInfo()._sloohatid ? 'join' : 'joinByGuestLanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                        sloohMarketingTrackingId: getUserInfo()._sloohatid,
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
                                                subscriptionPlans={joinPageRes.subscriptionPlans}
                                                subscriptionPlansCount={joinPageRes.subscriptionPlansCount}
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
