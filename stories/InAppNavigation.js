import React from 'react';
import { storiesOf } from '@storybook/react';
import InAppNavigation from '../app/components/common/InAppNavigation';
import NoMarginContainer from './story-utils/NoMarginContainer';


storiesOf('InAppNavigation', module)
  .add('With `previousText`', () => (
    <NoMarginContainer>
      <InAppNavigation title="Topic: 1 Astronomical Time" previousText="guide" />
    </NoMarginContainer>
  ))
  .add('Without `previousText`', () => (
    <NoMarginContainer>
      <InAppNavigation title="Topic: 1 Astronomical Time" />
    </NoMarginContainer>
  ))
  .add('Menu open by default', () => (
    <NoMarginContainer>
      <InAppNavigation
        isOpen
        title="Topic: 1 Astronomical Time"
      />
    </NoMarginContainer>
  ));
