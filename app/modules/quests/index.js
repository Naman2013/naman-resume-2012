import React, { Suspense } from 'react';

const QuestDetailsContainer = React.lazy(() =>
  import('./containers/quest-details/QuestDetails.redux')
);

export const QuestDetailsLazy = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <QuestDetailsContainer {...props} />
  </Suspense>
);
