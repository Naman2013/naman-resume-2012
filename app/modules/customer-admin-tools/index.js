import React, { Suspense } from 'react';

const CustomerAdminToolsContainer = React.lazy(() =>
  import('./containers/customer-admin-tools')
);

export const CustomerAdminToolsMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <CustomerAdminToolsContainer {...props} />
  </Suspense>
);
