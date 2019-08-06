// @flow
import React, { Component, Fragment } from 'react';
import Nav from 'app/components/common/nav';
import isEqual from 'lodash/fp/isEqual';
import constants from 'app/constants/defaults';
import HubHeader from 'app/components/common/HubHeader';
import { sloohLogoAstronaut } from 'app/styles/variables/iconURLs';
import { Spinner } from 'app/components/spinner/index';
import type { TCustomerAdminToolsItem, TInfoItem } from '../../types';

type TCustomerAdminTools = {
  children: React.Node,
  location: Object,
  isFetching: boolean,
  customerAdminToolsURL: string,
};

class CustomerAdminTools extends Component<TCustomerAdminTools> {
  componentDidMount() {
    const { fetchCustomerAdminToolsAction } = this.props;
    fetchCustomerAdminToolsAction();
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const { location, isFetching, customerAdminToolsURL } = this.props;
    return (
      <Fragment>
        <HubHeader
          showIcon
          icon={sloohLogoAstronaut}
          title={constants.CUSTOMER_ADMIN_TOOLS_PAGE_TITLE}
        />
        <iframe style={{
          width: "100%",
          minHeight: "600px",
          }} src={customerAdminToolsURL}/>
      </Fragment>
    );
  }
}

export { CustomerAdminTools };
