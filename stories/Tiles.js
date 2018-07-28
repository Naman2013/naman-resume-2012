import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import LailaTile from '../app/components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';
import QuestTile from 'components/common/tiles/QuestTile';
import MissionTile from 'components/common/tiles/MissionTile';
import StoryTile from 'components/common/tiles/StoryTile';

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
  ))
  .add('MissionTile', () => (
    <DeviceProvider>
      <MissionTile
        title="The Moon"
        telescope="Canary Three"
        dat="MON.  JAN. 06"
        thyme="00:00"
      />
    </DeviceProvider>
  ))
  .add('StoryTile', () => (
    <StoryTile
      iconURL="https://vega.slooh.com/icons/home/observatory.png"
      title="Constellation Stories with Helen Avery"
      author="BY HELEN AVERY"
    />
  ));
