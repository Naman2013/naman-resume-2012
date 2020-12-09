/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
//import './checkoutPlan.scss';
import styles from './checkoutPlan.style';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL, JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';




const { string, func } = PropTypes;
@withTranslation()
class checkoutPlan extends Component {
    constructor(props) {
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
        const alternatePlan = this.state.alternatePlan;
        const activePlan = this.state.activePlan;
        this.setState({
          activePlan: alternatePlan,
          alternatePlan: activePlan  
        })
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
                                        <div className="main-info">

                                            <h2 className="">Your Plan</h2>
                                            <div className="appPlan">
                                                <div className="craddesign">
                                                    <p className="planHeading">{this.state.activePlan && this.state.activePlan.planName}</p>
                                                    {/* <p className="palnSubHeading">{subHeading}</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i>{paragraph1}</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i>{paragraph2}</p> */}
                                                </div>

                                            </div>

                                            <div className="view-plan mt-4" onClick={this.switchPlan}>
                                                <p className="text-dark">{this.state.alternatePlan && this.state.alternatePlan.planName}<span className='ml-4'> > </span> </p>
                                            </div>
                                            <hr className="seperatorDesign"></hr>
                                            <div className="totalCost">
                                                <h3 className="text-bold text-dark">Total</h3>
                                                <span>$ 0</span>
                                                <p className="text-dark">Due during free trial period</p>
                                                <div className="jumbotron mt-4 billJumB text-dark">
                                                    $100/billed after annually free trial

                                            </div>
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
