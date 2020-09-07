// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import useOnClickOutside from 'use-onclickoutside';
import './range.scss';
import { StarPartyCard } from 'app/modules/new-dashboard/components/start-parties-card';

type TLivecastPopup = {
  setOpen: Function,
  title: string,
};

export const LivecastPopup = (props: TLivecastPopup) => {
  const { setOpen, title, children, partylist } = props;

  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div className="livecast-popup animated fadeIn faster" ref={ref}>
      {/* <div className="popup-header d-flex justify-content-between align-items-center">
        <span className="h4-custom">{title}</span>
        <Tooltip title="Close">
          <span className="icon-close" onClick={close} role="presentation" />
        </Tooltip>
      </div>
      <div className="popup-body">{children}</div> */}
      <div className="new-dash">
        <div className="party-list" style={{margin: "5px"}}>
          {partylist.map(party=>(
            <StarPartyCard
              party={party}
              style={{width: "100%", marginRight: "0px"}}                                
            />
          ))}                                                 
        </div>
        </div>

    </div>
  );
};
