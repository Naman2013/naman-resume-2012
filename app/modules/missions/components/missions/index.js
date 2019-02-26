import HubHeader from 'app/components/common/HubHeader';
import UnderlineNav from 'app/components/common/UnderlineNav';
import { Nav } from 'app/modules/missions/components/nav';

import React, { cloneElement, Component } from 'react';

const navItems = [
  { title: 'By Slooh 1000', linkURL: '/missions/slooh-1000' },
  { title: 'By Catalog', linkURL: '/missions/catalog' },
  { title: 'By Telescope', linkURL: '/missions/telescope' },
];

export class Missions extends Component {
  componentWillMount = () => {};

  fetchData = () => {
    // const { getMissions, params } = this.props;
    // const { customerUUID } = params;
    // getMissions(customerUUID);
  };

  render() {
    const { params, children } = this.props;
    return (
      <div>
        <HubHeader
          icon="iconURL"
          title="pageTitle"
          // renderRightMenu
          showIcon
          renderNav={() => (
            <div className="navigation-bar">
              <UnderlineNav navItems={navItems} parentPath="missions" />
              <Nav />
            </div>
          )}
        />

        {children}
      </div>
    );
  }
}
