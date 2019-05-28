// @flow

import React from 'react';
import useOnClickOutside from 'use-onclickoutside';

type TLivecastPopup = {
  setOpen: Function,
};

export const LivecastPopup = (props: TLivecastPopup) => {
  const { setOpen } = props;

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div className="livecast-popup animated fadeIn faster" ref={ref}>
      popup
    </div>
  );
};
