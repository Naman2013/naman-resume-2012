import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import TopBar from './TopBar';
import Menu from './Menu';
import MENU_INTERFACE, { isLeft, isRight } from './Menus/MenuInterface';
import {
  closeAllMenus,
  closeUpsellModal,
  toggleGlobalNavMenu,
  toggleGlobalNavNotificationMenu,
} from 'app/modules/global-navigation/actions';
import { customModalStylesBlackOverlay } from 'app/styles/mixins/utilities';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import debounce from 'lodash/debounce';

//integrate with Pubnub
import PubNubReact from 'pubnub-react';
import { getUserInfo } from 'app/modules/User';

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
    pubnubActivityFeedChannelName: process.env.PUBNUB_CHANNEL_PREFIX + '.system.activityfeed',
    pubnubLiveEventsChannelName: process.env.PUBNUB_CHANNEL_PREFIX + '.system.liveevents'
  };

  state = {
    totalViewersCount: 0,
    allLivecastsInProgress: { },
    activityFeedMessages: [],
    activityWindowHasBeenScrolledToBottom: false,
  };

  constructor(params) {
    super(params);

    this.checkActivityWindowScroll.bind(this);

    this.debouncedCloseAll = debounce(this.closeAll, 500, {
      leading: true,
      trailing: false,
    });

    //get a connection to pubnub feeds
    this.pubnub = new PubNubReact({
      ssl: true,
      uuid: getUserInfo().cid,
      publishKey: process.env.PUBNUB_FEEDS_PUBKEY,
      subscribeKey: process.env.PUBNUB_FEEDS_SUBKEY,
      secretKey: process.env.PUBNUB_FEEDS_SECRETKEY,
    });

    this.pubnub.addListener({
      status: statusEvent => {
        if (statusEvent.category === 'PNConnectedCategory') {
          //console.log('Pubnub is connected....');
		this.pubnub.history(
    		  {
        		channel: this.props.pubnubActivityFeedChannelName,
        		count: 50,
        		stringifiedTimeToken: false,
			reverse: false,
    		  },
    		  (status, response) => {
			let historyMessages = response.messages;
			historyMessages.forEach(historyMessage => {
				//console.log(historyMessage);
				this.buildFeedMessage(historyMessage.entry, true);
			});

        		//console.log(response);

	      		setInterval(() => this.checkActivityWindowScroll(), 5000);
    		  }
		)
	} //end of if connected
      },
      message: msg => {
	//what channel did this message come from???
	const channel = msg.channel;

	//what is the message??
	const message = msg.message;

	//console.log(message);

	if (channel == this.props.pubnubLiveEventsChannelName) {
		//console.log(message);

		if (message.messageType) {
			if (message.messageType == 'livecast') {
				if (message.action == 'broadcastUpdate') {
					//update the livecasts in progress
					this.setState({ allLivecastsInProgress: message.livecasts });
				}
			}
		}
	}
	else if (channel == this.props.pubnubActivityFeedChannelName) {
		this.buildFeedMessage(message, true);
	}
      },
      presence: presenceEvent => {
        // handle presence (users that have joined or left the channel)
        //console.log(presenceEvent.channel);
        //console.log(presenceEvent);

	if (presenceEvent.channel == this.props.pubnubActivityFeedChannelName) {
        	this.setState({ totalViewersCount: presenceEvent.occupancy });
	}
      },
    });

    this.pubnub.init(this);
  }

  checkActivityWindowScroll() {
	//console.log("checking scroll function....");

	if (this.state.activityWindowHasBeenScrolledToBottom == false) {
		//console.log("activity window has not been scrolled yet....");
		
		var liveActivityWindowBodyFeedObj = document.getElementById('live-activity-window-body-feed'); 
		if (liveActivityWindowBodyFeedObj != null) {
			//console.log("found the activity window to be open....");
			
			liveActivityWindowBodyFeedObj.scrollIntoView(false);
			this.setState({ activityWindowHasBeenScrolledToBottom: true });	
			
			//console.log("scrolling to bottom.....");
		}
	}
  }

  buildFeedMessage(message, appendFlag) {
	//console.log(message);

	//convert the string message into a json object
	let messageJSONObj = JSON.parse(message);

	//console.log(messageJSON.message_by_locale.en);

	let isMessageFromCurrentUser = false;
	if (messageJSONObj.customerUUID == getUserInfo().customerUUID) {
		isMessageFromCurrentUser = true;
	}

	let newMessage = {
		id: messageJSONObj.messageID,
		user: messageJSONObj.displayName,
		currentUser: isMessageFromCurrentUser,
		date: '00/00/0000 12:00 UTC',
		text: messageJSONObj.message_by_locale.en			
	};

	if (appendFlag === true) {
		this.setState(state => {
		        const activityFeedMessages = [...this.state.activityFeedMessages, newMessage];
      			return {
        			activityFeedMessages,
      			};
    		});
	}
	else {
		this.setState(state => {
		        const activityFeedMessages = [newMessage, ...this.state.activityFeedMessages];
      			return {
        			activityFeedMessages,
      			};
    		});
	}
	//console.log(this.state.activityFeedMessages);
  }

  componentWillMount() {
    this.pubnub.subscribe({
      channels: [
        this.props.pubnubActivityFeedChannelName,
        this.props.pubnubLiveEventsChannelName,
        process.env.PUBNUB_CHANNEL_PREFIX + '.customer.' + getUserInfo().cid,
      ],
      withPresence: true,
    });
  }

  componentDidMount() {
    if (!this.props.isMobile) {
      window.addEventListener('scroll', this.debouncedCloseAll);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeKey !== this.props.routeKey) {
      this.debouncedCloseAll();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedCloseAll);
    //unmount pubnub
    this.pubnub.unsubscribe({
      channels: [
        this.props.pubnubActivityFeedChannelName,
        this.props.pubnubLiveEventsChannelName,
        process.env.PUBNUB_CHANNEL_PREFIX + '.customer.' + getUserInfo().cid,
      ],
    });
  }

  closeAll = () => {
    const { actions } = this.props;
    actions.closeAllMenus();
  };

  closeUpsellModal = () => {
    const { actions } = this.props;
    actions.closeUpsellModal();
  };

  handleMenuClick = menuName => {
    const { activeMenu, actions } = this.props;
    const sameMenu = menuName === activeMenu;
    const nextMenu = sameMenu ? MENU_INTERFACE.DEFAULT.name : menuName;
    const isDefault = menuName === MENU_INTERFACE.DEFAULT.name;
    const isLeftUpdate = !sameMenu && !isDefault && isLeft(menuName);
    const isRightUpdate = !sameMenu && !isDefault && isRight(menuName);
    actions.toggleGlobalNavMenu({
      activeMenu: nextMenu,
      isLeftOpen: isLeftUpdate,
      isRightOpen: isRightUpdate,
      activeLeft: isLeftUpdate ? menuName : this.props.activeLeft,
      activeRight: isRightUpdate ? menuName : this.props.activeRight,
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
      pubnubActivityFeedChannelName
    } = this.props;

    const { totalViewersCount, allLivecastsInProgress, activityFeedMessages } = this.state;

    const leftMenuContent = MENU_INTERFACE[activeLeft];
    const rightMenuContent = MENU_INTERFACE[activeRight];
    const notificationMenuContent = MENU_INTERFACE[MENU_INTERFACE.ALERTS.name];

    let displayName = '';
    if (userMenu && userMenu.userInfo) {
	displayName = userMenu.userInfo.displayName;
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
