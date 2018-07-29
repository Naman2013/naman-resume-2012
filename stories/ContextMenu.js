import React from 'react';
import { storiesOf } from '@storybook/react';
import ContextMenu from '../app/components/common/ContextMenu';
import NoMarginContainer from './story-utils/NoMarginContainer';

storiesOf('ContextMenu', module)
  .add('Starting closed', () => (
    <NoMarginContainer>
      <div style={{ overFlow: 'hidden', float: 'right' }}>
        <ContextMenu />
      </div>
    </NoMarginContainer>
  ));
