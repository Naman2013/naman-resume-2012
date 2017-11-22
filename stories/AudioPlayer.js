import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioPlayer from '../app/components/AudioPlayer';

const MOCK_TITLE = 'Paul discusses Hubble\'s Variable Nebula (NGC 2261).';
const YT_VIDEO_ID = 'zOH0XN4smgM';

storiesOf('Audio Player', module)
  .add('LIVE audio', () => (
    <AudioPlayer
      description={MOCK_TITLE}
      YTVideoID={YT_VIDEO_ID}
    />
  ));
