/** *********************************
* V4 Memberships - Plan Details Step
********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Button from 'components/common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import InputField from 'components/form/InputField';
import { CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL, CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL } from 'services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'services/registration/registration.js';
import axios from 'axios';
import Request from 'components/common/network/Request';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import TabbedNav from 'components/TabbedNav';
import { PLAN_DETAILS_JOIN_TABS } from './StaticNavTabs';
import styles from './JoinStep1SchoolSelection.style';
import messages from './MembershipPlanDetailsStep.messages';

const {
  string,
  arrayOf,
  shape,
} = PropTypes;

class MembershipPlanDetailsStep extends Component {
  static propTypes = {
    pathname: string,
    activeTab: string,
    tabs: arrayOf(shape({
      label: string,
      value: string,
    })),
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    pathname: '/join/membershipPlanDetailsStep',
    tabs: [],
    activeTab: '/join/membershipPlanDetailsStep',
  };

  constructor(props) {
    super(props);
  }

  state = {
    selectedPlanId: window.localStorage.getItem('selectedPlanId'),
    isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === "true" ? true : false,
    isClassroom: window.localStorage.getItem('isClassroom') === "true" ? true : false,
  };

  continueToJoinFlow = (formValues) => {
    formValues.preventDefault();

    /* Teacher Subscription Plans should prompt for School Selection */
    if (this.state.isClassroom) {
      browserHistory.push('/join/step1SchoolSelection');
    }
    else {
      /* move to step 2 in the join flow */
      browserHistory.push('/join/step2');
    }
  }

  changeActiveTab = (activeTab) => {
    // do nothing for now
    // browserHistory.push(activeTab);
  }

  render() {
    const {
      pathname,
      tabs,
      activeTab,
      intl,
    } = this.props;

    return (
      <div className="join-root-alt">
        <div className="step-root">
        
          <Request
            serviceURL={JOIN_PAGE_ENDPOINT_URL}
            requestBody={{ 'callSource': 'membershipspagePlanDetails', selectedPlanId: this.state.selectedPlanId }}
            render={({
              fetchingContent,
              serviceResponse,
            }) => (
              <Fragment>
                {
                  !fetchingContent &&
                    <Fragment>              
                      <div className="join-root-alt-header">
                        <h1><FormattedMessage {...messages.JoinSlooh} /></h1>
                        <h2><FormattedMessage {...messages.JoinSloohTrial} /></h2>
                      </div>
                      <PlanDetailsCard {...serviceResponse.selectedSubscriptionPlan} />
                      <TabbedNav
                        tabs={PLAN_DETAILS_JOIN_TABS}
                        activeTabValue={activeTab}
                        onTabClick={this.changeActiveTab}
                      />
                      <div className="inner-container">
                      <form className="form" onSubmit={this.continueToJoinFlow}>
                        <div className="form-section" dangerouslySetInnerHTML={{ __html: serviceResponse.selectedSubscriptionPlan.aboutThisPlan }}/>
                        <div className="button-container">
                          <Button
                            type="button"
                            text={intl.formatMessage(messages.GoBack)}
                            onClickEvent={() => { browserHistory.push('/about/memberships') }}
                          />
                          <button
                            className="submit-button"
                            type="submit"
                          >
                            <FormattedMessage {...messages.JoinNow} />
                          </button>
                        </div>
                      </form>
                      </div>
                    </Fragment>
                  }
                </Fragment>
              )}
            />
          
      </div>
      <style jsx>{styles}</style>
    </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(injectIntl(MembershipPlanDetailsStep));
