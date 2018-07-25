import React from 'react';
import { storiesOf } from '@storybook/react';
import LailaTile from '../app/components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';
import QuestTile from 'components/common/tiles/QuestTile';

storiesOf('Tiles', module)
  .add('LailaTile', () => (
    <LailaTile
      title="Venus"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
    />
  ))
  .add('LeighTile', () => (
    <LeighTile
      title="Astronomical time"
      anchorText="Topic 1"
    />
  ))
  .add('QuestTile', () => (
    <QuestTile
      title="Capture The Solar System"
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
      anchorText="Beginner"
    />
  ));
