import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioPlayer from '../app/components/AudioPlayer';

const MOCK_TITLE = 'Paul discusses Hubble\'s Variable Nebula (NGC 2261).';


storiesOf('Audio Player', module)
  .add('LIVE audio', () => (
    <AudioPlayer
      description={MOCK_TITLE}
      YTVideoID="zOH0XN4smgM"
    />
  ));
