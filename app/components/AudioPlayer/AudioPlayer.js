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
const PLAYER_OPTIONS = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 1,
  },
};

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
};

const AudioPlayer = ({
  isLiveEvent,
  backgroundColorRGB,
  playAudioWhenLive, // TODO
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
  showIndicatorWhenLive, // TODO
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
}) => {
  const showSubtitle =
    (!isLiveEvent && showSubtitleBeforeLive) || (isLiveEvent && showSubtitleWhenLive);
  const subTitleText = isLiveEvent ? liveSubtitleText : beforeLiveSubtitleText;

  const subTitleTextInlineStyle = {
    color: isLiveEvent ? beforeLiveSubtitleColorRGB : liveSubtitleColorRGB,
  };

  const containerInlineStyle = {
    backgroundColor: backgroundColorRGB,
  };

  const titleInlineStyle = {
    color: titleColorRGB,
  };

  const headerInlineStyle = {
    color: liveIndicatorColorRGB,
  };

  return (
    <div style={containerInlineStyle} className="root">
      <div className="missing-player">
        <YouTube onReady={onPlayerReady} videoId={streamCode} opts={PLAYER_OPTIONS} />
      </div>

      <div className="controls">
        <VolumeControls
          onVolumeChange={updateVolume}
          handleMute={mutePlayer}
          handleUnMute={unMutePlayer}
        />
      </div>

      <div className="content">
        <Header text={liveIndicatorText} inlineTitleStyle={headerInlineStyle} />
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
          padding: 10px 0;
          background-color: ${darkBlueGray};
        }

        .controls {
          align-self: flex-start;
          padding-top: 4px;
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
