import React from 'react';
import { storiesOf } from '@storybook/react';
import ContextMenu from '../app/components/common/ContextMenu';
import NoMarginContainer from './story-utils/NoMarginContainer';

const defaultProps = {
  isOpen: false,
  menuTopAdjustment: 100,
  title: 'Example title',
  count: 2,
  list: [{ title: 'Example title 1', linkURL: '#' }, { title: 'Another example', linkURL: '#' }],
};

storiesOf('ContextMenu', module)
  .add('Starting closed', () => (
    <NoMarginContainer>
      <div style={{ overFlow: 'hidden', float: 'right' }}>
        <ContextMenu {...defaultProps} />
      </div>
    </NoMarginContainer>
  ));
