import React from 'react';
import { storiesOf } from '@storybook/react';
import ContextMenu from '../app/components/common/ContextMenu';

storiesOf('ContextMenu', module)
  .add('Starting closed', () => (
    <div style={{ overFlow: 'hidden', float: 'right' }}>
      <ContextMenu />
    </div>
  ));
