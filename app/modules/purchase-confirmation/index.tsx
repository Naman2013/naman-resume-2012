import React, { Suspense } from 'react';

const PurchaseConfirmationContainer = React.lazy(() =>
  import('./containers/purchase-confirmation')
);

export const PurchaseConfirmationMain = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <PurchaseConfirmationContainer {...props} />
  </Suspense>
);
