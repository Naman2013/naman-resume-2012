import React from 'react';
import { storiesOf } from '@storybook/react';
import LailaTile from '../app/components/common/tiles/LailaTile';

storiesOf('Common Tiles', module)
  .add('LailaTile', () => (
    <LailaTile
      title="Venus"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />
  ));
