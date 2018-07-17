import React from 'react';
import { storiesOf } from '@storybook/react';
import LailaTile from '../app/components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';

storiesOf('Common Tiles', module)
  .add('LailaTile', () => (
    <LailaTile
      title="Venus"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />
  ))
  .add('LeighTile', () => (
    <LeighTile />
  ));
