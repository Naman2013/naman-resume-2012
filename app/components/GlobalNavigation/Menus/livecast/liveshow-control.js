// @flow

import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';

type TLiveShowControl = {
  liveShow: any,
  onVolumeChange: Function,
  volume: number,
  isPlaying: boolean,
  play: Function,
  stop: Function,
  play: Function,
};

export const LiveShowControl = (props: TLiveShowControl) => {
  const { liveShow, volume: initialVolume, isPlaying, play, stop } = props;
  const { title = '', description = '' } = liveShow;

  const [volume, setVolume] = useState(initialVolume);

  const handleVolumeChange = evt => {
    const { value } = evt.target;
    setVolume(value);
    // onVolumeChange(value);
  };

  const mute = () => {
    setVolume(0);
    // onVolumeChange(0);
  };

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
          <div className="mute-btn" role="presentation" onClick={mute}>
            <span className="icon-volume-muted" />
          </div>
        </Tooltip>

        {!isPlaying && (
          <Tooltip title="Play">
            <div className="mute-btn" role="presentation" onClick={play}>
              <span className="icon-play" />
            </div>
          </Tooltip>
        )}

        {isPlaying && (
          <Tooltip title="Stop">
            <div className="mute-btn" role="presentation" onClick={stop}>
              <span className="icon-stop" />
            </div>
          </Tooltip>
        )}
      </div>

      <hr />
    </>
  );
};
