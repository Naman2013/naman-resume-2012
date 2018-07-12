import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../app/components/object-details/ObjectDetailsSectionTitle';

storiesOf('ObjectDetailsSectionTitle', module)
  .add('Default', () => (
    <Fragment>
      <DeviceProvider>
        <ObjectDetailsSectionTitle list={['The Moons', 'Upcoming Missions']} />
      </DeviceProvider>
    </Fragment>
  ));
