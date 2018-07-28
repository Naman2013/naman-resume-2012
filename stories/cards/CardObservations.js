import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../../app/providers/DeviceProvider';
import CardObservations from '../../app/components/common/CardObservations';

storiesOf('CardObservations', module)
  .add('CardObservations', () => (
    <DeviceProvider>
      <CardObservations />
    </DeviceProvider>
  ));
