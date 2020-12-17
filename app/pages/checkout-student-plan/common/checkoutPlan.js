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
        this.state = {
            activePlan: null,
            alternatePlan: null,
        }
        this.handleJoinPageServiceResponse(props.supscriptionResponse);
    }

    handleJoinPageServiceResponse = result => {
        const subscriptionPlans = Array.isArray(result.subscriptionPlans) ? result.subscriptionPlans : [];
        const planApprentice = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'apprentice');
        const planStudent = subscriptionPlans.filter((plan) => plan.planName.toLowerCase() === 'student');

        // this.setState({
        //     activePlan: planApprentice.length ? planApprentice[0] : null,
        //     alternatePlan: planStudent.length ? planStudent[0] : null,

        // })
        // window.localStorage.setItem('selectedPlanId', this.state.activePlan.planID);
        this.state={
            activePlan: planApprentice.length ? planApprentice[0] : null,
            alternatePlan: planStudent.length ? planStudent[0] : null,

        }
        window.localStorage.setItem('selectedPlanId', this.state.activePlan.planID);

    }

    switchPlan = () => {


        const { alternatePlan, activePlan } = this.state;
        this.setState({
            activePlan: alternatePlan,
            alternatePlan: activePlan
        })
        window.localStorage.setItem('selectedPlanId', alternatePlan.planID);

    }

    render() {
        //  const { pathname, t } = this.props;
        const { mainHeading, subHeading, planName, paragraph1, paragraph2 } = this.state;
        const { t } = this.props;
        
        return (

            <div>
                {/* <Request
                    serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'joinByGuestLanding',
                        enableHiddenPlanHashCode: window.localStorage.getItem(
                            'enableHiddenPlanHashCode'
                        ),
                    }}
                    serviceResponseHandler={this.handleJoinPageServiceResponse}
                    render={({ fetchingContent, serviceResponse: joinPageRes }) => ( */}
                        
                        <Fragment>
                           
                            <DeviceContext.Consumer>
                                {({ isMobile, isDesktop, isTablet }) => (
                                    <Fragment>
                                        <div className="left-plan-list">
                                            <PlanHeader
                                                cardHeading="Your Plan"
                                                heading={null}
                                                subHeading={null}
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
                                                        {this.state.activePlan && <div className="ml-1" dangerouslySetInnerHTML={{__html: this.state.activePlan.planCostDescriptionPrefix}}>      
                                                        </div>}
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
                                                                subHeading={this.state.activePlan && this.state.activePlan.planCostDescription}
                                                                description={null}
                                                            />
                                                        </div>
                                                    </div>




                                                    {this.state.activePlan && this.state.activePlan.planTextBlockDetails.map((planTextBlockData) => {


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



                                            <div className="state_active cursor-point" onClick={this.switchPlan}>
                                                <div>
                                                    <PlanHeader
                                                        heading={null}
                                                        subHeading={` View  ${this.state.alternatePlan && this.state.alternatePlan.planName}  Plan`}
                                                        description={null}
                                                    />
                                                </div>
                                                <div className="ml-4 pt-2 mt-1">
                                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                                </div>
                                            </div>

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
                                                <p> {this.state.activePlan && this.state.activePlan.freeTrialDescriptiveText}</p>
                                            </div>

                                            <style jsx>{styles}</style>
                                        </div>
                                    </Fragment>
                                )}
                            </DeviceContext.Consumer>
                        </Fragment>

                    {/* )}



                /> */}

            </div>


        );

    }
}

export default checkoutPlan;
