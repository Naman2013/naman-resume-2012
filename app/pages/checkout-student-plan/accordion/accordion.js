/* *********************************************************************************
* V4 Join with an Invitation Code - Enter Email Address/Invitation Code
*************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Accordion, Card, Button, useAccordionToggle } from 'react-bootstrap';
import './accordion.scss';
import PersonalInfoRegistration from '../personalInfoRegistration';
import PaymentDetails from '../paymentDetails';

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
        };
    }

    handleStepOneComplete = stepId => {
        this.setState({
            accoridianActiveKey: stepId
        })
    }

    render() {
        const { collapseID, accoridianActiveKey } = this.state;
        /* if(accoridianActiveKey=="1"){

        } */
        //let ActivecollapseID = collapseID.collapseID;
        console.log('accoridianActiveKey', accoridianActiveKey);
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
                </Accordion>
            </div>
        );
    }
}

export default accordion;