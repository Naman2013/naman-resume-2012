import React from 'react';
import Draggable from 'react-draggable';
import './index.scss';
import { Tooltip } from 'react-tippy';
import { ResizableBox } from 'react-resizable';
import { FeedItem } from '../feed-item/index';

const feed = [
  {
    id: 1,
    user: 'Todd',
    currentUser: false,
    date: '09/11/2019 3:25PM',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit Aspernatur consectetur deserunt dignissimos, dolor est expedita id itaque labore, nostrum odit perferendis',
  },
  {
    id: 2,
    user: 'Ed',
    currentUser: false,
    date: '09/12/2019 5:25PM',
    text:
      'consectetur adipisicing elit Aspernatur consectetur deserunt dignissimos, dolor est expedita id itaque labore, nostrum odit perferendis',
  },
  {
    id: 3,
    user: 'Ivan',
    currentUser: true,
    date: '09/12/2019 10:25PM',
    text:
      'dignissimos, dolor est expedita id itaque labore, nostrum odit perferendis',
  },
  {
    id: 4,
    user: 'Sviatoslav',
    currentUser: false,
    date: '09/13/2019 1:25AM',
    text:
      'consectetur adipisicing elit Aspernatur consectetur deserunt dignissimos, dolor est expedita id itaque labore, nostrum odit perferendis',
  },
];

export const LiveActivity = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div className="live-activity-wrapper">
      {/* BTN */}
      <span
        role="presentation"
        className="icon-bubble-comment-streamline-talk"
        onClick={() => setOpen(!isOpen)}
      />

      {/* WINDOW */}
      {isOpen && (
        <div className="live-activity-window-wrapper">
          <Draggable handle=".live-activity-window-header">
            <div>
              <ResizableBox
                width={400}
                height={600}
                minConstraints={[300, 300]}
              >
                <div className="live-activity-window">
                  <div className="live-activity-window-header d-flex justify-content-between align-items-center">
                    <span className="h4-custom ">live feeds</span>
                    <Tooltip title="Close">
                      <span
                        className="icon-close"
                        onClick={() => setOpen(false)}
                        role="presentation"
                      />
                    </Tooltip>
                  </div>
                  <div className="live-activity-window-body">
                    <div className="live-activity-window-body-feed">
                      {feed.map(feedItem => (
                        <FeedItem item={feedItem} />
                      ))}
                    </div>
                  </div>

                  <div className="live-activity-window-footer">
                    <input type="text" placeholder="Type your message" />
                  </div>
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
};
