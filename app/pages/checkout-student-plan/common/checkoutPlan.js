/** **********************************************************************************
 * V4 Join with an Invitation Code - Enter Email Address/Invitation Code
 *************************************************************************************/
import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './checkoutPlan.scss';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'react-bootstrap';


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
                    <Card.Body>
                        <Card.Title tag="h5" className="text-left mb-4">Apprentice Plan</Card.Title>
                        <Card.Subtitle tag="h6" className="mt-4 mb-2 text-left">$ 100/Year</Card.Subtitle>
                        <Card.Text><i class="fa fa-check" aria-hidden="true"></i>7 day free trial</Card.Text>
                        <Card.Text><i class="fa fa-check" aria-hidden="true"></i> Cancel online payment</Card.Text>
                        <Card.Text><i class="fa fa-check" aria-hidden="true"></i>Billed annually after trial ends</Card.Text>
                        <Card.Text><i class="fa fa-check" aria-hidden="true"></i>Add free enviourment</Card.Text>

                    </Card.Body>
                </Card>

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
            </div>
        );

    }
}

export default checkoutPlan;
