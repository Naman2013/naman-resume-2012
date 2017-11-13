import React from 'react';
import { storiesOf } from '@storybook/react';
import AudioPlayer from '../app/components/AudioPlayer';

storiesOf('Audio Player', module)
  .add('LIVE audio', () => (
    <AudioPlayer />
  ));
