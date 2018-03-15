import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalNavigation from '../app/components/GlobalNavigation';

storiesOf('Global Navigation', module)
  .add('Renders navigation', () => (
    <GlobalNavigation />
  ));
