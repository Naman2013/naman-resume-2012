/** *********************************
* V4 Join - Step 1 - Select a Plan
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/common/style/buttons/Button';
import Request from 'components/common/network/Request';

class JoinStep1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const JOIN_PAGE_ENDPOINT_URL = '/api/page/join';
    const SUBSCRIPTION_PLANS_ENDPOINT_URL = '/api/registration/getSubscriptionPlans';

    const joinPageModel = {
      name: 'JOIN_PAGE_MODEL',
      model: resp => ({
        pageHeading1: resp.pageHeading1,
        pageHeading2: resp.pageHeading2,
        sectionHeading: resp.sectionHeading,
      }),
    };

    const subscriptionPlansModel = {
      name: 'SUBSCRIPTION_PLANS_MODEL',
      model: resp => ({
        subscriptionPlans: resp.subscriptionPlans,
      }),
    };

    return (
      <div style={{'paddingTop': '55px', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '600px'}}>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          model={joinPageModel}
          requestBody={{ 'callSource': 'selectSubscriptionPlan' }}
          render={({
            fetchingContent,
            modeledResponses: { JOIN_PAGE_MODEL },
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                      <h1>{JOIN_PAGE_MODEL.pageHeading1}</h1>
                      <h2>{JOIN_PAGE_MODEL.pageHeading2}</h2>
                      <h3>Step 1: {JOIN_PAGE_MODEL.sectionHeading}</h3>
                      <br/>
                      <br/>
                      <Request
                        serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
                        model={subscriptionPlansModel}
                        requestBody={{ 'callSource': 'join' }}
                        render={({
                          fetchingContent,
                          modeledResponses: { SUBSCRIPTION_PLANS_MODEL },
                        }) => (
                          <Fragment>
                            {
                              !fetchingContent &&
                                <Fragment>
                                  <ul style={{'listStyle': 'none', 'marginLeft': 'auto', 'marginRight': 'auto', 'width': '400px'}}>
                                    {SUBSCRIPTION_PLANS_MODEL.subscriptionPlans.map(subscriptionPlan => <li style={{'paddingTop': '10px', 'paddingBottom': '10px'}} key={`subscriptionplan-tile-${subscriptionPlan.planID}`}>
                                      <div style={{'border': '1px solid'}}>
                                        <div style={{'marginLeft': '30px', 'marginRight': '10px'}}>
                                          <br/>
                                          <b>{subscriptionPlan.planName}</b><br/>
                                          <hr/>
                                          <br/>
                                          <i>{subscriptionPlan.planDescription}</i><br/>
                                          <br/>
                                          <hr/>
                                          <br/>
                                          {subscriptionPlan.planCostPrefix}{subscriptionPlan.planCost}<br/>
                                          {subscriptionPlan.planCostPostfix}<br/>
                                          <br/>
                                          <hr/>
                                          <div id={'subscriptionPlanDetails_' + subscriptionPlan.planID} dangerouslySetInnerHTML={{ __html: subscriptionPlan.aboutThisPlan }}/><br/>
                                          <br/>
                                          <br/>
                                          <Link to={'/join/step2/' + subscriptionPlan.planID}><Button theme={{ margin: '0 auto'}} type="button" text={subscriptionPlan.selectButtonText}/></Link><br/>
                                        </div>
                                       </div>
                                      </li>)}
                                    </ul>
                                  </Fragment>
                                }
                              </Fragment>
                            )}
                          />
                      </Fragment>
                    }
                  </Fragment>
                )}
          />
          <br/>
          <br/>
      </div>
    )
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(mapStateToProps, null)(JoinStep1);
