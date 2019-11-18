import * as React from 'react';
import { Button } from 'react-bootstrap';

type EditModeProps = {
  readonly?: boolean; // TRUE if Finish mode
  goToPreview?: () => void;
};

export const EditMode: React.FC<EditModeProps> = props => {
  const { readonly = false, goToPreview } = props;
  return (
    <div>
      <h1>{readonly ? 'Finish mode' : 'Edit mode'}</h1>
      <div className="my-4" style={{ border: '1px solid' }}>
        Slot 1
      </div>
      <div className="my-4" style={{ border: '1px solid' }}>
        Slot 2
      </div>

      <div className="text-center">
        <Button onClick={goToPreview}>Preview</Button>
      </div>
    </div>
  );
};
