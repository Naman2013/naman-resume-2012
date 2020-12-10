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





const { string, func } = PropTypes;
@withTranslation()
class checkoutPlan extends Component {
    constructor(props) {
        window.localStorage.setItem('selectedPlanId', 171);
        super(props);
        this.state = {
            activePlan: null,
            alternatePlan: null,
        }
    }

    handleJoinPageServiceResponse = result => {
        const subscriptionPlans = Array.isArray(result.subscriptionPlans) ? result.subscriptionPlans : [];
        const planApprentice = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'apprentice');
        const planStudent = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'student');

        this.setState({
            activePlan: planApprentice.length ? planApprentice[0] : null,
            alternatePlan: planStudent.length ? planStudent[0] : null,
        })

    }

    switchPlan = () => {

        const { alternatePlan, activePlan } = this.state;
        this.setState({
            activePlan: alternatePlan,
            alternatePlan: activePlan
        })
        window.localStorage.setItem('selectedPlanId', activePlan.planID);

    }

    render() {
        //  const { pathname, t } = this.props;
        const { mainHeading, subHeading, planName, paragraph1, paragraph2 } = this.state;
        const { t } = this.props;

        return (

            <div>
                <Request
                    serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'joinByGuestLanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => (

                        <Fragment>
                            <DeviceContext.Consumer>
                                {({ isMobile, isDesktop, isTablet }) => (
                                    <Fragment>
                                        <div className="left-plan-list">
                                            <PlanHeader
                                                heading={null}
                                                subHeading="Your Plan"
                                                description={null}
                                            />
                                            <div className="appPlan mt-4">
                                                <div className="craddesign">
                                                    <div className="state_active">
                                                        <div className="ml-1">
                                                            <PlanCard
                                                                heading={`${this.state.activePlan && this.state.activePlan.planName}
                                                                 Plan`}
                                                                subHeading={null}
                                                                description={null}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="state_active">

                                                        <div className="ml-1">
                                                            <PlanCard
                                                                heading={null}
                                                                subHeading={this.state.activePlan && this.state.activePlan.planCostDescription}
                                                                description={null}
                                                            />
                                                        </div>
                                                    </div>



                                                    {this.state.activePlan && this.state.activePlan.planTextBlockDetails.map((planTextBlockData) => {

                                                        console.log(planTextBlockData);
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



                                            <div className="state_active" onClick={this.switchPlan}>
                                                <div>
                                                    <PlanCard
                                                        heading={null}
                                                        subHeading={null}
                                                        description={` View  ${this.state.alternatePlan && this.state.alternatePlan.planName}  Plan`}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                                </div>
                                            </div>

                                            <hr className="seperatorDesign"></hr>

                                            <div className="state_total">
                                                <div>
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading="Total"
                                                        description={null}
                                                    />
                                                </div>
                                                <div className="ml-4 pt-2">
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading="$ 0"
                                                        description={null}
                                                    />
                                                    
                                                </div>
                                            </div>

                                            <div className="state_active">
                                                <div>
                                                    <PlanCard
                                                        heading={null}
                                                        subHeading={null}
                                                        description="Due during free trial period"
                                                    />
                                                </div>
                                            </div>

                                            <div className="jumbotron mt-4 billJumB text-dark">
                                                <PlanCard
                                                    heading={null}
                                                    subHeading={null}
                                                    description={this.state.activePlan && this.state.activePlan.freeTrialDescriptiveText}
                                                />
                                            </div>

                                            <style jsx>{styles}</style>
                                        </div>
                                    </Fragment>
                                )}
                            </DeviceContext.Consumer>
                        </Fragment>

                    )}



                />

            </div>


        );

    }
}

export default checkoutPlan;
