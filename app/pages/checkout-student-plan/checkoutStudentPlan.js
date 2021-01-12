import React, { Component, PureComponent, } from 'react';
import './checkoutStudentPlan.scss';
import CheckoutPlan from './common/checkoutPlan';
import Accordion from './accordion/accordion';
import { Container, Row, Col } from 'react-bootstrap';
import TitleHeader from './component/title-header';
import { Spinner } from 'app/components/spinner/index';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL,  } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { getUserInfo } from 'app/modules/User';
import { fetchSubscriptionPlan } from 'app/modules/new-guest-dashboard/actions'
import { makeFetchSubscriptionPlanSelector } from 'app/modules/new-guest-dashboard/selector'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

class checkoutStudentPlan extends PureComponent {
       
    constructor(props){
        super(props);    
        this.state={
            subscriptionPlans: props.subscriptionPlans
        }    
        props.fetchSubscriptionPlan({callSource: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
                                enableHiddenPlanHashCode: window.localStorage.getItem('enableHiddenPlanHashCode'),
                                sloohMarketingTrackingId: getUserInfo()._sloohatid});
    }
    
    componentDidUpdate(oldProps){
        if(this.state.subscriptionPlans !== this.props.subscriptionPlans){
            this.setState({subscriptionPlans: this.props.subscriptionPlans});
        }
    }  
    
    onPlanChange = (plans, fromPlanIndex, toPlanIndex) => {
        window.localStorage.setItem('selectedPlanId', plans[fromPlanIndex].planID);
        var element = plans[fromPlanIndex];
        plans.splice(fromPlanIndex, 1);
        plans.splice(toPlanIndex, 0, element);        
        this.setState({subscriptionPlans: {subscriptionPlans: plans, ...this.state.subscriptionPlans}});
    }

    render() {      
        const { subscriptionPlans } =this.state;        
        const { selectedPlan } = this.state;
        return (
            <>                
                        <div className="check-out-stu">                            
                            <Spinner loading={subscriptionPlans.isFetching} />
                            {!subscriptionPlans.isFetching && (
                                <Container>
                                    <TitleHeader
                                        heading="Join the Slooh Universe"
                                        subHeading="Complete your order"
                                    />
                                    <Row>
                                        <Col md="4">
                                            <CheckoutPlan 
                                                subscriptionPlans={subscriptionPlans.subscriptionPlans}
                                                subscriptionPlansCount={subscriptionPlans.subscriptionPlansCount}
                                                onPlanChange={this.onPlanChange}
                                            />
                                        </Col>
                                        <Col md="8">
                                            <Accordion 
                                                selectedPlan={subscriptionPlans.subscriptionPlans[0]}
                                            />
                                        </Col>

                                    </Row>
                                </Container>
                            )}
                        </div>
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    subscriptionPlans: makeFetchSubscriptionPlanSelector(),
    
  });
  
  const mapDispatchToProps = {
    fetchSubscriptionPlan
  };
  
export default compose(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )
)(checkoutStudentPlan);
