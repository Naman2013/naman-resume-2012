/* *********************************************************************************
* V4 Join with an Invitation Code - Enter Email Address/Invitation Code
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Accordion, Card, Button, useAccordionToggle, } from 'react-bootstrap';
import './accordion.scss';
import PersonalInfoRegistration from '../personalInfoRegistration';
import PaymentDetails from '../paymentDetails';
import { API } from 'app/api';
import { JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL } from 'app/services/registration/registration';
import { fireSloohFBPurchaseEvent } from 'app/utils/fb-wrapper';
import { bindActionCreators } from 'redux';
import { resetLogIn, logUserIn, logGoogleUserIn } from 'app/modules/login/actions';
import { connect } from 'react-redux';
import { getUserInfo } from 'app/modules/User';
import { ErrorPopup } from 'app/modules/new-dashboard/common/errorPopup';
import { Spinner } from 'app/components/spinner/index';

const h1Styles = {
    display: 'flex',
    flexDirection: 'column',
};
const imgRotate = {
    transform: 'rotate(180deg)',
};


@withTranslation()
class accordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accoridianActiveKey: "0",
            collapseID: '',
            errorInfo: null,
            isFetching: false,
        };
    }

    handleStepOneComplete = stepId => {
        this.setState({
            accoridianActiveKey: stepId
        });
        if(this.props.selectedPlan.skipPaymentStepInCheckoutFlow){
            this.setState({isFetching: true});
            const activatePendingCustomerData = {
                // paymentMethod,
                // paymentToken: paymentNonceTokenData,
                customerId: window.localStorage.getItem('pending_cid'),
                selectedSchoolId: window.localStorage.getItem('selectedSchoolId'),
                isAstronomyClub:
                    window.localStorage.getItem('isAstronomyClub') === 'true',
                clubCodeA: window.localStorage.getItem('clubCodeA'),
                clubCodeB: window.localStorage.getItem('clubCodeB'),
                // billingAddressString: paymentDataString[3],
                // sloohSiteSessionToken: _sloohsstkn,
                sloohMarketingTrackingId: getUserInfo()._sloohatid,
                conditionType: getUserInfo()._sloohatid ? 'join' : 'joinbyguestlanding',
            };

            API.post(
                JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL,
                activatePendingCustomerData
            )
                .then(response => {
                    const res = response.data;
                    if (!res.apiError) {
                        if (res.status === 'success') {
                            const { actions } = this.props;

                            //fire off the Purchase Facebook Event
                            const myCID = window.localStorage.getItem('pending_cid');
                            fireSloohFBPurchaseEvent({
                                cid: myCID,
                                planName: res.PlanName,
                                planCostInUSD: res.PlanCostInUSD,
                            });

                            //Cleanup local localStorage
                            //cleanup any hidden plan that was accessed now that a plan was redeemed.
                            window.localStorage.removeItem('enableHiddenPlanHashCode');

                            //cleanup other localstorage elements
                            window.localStorage.removeItem('pending_cid');
                            window.localStorage.removeItem('selectedPlanId');
                            window.localStorage.removeItem('isAstronomyClub');
                            window.localStorage.removeItem('clubCodeA');
                            window.localStorage.removeItem('clubCodeB');
                            // log the user in (userpass or googleaccount logins supported)
                            const { accountCreationType } = window.localStorage;
                            if (accountCreationType === 'userpass') {
                                const loginDataPayload = {
                                    username: window.localStorage.username,
                                    pwd: window.localStorage.password,
                                };

                                /* cleanup local storage */
                                window.localStorage.removeItem('accountCreationType');
                                window.localStorage.removeItem('username');
                                window.localStorage.removeItem('password');


                                actions.logUserIn(loginDataPayload, { reload: false }).then(() => {
                                    const welcomepage = getUserInfo()._sloohatid ? "/join/purchaseConfirmation/join" : "/join/purchaseConfirmation/joinbyguestlanding";
                                    browserHistory.push(welcomepage);
                                });
                            } else if (accountCreationType === 'googleaccount') {
                                const loginDataPayload = {
                                    googleProfileId: window.localStorage.googleProfileId,
                                    googleProfileEmail: window.localStorage.username,
                                };

                                window.localStorage.removeItem('accountCreationType');
                                actions.logGoogleUserIn(loginDataPayload, { reload: false }).then(() => {
                                    const welcomepage = getUserInfo()._sloohatid ? "/join/purchaseConfirmation/join" : "/join/purchaseConfirmation/joinbyguestlanding";
                                    browserHistory.push(welcomepage);
                                });
                            }
                        } else {
                            this.setState({errorInfo: res})
                            /* process / display error to user */
                            // document
                            //     .getElementById('embeddedHostedPaymentForm')
                            //     .contentWindow.captureActivationError(res);
                        }
                        this.setState({isFetching: false});
                    }
                })
                .catch(err => {
                    throw ('Error: ', err);
                });
        }
    }

    render() {
        const { collapseID, accoridianActiveKey, errorInfo, isFetching } = this.state;
        const { selectedPlan } = this.props;
        /* if(accoridianActiveKey=="1"){

        } */
        return (
            <div>               
                <Accordion style={h1Styles} defaultActiveKey="0" activeKey={accoridianActiveKey} >
                    <Card className={`PersonalInfo ${accoridianActiveKey == "1" ? 'extraclass' : null}`}>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="0"
                        >
                            <div>
                                <p className="acc-header">Personal Information {accoridianActiveKey == '1' ? <i className="fa fa-check" aria-hidden="true"></i> : null}</p>
                            </div>
                            <div>
                                <img
                                    style={accoridianActiveKey == '1' ? imgRotate : null}
                                    className="chervonicon"
                                    src="https://vega.slooh.com/assets/v4/dashboard-new/up_arrow_white.svg"
                                    alt="chervonicon"
                                ></img>
                            </div>


                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <PersonalInfoRegistration onStepOneComplete={this.handleStepOneComplete} ></PersonalInfoRegistration>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    {!selectedPlan.skipPaymentStepInCheckoutFlow && (
                        <Card className="PersonalInfo mb-4">
                            <Accordion.Toggle
                                as={Card.Header}
                                /* onClick={event => {
                                    this.toggleCollapse({
                                        collapseID: 'collapse2',
                                    });
                                }} */
                                eventKey="1"
                            >

                                <div>
                                    <p className="acc-header"> Payment Details</p>
                                </div>
                                <div>
                                    <img
                                        style={accoridianActiveKey == '0' ? imgRotate : null}
                                        className="chervonicon"
                                        src="https://vega.slooh.com/assets/v4/dashboard-new/up_arrow_white.svg"
                                        alt="chervonicon"
                                    ></img>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {accoridianActiveKey == '1' ? <PaymentDetails></PaymentDetails> : null
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )}
                    
                </Accordion>
                {errorInfo &&(
                    <ErrorPopup
                        errorstate={errorInfo}
                        onHide={()=>this.setState({errorInfo: null})}
                    />
                )}
                 <Spinner loading={isFetching} />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            resetLogIn,
            logUserIn,
            logGoogleUserIn,
        },
        dispatch
    ),
});

export default connect(null, mapDispatchToProps) (accordion);