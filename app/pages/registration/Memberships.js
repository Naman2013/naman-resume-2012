/** *********************************
 * V4 Memberships page
 ********************************** */

import CenterColumn from 'app/components/common/CenterColumn';
import Request from 'app/components/common/network/Request';
import { SUBSCRIPTION_PLANS_ENDPOINT_URL } from 'app/services/registration/registration';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ContainerWithTitle } from 'app/components/common/ContainerWithTitle';
import styles from './Memberships.style';
import MembershipPlansList from './MembershipPlansList';

class Memberships extends Component {
  TAB_INDIVIDUAL_NAME = 'individual';

  render() {
    const { params } = this.props;

    return (
      <div className="about-membership">
        <Request
          serviceURL={SUBSCRIPTION_PLANS_ENDPOINT_URL}
          requestBody={{
            callSource: 'membershipspage',
            enableHiddenPlanHashCode: window.localStorage.getItem(
              'enableHiddenPlanHashCode'
            ),
          }}
          render={({
            fetchingContent,
            serviceResponse: subscriptionResponse,
          }) => {
            const navItems = subscriptionResponse.menuList?.map(item => ({
              title: item.menuItem,
              linkURL: item.menuLinkUrl,
            }));

            const plans = subscriptionResponse.subscriptionPlans?.filter(
              item => {
                if (params.viewType === this.TAB_INDIVIDUAL_NAME) {
                  return item.planAudienceTab === this.TAB_INDIVIDUAL_NAME;
                }
                return item.planAudienceTab !== this.TAB_INDIVIDUAL_NAME;
              }
            );

            return (
              <Fragment>
                <CenterColumn widths={['645px', '960px', '960px']}>
                  <ContainerWithTitle
                    title=""
                    navItems={navItems}
                    showNavigation
                    activeFilter={params.viewType}
                  >
                    {!fetchingContent && <MembershipPlansList plans={plans} />}
                  </ContainerWithTitle>
                </CenterColumn>
              </Fragment>
            );
          }}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ appConfig }) => ({
  appConfig,
});

export default connect(
  mapStateToProps,
  null
)(Memberships);
