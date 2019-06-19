import React, { Suspense } from 'react';

const QuestDetailsContainer = React.lazy(() =>
  import('./containers/quest-details/QuestDetails.redux')
);
const QuestStepContainer = React.lazy(() =>
  import('./containers/quest-step/quest-step.redux')
);

export const QuestDetailsLazy = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <QuestDetailsContainer {...props} />
  </Suspense>
);

export const QuestStepLazy = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <QuestStepContainer {...props} />
  </Suspense>
);
