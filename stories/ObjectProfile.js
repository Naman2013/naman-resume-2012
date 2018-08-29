import React from 'react';
import { storiesOf } from '@storybook/react';
import ObjectProfile from '../app/components/object-details/ObjectProfile';

storiesOf('ObjectProfile', module)
  .add('Default', () => (
    <ObjectProfile
      scienceName="Mars"
      objectSpecs={{
        ra: '1',
        dec: '2',
        magnitude: '100',
      }}
      visibilitySeason={{
        title: 'Sample visibility',
        observatories: [<p>Sample Test</p>, <p>Sample Test</p>],
      }}
      midnightCulmination={{
        label: 'Sample label',
        text: 'Sample text',
        description: 'And this is a description',
      }}
    />
  ));
