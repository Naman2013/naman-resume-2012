/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
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
        // this.state = {
        //     activePlan: null,
        //     alternatePlan: null,
        // }
        // this.handleJoinPageServiceResponse(props.supscriptionResponse);

        window.localStorage.setItem('selectedPlanId', props.subscriptionPlans[0].planID);
        this.state={
            subscriptionPlans: props.subscriptionPlans,
            subscriptionPlansCount: props.subscriptionPlansCount
        }
        
    }

    // handleJoinPageServiceResponse = result => {
    //     const subscriptionPlans = Array.isArray(result.subscriptionPlans) ? result.subscriptionPlans : [];
    //     const planApprentice = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'apprentice');
    //     const planStudent = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'student');

    //     // this.setState({
    //     //     activePlan: planApprentice.length ? planApprentice[0] : null,
    //     //     alternatePlan: planStudent.length ? planStudent[0] : null,

    //     // })
    //     // window.localStorage.setItem('selectedPlanId', this.state.activePlan.planID);
    //     this.state={
    //         activePlan: planApprentice.length ? planApprentice[0] : null,
    //         alternatePlan: planStudent.length ? planStudent[0] : null,

    //     }
    //     window.localStorage.setItem('selectedPlanId', this.state.activePlan.planID);

    // }

    // switchPlan = () => {
    //     const { alternatePlan, activePlan } = this.state;
    //     this.setState({
    //         activePlan: alternatePlan,
    //         alternatePlan: activePlan
    //     })
    //     window.localStorage.setItem('selectedPlanId', alternatePlan.planID);

    // }

    switchPlan = (plans, fromPlanIndex, toPlanIndex) => {
        window.localStorage.setItem('selectedPlanId', plans[fromPlanIndex].planID);
        var element = plans[fromPlanIndex];
        plans.splice(fromPlanIndex, 1);
        plans.splice(toPlanIndex, 0, element);        
        this.setState({subscriptionPlans: plans});
    }

    render() {
        //  const { pathname, t } = this.props;
        // const { mainHeading, subHeading, planName, paragraph1, paragraph2 } = this.state;
        // const { t } = this.props;
        const { subscriptionPlans } = this.state;


        return (

            <div>
                {/* <Request
                    serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'joinbyguestlanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => ( */}
                        
                        {/* <Fragment>
                           
                            <DeviceContext.Consumer>
                                {({ isMobile, isDesktop, isTablet }) => ( */}
                                    {/* <Fragment> */}
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
                                                    <div className="state_active cursor-point" onClick={()=>this.switchPlan(subscriptionPlans, index, 0)}>
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

                                            <div className="state_total">
                                                <div className="totalcost">
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading="Total"
                                                        description={null}
                                                    />
                                                </div>
                                                <div className="ml-4 totalcost">
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading="$ 0"
                                                        description={null}
                                                    />

                                                </div>
                                            </div>

                                            <div className="state_active">
                                                <div>
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading={null}
                                                        description="Due during free trial period"
                                                    />
                                                </div>
                                            </div>

                                            <div className="jumbotron mt-4 billJumB">
                                                <p> {subscriptionPlans[0].freeTrialDescriptiveText}</p>
                                            </div>

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
