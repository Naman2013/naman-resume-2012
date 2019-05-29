// @flow

import { LiveShowControl } from 'app/components/GlobalNavigation/Menus/livecast/liveshow-control';
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
  liveShows: any,
};

export const LivecastPopup = (props: TLivecastPopup) => {
  const {
    setOpen,
    livecastData,
    onVolumeChange,
    volume: initialVolume,
    isPlaying,
    setPlaying,
    liveShows,
  } = props;
  const { displayTitle = '', LiveShowData = {} } = livecastData;

  console.log(liveShows);

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
        {Object.values(liveShows).map(liveShow => (
          <LiveShowControl liveShow={liveShow} />
        ))}
      </div>
    </div>
  );
};
