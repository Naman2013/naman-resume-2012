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
        {/* BTN */}
        <span
          role="presentation"
          className="icon-bubble-comment-streamline-talk"
          onClick={() => {}}
        />

        {/* WINDOW */}
        <div className="live-activity-window-wrapper">
          <Draggable handle=".live-activity-window-header">
            <div>
              <ResizableBox
                width={400}
                height={400}
                minConstraints={[300, 300]}
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
                  <div className="live-activity-window-body">
                    <div className="live-activity-window-feed">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aspernatur consectetur deserunt dignissimos, dolor est
                      expedita id itaque labore, nostrum odit perferendis
                      placeat quod, voluptatum. Culpa ipsam maxime natus
                      pariatur. Sed?
                    </div>

                    <div className="live-activity-window-msg-block">
                      <input type="text" />
                    </div>
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
