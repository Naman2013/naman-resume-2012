/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
//import './checkoutPlan.scss';
import styles from './checkoutPlan.style';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import Request from 'app/components/common/network/Request';



import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'react-bootstrap';


const { string, func } = PropTypes;
@withTranslation()
class checkoutPlan extends Component {
    constructor(props){
        super(props);
       

    }

    render() {
        //  const { pathname, t } = this.props;
        //const { accountFormDetails } = this.state;
        return (

            <div>
                <Request
                    serviceURL={JOIN_PAGE_ENDPOINT_URL}
                    requestBody={{
                        callSource: 'providePaymentDetails',
                        selectedPlanId: window.localStorage.selectedPlanId,
                        cid: window.localStorage.getItem('pending_cid'),
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
                                                    <p className="planHeading">Apprentice Plan</p>
                                                    <p className="palnSubHeading">$ 100/Year</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i>7 day free trial</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i> Cancel online payment</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i>Billed annually after trial ends</p>
                                                    <p><i className="fa fa-check" aria-hidden="true"></i>Add free enviourment</p>
                                                </div>

                                            </div>

                                            <div className="view-plan mt-4">
                                                <p className="text-dark">View Student Plan <span className='ml-4'> > </span> </p>
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
