import React from 'react';
import { storiesOf } from '@storybook/react';
import { StarShareCamera } from 'components/telescope-details';

storiesOf('StarShareCamera', module)
  .add('Default', () => (
    <StarShareCamera />
  ));
