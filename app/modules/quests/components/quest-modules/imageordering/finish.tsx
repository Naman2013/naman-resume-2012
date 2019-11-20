import * as React from 'react';
import { Button } from 'react-bootstrap';

type FinishModeProps = {
  goToReview?: () => void;
};

export const FinishMode: React.FC<FinishModeProps> = props => {
  const { goToReview } = props;
  return (
    <>
      <h1>Finish Mode</h1>
      <div className="text-center">
        <Button onClick={goToReview}>Review</Button>
      </div>
    </>
  );
};
