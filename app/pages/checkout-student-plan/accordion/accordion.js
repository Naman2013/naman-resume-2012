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
    transform: 'rotate(90deg)',
};
@withTranslation()
class accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: '',
        };
    }

    toggleCollapse = collapseText => {
        console.log('collapseID::', collapseText);
        this.setState(() => ({
            collapseID: collapseText,
        }));
    };

    render() {
        const { collapseID } = this.state;
        let ActivecollapseID = collapseID.collapseID;
        return (
            <div>
                <Accordion style={h1Styles}>
                    <Card className="PersonalInfo">
                        <Accordion.Toggle
                            as={Card.Header}
                            onClick={event => {
                                this.toggleCollapse({
                                    collapseID: 'collapse1',
                                });
                            }}
                            eventKey="0"
                        >
                            Personal Information
                                <img
                                style={ActivecollapseID == 'collapse1' ? imgRotate : null}
                                className="chervonicon"
                                src="../assets/images/icons/chevron.webp"
                                alt="chervonicon"
                            ></img>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <PersonalInfoRegistration></PersonalInfoRegistration>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className="PersonalInfo">
                        <Accordion.Toggle
                            as={Card.Header}
                            onClick={event => {
                                this.toggleCollapse({
                                    collapseID: 'collapse2',
                                });
                            }}
                            eventKey="1"
                        >
                            Payment Details
                            <img
                                style={ActivecollapseID == 'collapse2' ? imgRotate : null}
                                className="chervonicon"
                                src="../assets/images/icons/chevron.webp"
                                alt=""
                            ></img>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                            <PaymentDetails></PaymentDetails>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

export default accordion;