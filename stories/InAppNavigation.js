import React from 'react';
import { storiesOf } from '@storybook/react';
import InAppNavigation from '../app/components/common/InAppNavigation';
import NoMarginContainer from './story-utils/NoMarginContainer';

const menuProps = {
  contextMenuTitle: 'Menu title',
  contextMenuCount: 2,
  list: [{ title: 'Example title', linkURL: '#' }, { title: 'Another example', linkURL: '#' }],
  menuTopAdjustment: 98,
  backLinkURL: '#',
};

storiesOf('InAppNavigation', module)
  .add('With `previousText`', () => (
    <NoMarginContainer>
      <InAppNavigation
        title="Topic: 1 Astronomical Time"
        previousText="guide"
        {...menuProps}
      />
    </NoMarginContainer>
  ))
  .add('Without `previousText`', () => (
    <NoMarginContainer>
      <InAppNavigation
        title="Topic: 1 Astronomical Time"
        {...menuProps}
      />
    </NoMarginContainer>
  ))
  .add('Menu open by default', () => (
    <NoMarginContainer>
      <InAppNavigation
        isOpen
        title="Topic: 1 Astronomical Time"
        {...menuProps}
      />
    </NoMarginContainer>
  ));
