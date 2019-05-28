// @flow

import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';
import useOnClickOutside from 'use-onclickoutside';
import './range.scss';

type TLivecastPopup = {
  setOpen: Function,
  livecastData: TLivecastData,
  onVolumeChange: Function,
  volume: number,
  isPlaying: boolean,
  setPlaying: Function,
};

export const LivecastPopup = (props: TLivecastPopup) => {
  const {
    setOpen,
    livecastData,
    onVolumeChange,
    volume: initialVolume,
    isPlaying,
    setPlaying,
  } = props;
  const { displayTitle = '', LiveShowData = {} } = livecastData;
  const { title = '', description = '' } = LiveShowData;

  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  const [volume, setVolume] = useState(initialVolume);

  const handleVolumeChange = evt => {
    const { value } = evt.target;
    setVolume(value);
    onVolumeChange(value);
  };

  const mute = () => {
    setVolume(0);
    onVolumeChange(0);
  };

  const play = () => setPlaying(true);
  const stop = () => setPlaying(false);

  return (
    <div className="livecast-popup animated fadeIn faster" ref={ref}>
      <div className="popup-header d-flex justify-content-between align-items-center">
        <span className="h4-custom">{displayTitle}</span>
        <Tooltip title="Close">
          <span className="icon-close" onClick={close} role="presentation" />
        </Tooltip>
      </div>
      <div className="popup-body">
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
      </div>
    </div>
  );
};
