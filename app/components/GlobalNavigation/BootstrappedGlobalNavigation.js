import { projectPubnubConf } from 'app/config/project-config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import {
  closeAllMenus,
  closeUpsellModal,
  toggleGlobalNavMenu,
  toggleGlobalNavNotificationMenu,
} from 'app/modules/global-navigation/actions';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import { screenLarge } from 'app/styles/variables/breakpoints';
import debounce from 'lodash/debounce';

//integrate with Pubnub
import PubNubReact from 'pubnub-react';
import { getUserInfo } from 'app/modules/User';
import MENU_INTERFACE, { isLeft, isRight } from './Menus/MenuInterface';
import Menu from './Menu';
import TopBar from './TopBar';

const mapStateToProps = ({
  globalNavigation,
  routing: {
    locationBeforeTransitions: { key },
  },
  user,
}) => ({
  routeKey: key,
  user,
  ...globalNavigation,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      closeAllMenus,
      closeUpsellModal,
      toggleGlobalNavMenu,
      toggleGlobalNavNotificationMenu,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GlobalNavigation extends Component {
  static propTypes = {
    actions: PropTypes.shape({}),
    activeLeft: PropTypes.string,
    activeMenu: PropTypes.string,
    activeRight: PropTypes.string,
    isLeftOpen: PropTypes.bool,
    isNotificationMenuOpen: PropTypes.bool,
    isRightOpen: PropTypes.bool,
    routeKey: PropTypes.string,
    showUpsellModal: PropTypes.bool,
    isMobile: PropTypes.bool,
    pubnubActivityFeedChannelName: PropTypes.string,
    pubnubLiveEventsChannelName: PropTypes.string,
  };

  static defaultProps = {
    actions: {},
    activeLeft: '',
    activeMenu: '',
    activeRight: '',
    isLeftOpen: false,
    isNotificationMenuOpen: false,
    isRightOpen: false,
    showUpsellModal: false,
    isMobile: false,
    pubnubActivityFeedChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.activityfeed`,
    pubnubLiveEventsChannelName: `${projectPubnubConf.PUBNUB_CHANNEL_PREFIX}.system.liveevents`,
  };

  state = {
    totalViewersCount: 0,
    allLivecastsInProgress: {},
    activityFeedMessages: [],
    activityFeedMembers: [],
    activityWindowHasBeenScrolledToBottom: false,
  };

  constructor(params) {
    super(params);

    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    this.debouncedCloseAll = debounce(this.closeAll, 500, {
      leading: true,
      trailing: false,
    });

    //get a connection to pubnub feeds
    this.pubnub = new PubNubReact({
      ssl: true,
      uuid: getUserInfo().cid,
      publishKey: projectPubnubConf.PUBNUB_FEEDS_PUBKEY,
      subscribeKey: projectPubnubConf.PUBNUB_FEEDS_SUBKEY,
      secretKey: projectPubnubConf.PUBNUB_FEEDS_SECRETKEY,
    });

    this.pubnub.addListener({
      status: statusEvent => {
        if (statusEvent.category === 'PNConnectedCategory') {
          this.pubnub.history(
            {
              channel: pubnubActivityFeedChannelName,
              count: 50,
              stringifiedTimeToken: false,
              reverse: false,
            },
            (status, response) => {
              let historyMessages = response.messages;
            }
          );
          this.pubnub.history(
            {
              channel: pubnubActivityFeedChannelName,
              count: 50,
              stringifiedTimeToken: false,
              reverse: false,
            },
            (status, response) => {
              let historyMessages = response.messages;

              historyMessages.forEach(historyMessage => {
                this.buildFeedMessage(historyMessage.entry, true);
              });

              setInterval(() => this.checkActivityWindowScroll(), 5000);
            }
          );
        } //end of if connected
      },
      message: msg => {
        //what channel did this message come from???
        const { channel } = msg;

        //what is the message??
        const { message } = msg;

        if (channel === pubnubLiveEventsChannelName) {
          if (message.messageType) {
            if (message.messageType === 'livecast') {
              if (message.action === 'broadcastUpdate') {
                //update the livecasts in progress
                this.setState({ allLivecastsInProgress: message.livecasts });
              }
            }
          }
        } else if (channel === pubnubActivityFeedChannelName) {
          this.buildFeedMessage(message, true);
        }
      },
      presence: presenceEvent => {
        // handle presence (users that have joined or left the channel)

        if (presenceEvent.channel === pubnubActivityFeedChannelName) {
          this.setState({ totalViewersCount: presenceEvent.occupancy });
        }
      },
    });

    this.pubnub.init(this);
  }


	  {/*
	  	make sure the API: /api/app/getActiveMembersOnline is called at least once when this event happens and refresh the API based on the expires value
	  	Request Parameters: cid, at, token, customerUUIDsList
	  	Response:
			membersOnlineCount: 2,
			membersOnlineList: [
				{
					displayName: 'ToddR',
					customerUUID: 'abc-def-abc',
					linkUrl: '/.....',
					gravityLabel: 'Level: Azophi',
					gravity: '676'
				},
				{
					displayName: 'ToddR1',
					customerUUID: 'abc-def-xyz',
					linkUrl: '/.....',
					gravityLabel: 'Level: Azophi',
					gravity: '722'
				}
			]
	  /*}

  componentDidMount() {
    const { isMobile } = this.props;
    if (!isMobile) {
      window.addEventListener('scroll', this.debouncedCloseAll);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { routeKey } = this.props;
    if (nextProps.routeKey !== routeKey) {
      this.debouncedCloseAll();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedCloseAll);

    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    //unmount pubnub
    this.pubnub.unsubscribe({
      channels: [
        pubnubActivityFeedChannelName,
        pubnubLiveEventsChannelName,
        `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
      ],
    });
  }

  subscribeToPubnubActivityFeedChannel = () => {
    const {
      pubnubActivityFeedChannelName,
      pubnubLiveEventsChannelName,
    } = this.props;

    this.pubnub.subscribe({
      channels: [
        pubnubActivityFeedChannelName,
        pubnubLiveEventsChannelName,
        `${process.env.PUBNUB_CHANNEL_PREFIX}.customer.${getUserInfo().cid}`,
      ],
      withPresence: true,
    });
  };

  scrollActivityFeedToBottom = () => {
    let liveActivityWindowBodyFeedObj = document.getElementById(
      'live-activity-window-body-feed'
    );
    if (liveActivityWindowBodyFeedObj != null) {
      liveActivityWindowBodyFeedObj.scrollIntoView(false);

      return true;
    }

    return false;
  };

  checkActivityWindowScroll = () => {
    const { activityWindowHasBeenScrolledToBottom } = this.state;

    if (activityWindowHasBeenScrolledToBottom === false) {
      let liveActivityWindowBodyFeedObj = document.getElementById(
        'live-activity-window-body-feed'
      );
      if (liveActivityWindowBodyFeedObj != null) {
        //scroll the activity feed to the bottom
        if (this.scrollActivityFeedToBottom() === true) {
          this.setState({ activityWindowHasBeenScrolledToBottom: true });
        }
      }
    }
  };

  buildFeedMessage = (message, appendFlag) => {
    const { activityFeedMessages: activityFeedMessagesState } = this.state;
    try {
      //messages are in JSON format
      let messageJSONObj = message;

      let isMessageFromCurrentUser = false;
      if (messageJSONObj.customerUUID === getUserInfo().customerUUID) {
        isMessageFromCurrentUser = true;
      }

      let newMessage = {
        id: messageJSONObj.messageID,
        user: messageJSONObj.displayName,
        currentUser: isMessageFromCurrentUser,
        date: messageJSONObj.displayTimestamp,
        text: messageJSONObj.message_by_locale.en,
      };

      if (appendFlag === true) {
        this.setState(() => {
          const activityFeedMessages = [
            ...activityFeedMessagesState,
            newMessage,
          ];
          return {
            activityFeedMessages,
          };
        });
      } else {
        this.setState(() => {
          const activityFeedMessages = [
            newMessage,
            ...activityFeedMessagesState,
          ];
          return {
            activityFeedMessages,
          };
        });
      }
    } catch (e) {
      //do nothing, ignore this message....
    }
  };

  closeAll = () => {
    const { actions } = this.props;
    actions.closeAllMenus();
  };

  closeUpsellModal = () => {
    const { actions } = this.props;
    actions.closeUpsellModal();
  };

  handleMenuClick = menuName => {
    const { activeMenu, actions, activeLeft, activeRight } = this.props;
    const sameMenu = menuName === activeMenu;
    const nextMenu = sameMenu ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = menuName === MENU_INTERFACE.DEFAULT.name;
    const isLeftUpdate = !sameMenu && !isDefault && isLeft(menuName);
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);
    actions.toggleGlobalNavMenu({
      activeMenu: nextMenu,
      isLeftOpen: isLeftUpdate,
      isRightOpen: isRightUpdate,
      activeLeft: isLeftUpdate ? menuName : activeLeft,
      activeRight: isRightUpdate ? menuName : activeRight,
      isNotificationMenuOpen: false,
    });
  };

  handleNotificationClick = menuName => {
    const { activeMenu, actions } = this.props;
    const sameMenu = menuName === activeMenu;
    const nextMenu = sameMenu ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = menuName === MENU_INTERFACE.DEFAULT.name;
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);
    actions.toggleGlobalNavNotificationMenu({
      activeMenu: nextMenu,
      isNotificationMenuOpen: isRightUpdate,
    });
  };

  render() {
    const {
      activeLeft,
      activeMenu,
      activeRight,
      isLeftOpen,
      isNotificationMenuOpen,
      isRightOpen,
      mainMenu,
      showUpsellModal,
      user,
      userMenu,
      pubnubActivityFeedChannelName,
    } = this.props;

    const {
      totalViewersCount,
      allLivecastsInProgress,
      activityFeedMessages,
    } = this.state;

    const leftMenuContent = MENU_INTERFACE[activeLeft];
    const rightMenuContent = MENU_INTERFACE[activeRight];
    const notificationMenuContent = MENU_INTERFACE[MENU_INTERFACE.ALERTS.name];

    let displayName =
      userMenu && userMenu.userInfo ? userMenu.userInfo.displayName : '';

    let isChatEnabled = true;

    if (userMenu && userMenu.userInfo) {
      const { userInfo } = userMenu;
      const {
        displayName: userInfoName,
        isChatEnabled: userInfoIsChatEnabled,
      } = userInfo;
      isChatEnabled = userInfoIsChatEnabled;
      displayName = userInfoName;
    }

    return (
      <div className="root">
        <div className="top-bar">
          <TopBar
            activeMenu={activeMenu}
            handleMenuClick={this.handleMenuClick}
            handleNotificationClick={this.handleNotificationClick}
            closeAllMenus={this.closeAll}
            totalViewersCount={totalViewersCount}
            allLivecastsInProgress={allLivecastsInProgress}
            activityFeedMessages={activityFeedMessages}
            pubnubConnection={this.pubnub}
            pubnubActivityFeedChannelName={pubnubActivityFeedChannelName}
            userDisplayName={displayName}
            isChatEnabled={isChatEnabled}
            scrollActivityFeedToBottom={this.scrollActivityFeedToBottom}
            subscribeToPubnubActivityFeedChannel={
              this.subscribeToPubnubActivityFeedChannel
            }
          />
        </div>

        <Menu
          title={leftMenuContent.title}
          handleClose={this.closeAll}
          position="left"
          width={leftMenuContent.menuWidth}
          widthUnits={leftMenuContent.menuWidthUnits}
          theme={leftMenuContent.theme}
          isOpen={isLeftOpen}
          render={props =>
            leftMenuContent.render(
              Object.assign({}, props, { userMenu, mainMenu })
            )
          }
        />

        <Menu
          title={rightMenuContent.title}
          handleClose={this.closeAll}
          position="right"
          isOpen={isRightOpen}
          width={rightMenuContent.menuWidth}
          widthUnits={rightMenuContent.menuWidthUnits}
          theme={rightMenuContent.theme}
          render={props =>
            rightMenuContent.render(
              Object.assign({}, props, { userMenu, mainMenu })
            )
          }
        />
        {/* Prerender Notification Menu */}
        {user.isAuthorized ? (
          <Menu
            title={notificationMenuContent.title}
            handleClose={this.closeAll}
            position="right"
            isOpen={isNotificationMenuOpen}
            render={props => notificationMenuContent.render(props)}
          />
        ) : null}
        <Modal
          ariaHideApp={false}
          isOpen={showUpsellModal}
          style={customModalStylesBlackOverlay}
          contentLabel="Upsell"
          shouldCloseOnOverlayClick={false}
          onRequestClose={this.closeUpsellModal}
        >
          upsell text goes here
        </Modal>
        <style jsx>
          {`
            .root {
              margin: 0;
              padding: 0;
              width: 100%;
              z-index: 9999;
              position: static;
            }

            .menus {
              z-index: 9999;
              min-height: 100vh;
              height: 100%;
            }

            @media ${screenLarge} {
              .root {
                position: relative;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default GlobalNavigation;
