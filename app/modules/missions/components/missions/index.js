import HubHeader from 'app/components/common/HubHeader';

import React, { cloneElement, Component } from 'react';

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
              {/*<UnderlineNav
              activeFilter={filterType}
              activeSort={sort}
              navItems={filterOptions}
              parentPath={hubName}
            />
            {(!this.props.isCreateMode && useSort) ?
              <HubSort
                defaultIndex={defaultSortIndex}
                handleSort={this.handleSortChange}
                sortItems={sortOptions}
              /> : null}*/}
              menu
            </div>
          )}
        />
      </div>
    );
  }
}
