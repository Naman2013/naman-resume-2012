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

  const handleVolumeChange = evt => {
    const { value } = evt.target;
    setVolume(value);
    if (isPlaying) {
      onVolumeChange(value);
    }
  };

  const mute = () => {
    setVolume(0);
    if (isPlaying) {
      onVolumeChange(0);
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

      <div className="controls">
        <input
          type="range"
          name="points"
          min="0"
          max="100"
          onChange={handleVolumeChange}
          value={volume}
          id="volume-range"
        />

        <Tooltip title="Mute">
          <div
            className="player-control-btn"
            role="presentation"
            onClick={mute}
          >
            <span className="icon-volume-muted" />
          </div>
        </Tooltip>

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
