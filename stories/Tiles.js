import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import LailaTile from 'components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';
import QuestTile from 'components/common/tiles/QuestTile';
import MissionTile from 'components/common/tiles/MissionTile';
import StoryTile from 'components/common/tiles/StoryTile';
import BobbieTile from 'components/common/tiles/BobbieTile';
import MonotonousTile from 'components/common/tiles/MonotonousTile';
import { SAMPLE_IMAGE_HTML_BLOB, SAMPLE_VIDEO_HTML_BLOB } from './content/getGuidesPanels';

storiesOf('Tiles', module)
  .add('BobbieTile - 40_60_SPLIT with image', () => (
    <BobbieTile
      title="Check out this tutorial"
      readDuration="30"
      authorName="Paul Cox"
      HTMLBlob={SAMPLE_IMAGE_HTML_BLOB}
    />
  ))
  .add('BobbieTile - 60_40_SPLIT with video', () => (
    <BobbieTile
      title="This video has magic"
      readDuration="10"
      authorName="John Masse"
      HTMLBlob={SAMPLE_VIDEO_HTML_BLOB}
    />
  ))
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
  ))
  .add('MonotonousTile', () => (
    <MonotonousTile
      title="Astronomical time"
      text="Topic 1"
    />
  ));
