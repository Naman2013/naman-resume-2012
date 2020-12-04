/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './checkoutPlan.scss';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';


const { string, func } = PropTypes;
@withTranslation()
class checkoutPlan extends Component {

    render() {
        //  const { pathname, t } = this.props;
        //const { accountFormDetails } = this.state;
        return (
            <div className="main-info">

                <h2 className="">Your Plan</h2>

                <Card className="appPlan">
                    <CardBody>
                        <CardTitle tag="h5" className="text-left mb-4">Apprentice Plan</CardTitle>
                        <CardSubtitle tag="h6" className="mt-4 mb-2 text-left">$ 100/Year</CardSubtitle>
                        <CardText><i class="fa fa-check" aria-hidden="true"></i>7 day free trial</CardText>
                        <CardText><i class="fa fa-check" aria-hidden="true"></i>Cancel online payment</CardText>
                        <CardText><i class="fa fa-check" aria-hidden="true"></i>Billed annually after trial ends</CardText>
                        <CardText><i class="fa fa-check" aria-hidden="true"></i>Add free enviourment</CardText>

                    </CardBody>
                </Card>

                <div className="view-plan">
                    <p className="text-dark">View Student Plan <span><Button> > </Button></span> </p>
                </div>
                <div className="totalCost">
                    <h3 className="text-bold text-dark">Total</h3>
                    <span>$ 0</span>
                    <p className="text-dark">Due during free trial period</p>
                    <div className="jumbotron mt-4 billJumB text-dark">
                        $100/billed after annually free trial

                  </div>
                </div>
            </div>
        );

    }
}

export default checkoutPlan;
