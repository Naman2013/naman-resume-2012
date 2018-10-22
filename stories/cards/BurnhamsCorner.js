import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../../app/providers/DeviceProvider';
import CenterColumn from '../../app/components/common/CenterColumn';
import BurnhamsCorner from '../../app/components/common/BurnhamsCorner';

const bcDesc = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it  tristique de ullam ecorpere pretium…';

const bcProps = {
  title: 'Lorem Ipsum Dolar Set',
  author: 'Paul Cox',
  descContent: bcDesc,
  imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
};

storiesOf('BurnhamsCorner', module)
  .add('BurnhamsCorner', () => (
    <DeviceProvider>
      <CenterColumn>
        <BurnhamsCorner {...bcProps} />
      </CenterColumn>
    </DeviceProvider>
  ));
