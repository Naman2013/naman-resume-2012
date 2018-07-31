import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../../app/providers/DeviceProvider';
import CardObservations from '../../app/components/common/CardObservations';

const descriptionContent = 'Nam dapibus nisl vitae elit fringilla rutrum. Aenean lene lorem sollicitudin, erat a elementum toirutrum neeque sem pretium metuis, quis mollis nisl nunc it tristique de ullam ecorpere pretium…';

const props = {
  title: 'The Moon!',
  author: 'JESSICA ANDERSON',
  descContent: descriptionContent,
  imageSrcUrl: 'https://vega.slooh.com/assets/v4/placeholder/moon_sample.jpg',
  capturedDate: 'Jan 22, 2018',
};

storiesOf('CardObservations', module)
  .add('CardObservations', () => (
    <DeviceProvider>
      <CardObservations {...props} />
    </DeviceProvider>
  ));
