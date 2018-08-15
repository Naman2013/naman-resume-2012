import React from 'react';
import { storiesOf } from '@storybook/react';
import DeviceProvider from '../app/providers/DeviceProvider';
import CenterColumn from '../app/components/common/CenterColumn';
import LailaTile from '../app/components/common/tiles/LailaTile';
import LeighTile from 'components/common/tiles/LeighTile';
import QuestTile from 'components/common/tiles/QuestTile';
import MissionTile from 'components/common/tiles/MissionTile';
import StoryTile from 'components/common/tiles/StoryTile';
import ShowTile from 'components/common/tiles/ShowTile';
import BobbieTile from 'components/common/tiles/BobbieTile';
import MonotonousTile from 'components/common/tiles/MonotonousTile';
import WinstonTile from 'components/common/tiles/WinstonTile';
import AveryTile from 'components/common/tiles/AveryTile';
import Host from 'components/Host';

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
  .add('ShowTile', () => (
    <CenterColumn>
      <ShowTile
        header="Upcoming Show"
        title="Countdown to the Slooh Messier Marathon"
        time="30 mins"
        author="Helen Avery"
        linkUrl="#"
      />
    </CenterColumn>
  ))
  .add('MonotonousTile', () => (
    <MonotonousTile
      label="Astronomical time"
      text="Topic 1"
    />
  ))
  .add('WinstonTile', () => (
    <WinstonTile
      linkText="Upcoming Show"
      linkUrl=""
      title="Countdown to the Slooh Show"
    />
  ))
  .add('AveryTile', () => (
    <AveryTile
      linkText="Upcoming Show"
      avatarURL="https://vega.slooh.com/icons/placeholders/avatar-dummy.png"
    />
  ))
  .add('Host', () => (
    <Host
      hostName="Helen Avery"
      hostPhotoURL="https://vega.slooh.com/icons/placeholders/avatar-dummy.png"
      hostTitle="Astronomer"
      hostGravity="100"
    />
  ));
