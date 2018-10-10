import React from 'react';
import { ColumnTabs } from 'components/Tabs';
import {
  TabConditions,
  TabLive,
  TabQueue,
  TabTelescope,
} from 'components/telescope-details/v4-modules';

const TelescopeDetails = () => (
  <div>
    <ColumnTabs
      tabConfiguration={[
        { tabTitle: 'Live', content: () => (<TabLive />) },
        { tabTitle: 'Queue', content: () => (<TabQueue />) },
        { tabTitle: 'Cond.', content: () => (<TabConditions />) },
        { tabTitle: 'Scope', content: () => (<TabTelescope />) },
      ]}
    />
  </div>
);

export { TelescopeDetails };
