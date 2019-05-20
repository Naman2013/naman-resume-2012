import React, { Suspense } from 'react';

const AskAstronomerContainer = React.lazy(() =>
  import('./containers/AskAstronomer')
);

export const AskAstronomerMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <AskAstronomerContainer {...props} />
  </Suspense>
);

const QuestionContainer = React.lazy(() => import('./containers/question'));

export const QuestionMain = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <QuestionContainer {...props} />
  </Suspense>
);
