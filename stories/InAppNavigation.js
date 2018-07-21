import React from 'react';
import { storiesOf } from '@storybook/react';
import InAppNavigation from '../app/components/common/InAppNavigation';

storiesOf('InAppNavigation', module)
  .add('With `previousText`', () => (
    <InAppNavigation title="Topic: 1 Astronomical Time" previousText="guide" />
  ))
  .add('Without `previousText`', () => (
    <InAppNavigation title="Topic: 1 Astronomical Time" />
  ))
  .add('Menu open by default', () => (
    <InAppNavigation
      isOpen
      title="Topic: 1 Astronomical Time"
    />
  ));
