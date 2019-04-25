/** *********************************
 * V4 Memberships - Plan Details Step
 ********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Button from 'app/components/common/style/buttons/Button';

import { Field, reduxForm } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import InputField from 'app/components/form/InputField';
import {
  CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL,
  CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL,
} from 'app/services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import axios from 'axios';
import Request from 'app/components/common/network/Request';
import BobbieTile from 'app/components/common/tiles/BobbieTile';
import TabbedNav from 'app/components/TabbedNav';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import { PLAN_DETAILS_JOIN_TABS } from './StaticNavTabs';
import styles from './JoinStep1SchoolSelection.style';
import messages from './MembershipPlanDetailsStep.messages';

const { string, arrayOf, shape } = PropTypes;

class MembershipPlanDetailsStep extends Component {
  static propTypes = {
    pathname: string,
    activeTab: string,
    tabs: arrayOf(
      shape({
        label: string,
        value: string,
      })
    ),
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    pathname: '/join/membershipPlanDetailsStep',
    tabs: [],
    activeTab: '/join/membershipPlanDetailsStep',
  };

  state = {
    selectedPlanId: window.localStorage.getItem('selectedPlanId'),
    isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === 'true',
    isClassroom: window.localStorage.getItem('isClassroom') === 'true',
  };

  continueToJoinFlow = formValues => {
    formValues.preventDefault();

    /* Teacher Subscription Plans should prompt for School Selection */
    if (this.state.isClassroom) {
      browserHistory.push('/join/step1SchoolSelection');
    } else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  };

  changeActiveTab = activeTab => {
    // do nothing for now
    // browserHistory.push(activeTab);
  };

  render() {
    const { pathname, tabs, activeTab, intl } = this.props;

    return (
      <div className="join-root-alt">
        <div className="step-root">
          <Request
            serviceURL={JOIN_PAGE_ENDPOINT_URL}
            requestBody={{
              callSource: 'membershipspagePlanDetails',
              PlanId: this.state.selectedPlanId,
            }}
            render={({ fetchingContent, serviceResponse }) => (
              <Fragment>
                {!fetchingContent && (
                  <Fragment>
                    <div className="join-root-alt-header">
                      <h1>
                        <FormattedMessage {...messages.JoinSlooh} />
                      </h1>
                      <h2>
                        <FormattedMessage {...messages.JoinSloohTrial} />
                      </h2>
                    </div>
                    <PlanDetailsCard
                      {...serviceResponse.selectedSubscriptionPlan}
                    />
                    <TabbedNav
                      tabs={PLAN_DETAILS_JOIN_TABS}
                      activeTabValue={activeTab}
                      onTabClick={this.changeActiveTab}
                    />
                    <div className="inner-container">
                      <form
                        style={{ paddingTop: '0px' }}
                        className="form"
                        onSubmit={this.continueToJoinFlow}
                      >
                        <BobbieTile
                          className="form-section"
                          showTitle={false}
                          showSubtitle={false}
                          title=""
                          subtitle=""
                          HTMLBlob={
                            serviceResponse.selectedSubscriptionPlan
                              .aboutThisPlan
                          }
                        />
                        <div
                          style={{ paddingTop: '40px' }}
                          className="button-container"
                        >
                          <Button
                            type="button"
                            text={intl.formatMessage(messages.GoBack)}
                            onClickEvent={() => {
                              browserHistory.push('/about/memberships');
                            }}
                          />
                          <button className="submit-button" type="submit">
                            <FormattedMessage {...messages.JoinNow} />
                          </button>
                        </div>
                      </form>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          />
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(
  mapStateToProps,
  null
)(injectIntl(MembershipPlanDetailsStep));
