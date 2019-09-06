// @flow
import React, { Component, Fragment } from 'react';
import Nav from 'app/components/common/nav';
import isEqual from 'lodash/fp/isEqual';
import constants from 'app/constants/defaults';
import HubHeader from 'app/components/common/HubHeader';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import { Spinner } from 'app/components/spinner/index';
import type { TAccountDetailsItem, TInfoItem } from '../../types';

type TAccountSettings = {
  children: React.Node,
  location: Object,
  isFetching: boolean,
  accountMenuList: Object<TInfoItem>,
  accountDetails: Object<TAccountDetailsItem>,
};

class AccountSettings extends Component<TAccountSettings> {
  componentDidMount() {
    const { fetchAccountSettingsAction } = this.props;
    fetchAccountSettingsAction();
  }

  componentDidUpdate(prevProps) {
    const { fetchAccountSettingsAction, accountDetails } = this.props;
    if (!isEqual(prevProps.accountDetails, accountDetails) && prevProps.accountDetailsHeading) {
      fetchAccountSettingsAction();
    }
  }

  getMenuList = items => {
    return items ? Object.values(items).map(item => item) : [];
  };

  render() {
    const { children, location, isFetching, accountMenuList } = this.props;
    const items = this.getMenuList(accountMenuList);
    if (isFetching) return <Spinner loading={isFetching} />;
    return (
      <Fragment>
        <HubHeader
          showIcon
          icon={sloohLogoAstronaut}
          title={constants.ACCOUNT_CONTROLS_PAGE_TITLE}
          renderNav={() => (
            <div className="navigation-bar">
              <Nav items={items} location={location} style={{ padding: 0 }} />
            </div>
          )}
        />
        {children}
      </Fragment>
    );
  }
}

export { AccountSettings };
