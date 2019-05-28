// @flow

import type { TLivecastData } from 'app/components/GlobalNavigation/Menus/livecast/types';
import React from 'react';
import useOnClickOutside from 'use-onclickoutside';

type TLivecastPopup = {
  setOpen: Function,
  livecastData: TLivecastData,
};

export const LivecastPopup = (props: TLivecastPopup) => {
  const { setOpen, livecastData } = props;
  const { displayTitle = '', LiveShowData = {} } = livecastData;
  const { title = '', description = '' } = LiveShowData;

  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div className="livecast-popup animated fadeIn faster" ref={ref}>
      <div className="popup-header d-flex justify-content-between align-items-center">
        <span className="h4-custom">{displayTitle}</span>
        <span className="icon-close" onClick={close} role="presentation" />
      </div>
      <div className="popup-body">
        <div className="h2-custom">{title}</div>
        <p className="p-19">{description}</p>

        <hr />

        <div className="controls">
          <input type="range" name="points" min="0" max="100" />

          <div className="mute-btn">
            <span className="icon-volume-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};
