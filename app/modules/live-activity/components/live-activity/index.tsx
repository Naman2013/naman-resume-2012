import * as React from 'react';
// @ts-ignore
import Draggable from 'react-draggable';
import './index.scss';
// @ts-ignore
import { Tooltip } from 'react-tippy';
// @ts-ignore
import { ResizableBox } from 'react-resizable';

type TLiveActivity = {};

export class LiveActivity extends React.Component<TLiveActivity, {}> {
  render() {
    return (
      <div className="live-activity-wrapper">
        <span
          role="presentation"
          className="icon-bubble-comment-streamline-talk"
          onClick={() => {}}
        />
        <div className="live-activity-window-wrapper">
          <Draggable handle=".live-activity-window-header">
            <div>
              <ResizableBox
                width={400}
                height={400}
                minConstraints={[300, 300]}
                // maxConstraints={[300, 300]}
              >
                <div className="live-activity-window">
                  <div className="live-activity-window-header d-flex justify-content-between align-items-center">
                    <span className="h4-custom ">live feeds</span>
                    <Tooltip title="Close">
                      <span
                        className="icon-close"
                        onClick={close}
                        role="presentation"
                      />
                    </Tooltip>
                  </div>
                  <div className="popup-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Alias in laudantium qui voluptatibus? Asperiores consequatur
                    cum dignissimos distinctio eaque, expedita nesciunt odio
                    tempore veniam vitae. Aut commodi id laudantium provident!
                  </div>
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
}
