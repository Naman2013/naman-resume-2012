import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import AudioPlayer from '../app/components/AudioPlayer';
import EXAMPLE_RESPONSE from '../app/content/get-audio-player';

const MOCK_TITLE = "Paul discusses Hubble's Variable Nebula (NGC 2261).";
const YT_VIDEO_ID = 'zOH0XN4smgM';

const MockProvider = ({
  children,
  showAudioPlayerBeforeLive,
  showAudioPlayerWhenLive,
  backgroundColorRGB,
  playAudioWhenLive,
  streamCode,
  showTitle,
  titleText,
  titleColorRGB,
  showSubtitleBeforeLive,
  beforeLiveSubtitleText,
  beforeLiveSubtitleColorRGB,
  showSubtitleWhenLive,
  liveSubtitleText,
  liveSubtitleColorRGB,
  showIndicatorWhenLive,
  liveIndicatorText,
  liveIndicatorColorRGB,
  showVolumeControlWhenLive,
  volumeControlColorRGB,
  showMuteButtonWhenLive,
  muteButtonColorRGB,
  showTooltip,
  tooltipText,
  tooltipColorRGB,
  tooltipBackgroundRGB,
}) => (
  <div>
    {cloneElement(children, {
      showAudioPlayerBeforeLive,
      showAudioPlayerWhenLive,
      backgroundColorRGB,
      playAudioWhenLive,
      streamCode,
      showTitle,
      titleText,
      titleColorRGB,
      showSubtitleBeforeLive,
      beforeLiveSubtitleText,
      beforeLiveSubtitleColorRGB,
      showSubtitleWhenLive,
      liveSubtitleText,
      liveSubtitleColorRGB,
      showIndicatorWhenLive,
      liveIndicatorText,
      liveIndicatorColorRGB,
      showVolumeControlWhenLive,
      volumeControlColorRGB,
      showMuteButtonWhenLive,
      muteButtonColorRGB,
      showTooltip,
      tooltipText,
      tooltipColorRGB,
      tooltipBackgroundRGB,
    })}
  </div>
);

storiesOf('Audio Player', module)
  .add('LIVE audio', () => <AudioPlayer description={MOCK_TITLE} YTVideoID={YT_VIDEO_ID} />)
  .add('With getAudioAPI', () => (
    <MockProvider {...EXAMPLE_RESPONSE}>
      <AudioPlayer />
    </MockProvider>
  ));
