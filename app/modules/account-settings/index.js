import React, { Suspense } from 'react';

const AccountSettingsContainer = React.lazy(() =>
  import('./containers/account-settings')
);

export const AccountSettingsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <AccountSettingsContainer {...props} />
  </Suspense>
);
