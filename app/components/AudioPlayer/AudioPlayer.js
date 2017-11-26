import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Header from './Header';
import Description from './Description';
import VolumeControls from './VolumeControls';

import { darkBlueGray } from '../../styles/variables/colors';

/*
  TODO: refactor how the initial setting of the volume is done
  right now it is a couple of hard coded default values

  TODO: clean up the functions
*/

let PLAYER = null;

const INITIAL_VOLUME = 25;

function mutePlayer() {
  if (PLAYER) {
    PLAYER.mute();
  }
}

function unMutePlayer() {
  if (PLAYER) {
    PLAYER.unMute();
  }
}

function updateVolume(volume) {
  if (PLAYER) {
    PLAYER.setVolume(volume);
  }
}

function onPlayerReady(event) {
  event.target.setVolume(INITIAL_VOLUME);
  PLAYER = event.target;
}

const propTypes = {
  isLiveEvent: PropTypes.bool,
  eventStart: PropTypes.number,
  eventEnd: PropTypes.number,
  backgroundColorRGB: PropTypes.string,
  playAudioWhenLive: PropTypes.bool,
  streamCode: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  titleText: PropTypes.string,
  titleColorRGB: PropTypes.string,
  showSubtitleBeforeLive: PropTypes.bool,
  beforeLiveSubtitleText: PropTypes.string,
  beforeLiveSubtitleColorRGB: PropTypes.string,
  showSubtitleWhenLive: PropTypes.bool,
  liveSubtitleText: PropTypes.string,
  liveSubtitleColorRGB: PropTypes.string,
  showIndicatorWhenLive: PropTypes.bool,
  liveIndicatorText: PropTypes.string,
  liveIndicatorColorRGB: PropTypes.string,
  showVolumeControlWhenLive: PropTypes.bool,
  volumeControlColorRGB: PropTypes.string,
  showMuteButtonWhenLive: PropTypes.bool,
  muteButtonColorRGB: PropTypes.string,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  tooltipColorRGB: PropTypes.string,
  tooltipBackgroundRGB: PropTypes.string,
  showSubtitleAfterEnd: PropTypes.bool,
  afterEndSubtitleText: PropTypes.string,
  afterEndSubtitleColorRGB: PropTypes.string,
  minimumVolumeLevel: PropTypes.number,
  maximumVolumeLevel: PropTypes.number,
};

const defaultProps = {
  isLiveEvent: false,
  backgroundColorRGB: '#465763',
  playAudioWhenLive: false,
  showTitle: false,
  titleText: '',
  titleColorRGB: '#FFFFFF',
  showSubtitleBeforeLive: false,
  beforeLiveSubtitleText: '',
  beforeLiveSubtitleColorRGB: '#80C3C3',
  showSubtitleWhenLive: false,
  liveSubtitleText: '',
  liveSubtitleColorRGB: '#F310A7',
  showIndicatorWhenLive: false,
  liveIndicatorText: '',
  liveIndicatorColorRGB: '#EFD361',
  showVolumeControlWhenLive: false,
  volumeControlColorRGB: '#0F2126',
  showMuteButtonWhenLive: false,
  muteButtonColorRGB: '#0F2126',
  showTooltip: false,
  tooltipText: '',
  tooltipColorRGB: '#FFFFFF',
  tooltipBackgroundRGB: '#3C4A55',
  showSubtitleAfterEnd: false,
  afterEndSubtitleText: '',
  afterEndSubtitleColorRGB: '',
  minimumVolumeLevel: 0,
  maximumVolumeLevel: 100,
  eventStart: 0,
  eventEnd: 0,
};

const AudioPlayer = ({
  isLiveEvent,
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
  showSubtitleAfterEnd,
  afterEndSubtitleText,
  afterEndSubtitleColorRGB,
  eventStart,
  eventEnd,
  minimumVolumeLevel, // TODO: this somehow needs to be implemented
  maximumVolumeLevel,
  showTooltip, // TODO: tooltip to be added in future iteration
  tooltipText,
  tooltipColorRGB,
  tooltipBackgroundRGB,
}) => {
  const eventTimeDifference = eventEnd - eventStart;
  const isBeforeEvent = !isLiveEvent && eventTimeDifference >= 0;
  const isAfterEvent = !isLiveEvent && eventTimeDifference <= 0;

  const showSubtitle =
    (isBeforeEvent && showSubtitleBeforeLive) ||
    (isAfterEvent && showSubtitleAfterEnd) ||
    (isLiveEvent && showSubtitleWhenLive);

  const subTitleText = isLiveEvent
    ? liveSubtitleText
    : isBeforeEvent ? beforeLiveSubtitleText : afterEndSubtitleText;

  const subTitleTextInlineStyle = {
    color: isLiveEvent
      ? liveSubtitleColorRGB
      : isBeforeEvent ? beforeLiveSubtitleColorRGB : afterEndSubtitleColorRGB,
  };

  const showMute = isLiveEvent && showMuteButtonWhenLive;

  const showVolumeControl = isLiveEvent && showVolumeControlWhenLive;

  const showLiveIndicator = isLiveEvent && showIndicatorWhenLive;

  const containerInlineStyle = {
    backgroundColor: backgroundColorRGB,
  };

  const titleInlineStyle = {
    color: titleColorRGB,
  };

  const headerInlineStyle = {
    color: liveIndicatorColorRGB,
  };

  const playerAutoPlay = isLiveEvent && playAudioWhenLive ? 1 : 0;

  const PLAYER_OPTIONS = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: playerAutoPlay,
    },
  };

  return (
    <div style={containerInlineStyle} className="root">
      {isLiveEvent &&
        playAudioWhenLive && (
          <div className="missing-player">
            <YouTube onReady={onPlayerReady} videoId={streamCode} opts={PLAYER_OPTIONS} />
          </div>
        )}

      {showVolumeControl && (
        <div className="controls">
          <VolumeControls
            volumeControlsColor={volumeControlColorRGB}
            muteButtonColor={muteButtonColorRGB}
            showMuteButton={showMute}
            onVolumeChange={updateVolume}
            handleMute={mutePlayer}
            handleUnMute={unMutePlayer}
          />
        </div>
      )}

      <div className="content">
        {showLiveIndicator && (
          <Header text={liveIndicatorText} inlineTitleStyle={headerInlineStyle} />
        )}
        <Description
          subTitleText={subTitleText}
          showSubTitle={showSubtitle}
          subTitleInlineStyle={subTitleTextInlineStyle}
          titleInlineStyle={titleInlineStyle}
          titleText={titleText}
          showTitle={showTitle}
        />
      </div>

      <style jsx>{`
        .root {
          display: flex;
          width: 260px;
          height: 70px;
          overflow: hidden;
          padding: 10px 0 0 10px;
          background-color: ${darkBlueGray};
        }

        .controls {
          align-self: flex-start;
          padding-top: 4px;
          margin-left: -10px;
        }

        .content {
          align-self: flex-start;
          width: 80%;
        }
      `}</style>
    </div>
  );
};

AudioPlayer.propTypes = propTypes;
AudioPlayer.defaultProps = defaultProps;

export { AudioPlayer as default };
