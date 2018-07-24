import React from 'react';
import { storiesOf } from '@storybook/react';
import BlueLineDrop from '../../app/components/common/BlueLineDrop';

storiesOf('BlueLineDrop layout', module)
  .add('Renders a container in desktop with a dropdown', () => (
    <BlueLineDrop
      title="Mission Details"
      isDesktop={true}
      render={() => <div>This is a cool guy div</div>}
    />
  ))
  .add('Renders a container in mobile without a dropdown', () => (
    <BlueLineDrop
      title="Mission Details"
      isDesktop={false}
      render={() => <div>This is a cool guy div</div>}
    />
  ));
