import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import ObjectDetailsSectionTitle from '../app/components/object-details/ObjectDetailsSectionTitle';

storiesOf('ObjectDetailsSectionTitle', module)
  .add('Default', () => (
    <Fragment>
      <DeviceProvider>
        <ObjectDetailsSectionTitle title="The Moon's" subTitle="Featured Observations" />
      </DeviceProvider>
    </Fragment>
  ));
