import * as React from 'react';
import { Button } from 'react-bootstrap';

type PreviewModeProps = {
  goToEdit?: () => void;
  goToFinish?: () => void;
};

export const PreviewMode: React.FC<PreviewModeProps> = props => {
  const { goToEdit, goToFinish } = props;
  return (
    <>
      <h1>Preview Mode</h1>
      <div className="text-center">
        <Button onClick={goToFinish}>Finish</Button>
        <Button onClick={goToEdit}>Back to Edit</Button>
      </div>
    </>
  );
};
