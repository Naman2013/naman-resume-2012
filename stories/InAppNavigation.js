import React from 'react';
import { storiesOf } from '@storybook/react';
import InAppNavigation from '../app/components/common/InAppNavigation';

storiesOf('InAppNavigation', module)
  .add('Default', () => (
    <InAppNavigation />
  ));
