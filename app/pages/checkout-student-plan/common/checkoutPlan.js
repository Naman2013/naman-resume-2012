/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
//import './checkoutPlan.scss';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL, JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';
import { PlanHeader, PlanCard } from './plan-header'
import styles from './checkoutPlan.style';
import { Spinner } from 'app/components/spinner/index';




const { string, func } = PropTypes;
@withTranslation()
class checkoutPlan extends Component {
    constructor(props) {
        super(props);        
        window.localStorage.setItem('selectedPlanId', props.subscriptionPlans[0].planID);        
    } 

    switchPlan = (plans, fromPlanIndex, toPlanIndex) => {
        window.localStorage.setItem('selectedPlanId', plans[fromPlanIndex].planID);
        var element = plans[fromPlanIndex];
        plans.splice(fromPlanIndex, 1);
        plans.splice(toPlanIndex, 0, element);        
        this.setState({subscriptionPlans: plans});
    }

    render() {        
        const { subscriptionPlans, onPlanChange } = this.props;
        return (

            <div>
                <div className="left-plan-list">
                    <PlanHeader
                                                cardHeading="Your Plan"
                                                heading={null}
                                                subHeading={null}
                                                description={null}
                                            />
                                            
                                            {subscriptionPlans.map((plan, index)=>(
                                                index === 0 ? (
                                                    <div className="appPlan mt-4">
                                                        <div className="craddesign">
                                                            <div className="state_active">
                                                                <div className="ml-1">
                                                                    <PlanCard
                                                                        heading={plan.planName}
                                                                        subHeading={null}
                                                                        description={null}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="state_active">
                                                                <div className="ml-1" dangerouslySetInnerHTML={{__html: plan.planCostDescriptionPrefix}} />                                                                      
                                                            </div>
                                                            {/* <div className="state_active">
        
                                                                <div className="ml-1">
                                                                    <PlanCard
                                                                        heading={null}
                                                                        subHeading={this.state.activePlan && <div className="ml-1" dangerouslySetInnerHTML={{__html: this.state.activePlan.planCostDescriptionPrefix}}>      
                                                                        </div>}
                                                                        description={null}
                                                                    />
                                                                </div>
                                                            </div> */}
                                                            <div className="state_active">
        
                                                                <div className="ml-1">
                                                                    <PlanCard
                                                                        heading={null}
                                                                        subHeading={plan.planCostDescription}
                                                                        description={null}
                                                                    />
                                                                </div>
                                                            </div>
        
        
        
        
                                                            {plan.planTextBlockDetails.map((planTextBlockData) => {
        
        
                                                                return (<div className="state_active">
                                                                    <div>
                                                                        <i className="fa fa-check" aria-hidden="true">
                                                                        </i>
                                                                    </div>
                                                                    <div className="ml-1">
                                                                        <PlanCard
                                                                            heading={null}
                                                                            subHeading={null}
                                                                            description={planTextBlockData}
                                                                        />
                                                                    </div>
                                                                </div>)
        
                                                            })
        
                                                            }
        
        
                                                        </div>
        
                                                    </div>
                                                ):(
                                                    <div className="state_active cursor-point" onClick={()=>onPlanChange(subscriptionPlans, index, 0)}>
                                                    <div>
                                                        <PlanHeader
                                                            heading={null}
                                                            subHeading={"View "+ plan.planName + " Plan"}
                                                            description={null}
                                                        />
                                                    </div>
                                                    <div className="ml-4 pt-2 mt-1">
                                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                )

                                            ))}

                                            <hr className="seperatorDesign"></hr>
                                            {subscriptionPlans[0].showPlanDueToday && (
                                                <div className="state_total">
                                                    <div className="totalcost">
                                                        <PlanHeader
                                                            heading={null}
                                                            subHeading={subscriptionPlans[0].planTotalDueTodayDesc }
                                                            description={null}
                                                        />
                                                    </div>
                                                    <div className="ml-4 totalcost">
                                                        <PlanHeader
                                                            heading={null}
                                                            subHeading={subscriptionPlans[0].planTotalDueToday  }
                                                            description={null}
                                                        />

                                                    </div>
                                                </div>
                                            )}
                                            
                                            {subscriptionPlans[0].hasTrialPeriod && (
                                                <div className="state_active">
                                                    <div>
                                                        <PlanHeader
                                                            heading={null}
                                                            subHeading={null}
                                                            description="Due during free trial period"
                                                        />
                                                    </div>
                                                </div>
                                            )}                                            
                                            {subscriptionPlans[0].hasTrialPeriod && (
                                                <div className="jumbotron mt-4 billJumB">
                                                    <p> {subscriptionPlans[0].freeTrialDescriptiveText}</p>
                                                </div>
                                            )}
                                            <style jsx>{styles}</style>
                                        </div>
                                    {/* </Fragment> */}
                                {/* )}
                            </DeviceContext.Consumer>
                        </Fragment> */}

                    {/* )}



                /> */}

            </div>


        );

    }
}

export default checkoutPlan;
