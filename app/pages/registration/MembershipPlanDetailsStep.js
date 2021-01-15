/** *********************************
 * V4 Memberships - Plan Details Step
 ********************************** */

import React, { Component, cloneElement, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import Button from 'app/components/common/style/buttons/Button';

import { Field, reduxForm } from 'redux-form';
import InputField from 'app/components/form/InputField';
import {
  CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL,
  CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL,
} from 'app/services/classroom/classroom';
import { JOIN_PAGE_ENDPOINT_URL } from 'app/services/registration/registration.js';
import { API } from 'app/api';
import Request from 'app/components/common/network/Request';
import BobbieTile from 'app/components/common/tiles/BobbieTile';
import TabbedNav from 'app/components/TabbedNav';
import cookie from 'cookie';
import JoinHeader from './partials/JoinHeader';
import PlanDetailsCard from './partials/PlanDetailsCard';
import { PLAN_DETAILS_JOIN_TABS } from './StaticNavTabs';

import styles from './JoinStep1SchoolSelection.style';

const { string, arrayOf, shape } = PropTypes;

@withTranslation()
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
    isAstronomyClub: window.localStorage.getItem('isAstronomyClub') === 'true',
  };

  continueToJoinFlow = formValues => {
    formValues.preventDefault();

    browserHistory.push('/join');
  };

  changeActiveTab = activeTab => {
    // do nothing for now
    // browserHistory.push(activeTab);
  };

  render() {
    const { pathname, tabs, activeTab, t } = this.props;
    const { cid } = cookie.parse(window.document.cookie);

    return (
      <Fragment>
        <Request
          serviceURL={JOIN_PAGE_ENDPOINT_URL}
          requestBody={{
            callSource: 'membershipspagePlanDetails',
            selectedPlanId: this.state.selectedPlanId,
            enableHiddenPlanHashCode: window.localStorage.getItem(
              'enableHiddenPlanHashCode'
            ),
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <div
              className="join-root-alt"
              style={{
                backgroundImage: `url(${serviceResponse?.selectedSubscriptionPlan?.planSelectedBackgroundImageUrl_Desktop})`,
              }}
            >
              <div className="step-root">
                {!fetchingContent && (
                  <Fragment>
                    <div className="join-root-alt-header">
                      <h1
                        dangerouslySetInnerHTML={{
                          __html: serviceResponse.pageHeading1,
                        }}
                      />
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: serviceResponse.pageHeading2,
                        }}
                      />
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
                          disableReadMore
                        />
                        <div
                          style={{ paddingTop: '40px' }}
                          className="button-container"
                        >
                          <Button
                            type="button"
                            text={t('Ecommerce.GoBack')}
                            onClickEvent={() => {
                              browserHistory.goBack();
                            }}
                          />
                          {!cid && (
                            <button className="submit-button" type="submit">
                              {t('Ecommerce.JoinNow')}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          )}
        />
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(
  mapStateToProps,
  null
)(MembershipPlanDetailsStep);
