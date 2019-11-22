import React, { KeyboardEvent, useEffect, useState } from 'react';
import './index.scss';
import { Tooltip } from 'react-tippy';
import { browserHistory } from 'react-router';
import { Rnd } from 'react-rnd';
import Button from 'app/components/common/style/buttons/Button';
import { isMobileDevice } from 'app/services.ts';
import cx from 'classnames';
import { getUserInfo } from 'app/modules/User';
import { isEnter } from 'app/modules/utils/keyIdentifier';
import { FeedItem } from '../feed-item/index';

const enableResizing = {
  top: true,
  left: true,
  right: true,
  bottom: true,
};

const disableResizing = {
  top: false,
  left: false,
  right: false,
  bottom: false,
};

const getResizableBoxConfigs = () => {
  const isMobile = isMobileDevice();
  const defaultWidth = 500;
  const defaultHeight = 450;
  const width = isMobile ? window.screen.availWidth : defaultWidth;
  const height = isMobile ? window.screen.availHeight - 53 : defaultHeight;

  return {
    width,
    height,
  };
};

const setMessageIdToLocalStorage = (id: string) => {
  window.localStorage.setItem('newMessageId', id);
};

const contentClickHandler = (e: KeyboardEvent<HTMLInputElement>, setOpen) => {
  // detect click on Link
  if (e.target instanceof HTMLAnchorElement) {
    const targetLink = e.target.closest('a');
    e.preventDefault();
    browserHistory.push(targetLink.href);

    // if Mobile then close modal
    const isMobile = isMobileDevice();

    if (isMobile) {
      setOpen(false);
    }
  }
};

const onKeyPressed = (e, setOpen) => {
  if (isEnter(e)) {
    contentClickHandler(e, setOpen);
  }
};

const submitMessage = (
  event: any,
  pubnubConnection: any,
  pubnubActivityFeedChannelName: string,
  userDisplayName: string,
  myTextInputField: any
) => {
  event.preventDefault();

  if (event.keyCode === 13) {
    let tmpUserDisplayName = userDisplayName;

    if (userDisplayName === '') {
      tmpUserDisplayName = '...';
    }

    let message = {
      id: -1,
      messageType: 'user-generated',
      currentUser: true,
      displayName: userDisplayName,
      customerUUID: getUserInfo().customerUUID,
      date: '',
      message_by_locale: {
        en: `<a href="/profile/public/${
          getUserInfo().customerUUID
        }/activity">${tmpUserDisplayName}</a> - ${event.target.value}`,
      },
    };
    setMessageIdToLocalStorage(null);

    //publish the message
    pubnubConnection.publish({
      message,
      channel: pubnubActivityFeedChannelName,
      sendByPost: false, // true to send via post
      storeInHistory: true, //override default storage options
    });
    myTextInputField.value = '';
    setTimeout(function() {
      let liveActivityWindowBodyFeedObj = document.getElementById(
        'live-activity-window-body-feed'
      );
      liveActivityWindowBodyFeedObj.scrollIntoView(false);
    }, 1000);
  }
};

type TLiveActivity = {
  activityFeedMessages: Array<any>;
  pubnubConnection: Record<string, any>;
  pubnubActivityFeedChannelName: string;
  userDisplayName: string;
  isChatEnabled: boolean;
  scrollActivityFeedToBottom: any;
};

export const LiveActivity = (props: TLiveActivity) => {
  const {
    scrollActivityFeedToBottom,
    isChatEnabled,
    activityFeedMessages,
  } = props;
  const [isOpen, setOpen] = React.useState(false);
  const isMobile = isMobileDevice();
  const defaultSize = getResizableBoxConfigs();
  const [isFullscreen, setFullscreen] = useState(false);
  const lastStorageMessageId = window.localStorage.getItem('newMessageId');
  const activityFeedMessage =
    activityFeedMessages[activityFeedMessages.length - 1] || {};

  const lastMessageId = activityFeedMessage.id
    ? activityFeedMessage.id
    : 'null';
  const lastMessageFromCurrentUser = activityFeedMessage.currentUser;

  //This effect used to hide global scroll when live activity opened in full screen mode
  useEffect(() => {
    if (isOpen && (isFullscreen || isMobile)) {
      document.body.classList.add('disable-overflow');
      document.documentElement.classList.add('disable-overflow');
    } else {
      document.body.classList.remove('disable-overflow');
      document.documentElement.classList.remove('disable-overflow');
    }
    if (isOpen) setMessageIdToLocalStorage(lastMessageId);
  }, [isFullscreen, isMobile, isOpen, lastMessageId]);

  return (
    <div
      className={cx('live-activity-wrapper', { 'full-screen': isFullscreen })}
    >
      {/* BTN */}
      <span
        role="presentation"
        className="icon-bubble-comment-streamline-talk"
        onClick={() => {
          setOpen(!isOpen);
          setMessageIdToLocalStorage(lastMessageId);
        }}
      />
      <span
        role="presentation"
        className={
          lastMessageId !== lastStorageMessageId &&
          !lastMessageFromCurrentUser &&
          !isOpen
            ? 'message-identifier'
            : ''
        }
        onClick={() => {
          setOpen(!isOpen);
          setMessageIdToLocalStorage(lastMessageId);
        }}
      />
      {/* WINDOW */}
      {isOpen && (
        <div
          className={cx('live-activity-window-wrapper', {
            'live-activity-window-wrapper-mobile': isMobile,
          })}
        >
          <Rnd
            default={{
              width: defaultSize.width,
              height: defaultSize.height,
              x: 0,
              y: 0,
            }}
            minWidth={300}
            minHeight={300}
            disableDragging={isFullscreen || isMobile}
            enableResizing={
              isFullscreen || isMobile ? disableResizing : enableResizing
            }
            dragHandleClassName="live-activity-window-header"
          >
            <div className="live-activity-window">
              <div className="live-activity-window-header d-flex justify-content-between align-items-center">
                <span className="h4-custom ">Live Feeds</span>
                <div className="live-activity-window-header-right">
                  <div className="desktop-container">
                    <Tooltip title="Fullscreen">
                      <Button
                        mod="full-screen-button"
                        renderIcon={() => <i className="fa fa-arrows-alt" />}
                        onClickEvent={() => setFullscreen(!isFullscreen)}
                      />
                    </Tooltip>
                  </div>
                  <Tooltip title="Close">
                    <div className="close-window">
                      <span
                        className="icon-close"
                        onClick={() => setOpen(false)}
                        role="presentation"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="live-activity-window-body">
                <p
                  style={{
                    color: '#007bff',
                    fontSize: '1.1em',
                    fontStyle: 'italic',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    cursor: 'pointer',
                  }}
                  onClick={scrollActivityFeedToBottom}
                  onKeyDown={scrollActivityFeedToBottom}
                  aria-hidden
                >
                  jump to newest
                </p>
                <br />
                <div
                  id="live-activity-window-body-feed"
                  className="live-activity-window-body-feed"
                >
                  {activityFeedMessages.map(feedItem => (
                    <FeedItem
                      item={feedItem}
                      contentClickHandler={e => contentClickHandler(e, setOpen)}
                      onKeyPressed={e => onKeyPressed(e, setOpen)}
                    />
                  ))}
                </div>
              </div>

              {isChatEnabled === true && (
                <div className="live-activity-window-footer">
                  <input
                    type="text"
                    placeholder="Please type a message"
                    onKeyUp={e =>
                      submitMessage(
                        e,
                        props.pubnubConnection,
                        props.pubnubActivityFeedChannelName,
                        props.userDisplayName,
                        e.target
                      )
                    }
                    onMouseDown={e => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          </Rnd>
        </div>
      )}
    </div>
  );
};
