// @flow

import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';

type TLiveShowControl = {
  liveShow: any,
  onVolumeChange: Function,
  volume: number,
  isPlaying: boolean,
};

export const LiveShowControl = (props: TLiveShowControl) => {
  const {
    liveShow,
    volume: initialVolume,
    isPlaying,
    setPlay,
    onVolumeChange,
  } = props;
  const { title = '', description = '' } = liveShow;

  const [volume, setVolume] = useState(initialVolume);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(null);
  const [isMuted, setMuted] = useState(false);

  const handleVolumeChange = evt => {
    const { value } = evt.target;
    setVolume(value);
    if (Number(value) === 0) {
      setMuted(true);
    }
    if (Number(value) > 0) {
      setMuted(false);
    }
    if (isPlaying) {
      onVolumeChange(value);
    }
  };

  const mute = () => {
    setVolumeBeforeMute(volume);
    setVolume(0);
    setMuted(true);
    if (isPlaying) {
      onVolumeChange(0);
    }
  };

  const unmute = () => {
    setVolume(volumeBeforeMute);
    setMuted(false);
    if (isPlaying) {
      onVolumeChange(volumeBeforeMute);
    }
  };

  const play = () => {
    setPlay(liveShow.streamCode);
    onVolumeChange(volume);
  };
  const stop = () => setPlay(null);

  return (
    <>
      <div className="h2-custom">{title}</div>
      <p className="p-19">{description}</p>

      <hr />

      <div className="controls" id="volume-range">
        <input
          type="range"
          name="points"
          min="0"
          max="100"
          onChange={handleVolumeChange}
          value={volume}
        />

        {!isMuted && (
          <Tooltip title="Mute">
            <div
              className="player-control-btn"
              role="presentation"
              onClick={mute}
            >
              <span className="icon-volume-muted" />
            </div>
          </Tooltip>
        )}

        {isMuted && (
          <Tooltip title="Unmute">
            <div
              className="player-control-btn"
              role="presentation"
              onClick={unmute}
            >
              <span className="icon-volume" />
            </div>
          </Tooltip>
        )}

        {!isPlaying && (
          <Tooltip title="Play">
            <div
              className="player-control-btn"
              role="presentation"
              onClick={play}
            >
              <span className="icon-play" />
            </div>
          </Tooltip>
        )}

        {isPlaying && (
          <Tooltip title="Stop">
            <div
              className="player-control-btn"
              role="presentation"
              onClick={stop}
            >
              <span className="icon-stop" />
            </div>
          </Tooltip>
        )}
      </div>

      <hr />
    </>
  );
};
