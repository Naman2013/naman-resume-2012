import React from 'react';
import { storiesOf } from '@storybook/react';
import ApplicationHeader from '../app/components/common/ApplicationHeader';

storiesOf('Application Header', module)
  .add('No live show', () => (
    <ApplicationHeader />
  ));
