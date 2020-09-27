import { LiveChat } from 'app/modules/new-dashboard/components/live-chat';
/***********************************
 * V4 Shows About Tab
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  pubnubInit, 
  sendMessage, 
  setDock, 
  setTab, 
  unSubscribePubnub, 
  getActivityFeedMembers, 
  setMemberChatState } from '../../../modules/pubnub-handler/actions'
// import styles from './AboutTab.style';

class LiveTab extends Component {

  componentDidMount(){
    this.props.setDock(true);
  }


  render() {
    const {
      pubnubInit,
      sendMessage,
      setDock, 
      setTab, 
      unSubscribePubnub,
      getActivityFeedMembers,
      setMemberChatState,
      pubnubData,
    } = this.props;

    return (
      <div className="root">
        {pubnubData && (
          <LiveChat
            activityFeedMessages={pubnubData.activityFeedMessages}
            sendMessage={sendMessage}
            setDock={setDock} 
            setTab={setTab} 
            unSubscribePubnub={unSubscribePubnub} 
            pubnubInit={pubnubInit}
            docked={pubnubData.docked}
            getActivityFeedMembers={getActivityFeedMembers}
            pubnubData={pubnubData}
            setMemberChatState={setMemberChatState}
          />                                
        )}
        {/* <style jsx>{styles}</style> */}
      </div>
    );
  }
}
const mapStateToProps = state => {  
  return {
    pubnubData: state.pubnubChat
  }
}

const mapDispatchToProps = {
  pubnubInit,
  sendMessage,
  setDock, 
  setTab, 
  unSubscribePubnub,
  getActivityFeedMembers,
  setMemberChatState,
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTab);
