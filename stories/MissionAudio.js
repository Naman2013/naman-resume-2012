import React from 'react';
import { storiesOf } from '@storybook/react';
import MissionAudio from '../app/components/telescope-details/MissionAudio';

storiesOf('Mission Audio Module', module)
  .add('Plays audio', () => (
    <MissionAudio missionAudioURL="/audio/random-clip.mp3" />
  ));
