import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import AbelList from '../app/components/common/AbelList';

storiesOf('AbelList', module)
  .add('Default', () => (
    <Fragment>
      <DeviceProvider>
        <AbelList list={['container 10 objects', 'category guide', 'beginners and up']} />
      </DeviceProvider>
    </Fragment>
  ));
