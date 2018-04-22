/***********************************
* V4 Community Groups List Item Component
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DefaultView from './default-view';
import HoverView from './hover-view';
import {
} from '../../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({ communityGroups }) => ({
  communityGroups,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroupListItem extends Component {
  static propTypes = {
    access: string,
    accessDescription: string,
    askPrompt: string,
    askToJoin: func.isRequired,
    canView: bool,
    discussionGroupId: string,
    joinPrompt: string,
    memberCount: number,
    memberCountDisplay: string,
    message: string,
    showAskPrompt: bool,
    showJoinPrompt: bool,
    showMessage: bool,
    title: string,
    toggleJoinGroup: func.isRequired,
    viewMessage: string,
  }

  static defaultProps = {
    access: '',
    accessDescription: '',
    askPrompt: '',
    canView: false,
    discussionGroupId: '',
    joinPrompt: '',
    memberCount: 0,
    memberCountDisplay: '',
    message: '',
    showAskPrompt: false,
    showJoinPrompt: false,
    showMessage: false,
    title: '',
    viewMessage: '',
  }

  state = {
    isHovering: false,
  }

  constructor(props) {
    super(props);
  }

  setHovering = (e, value) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      isHovering: value,
    });
  }

  render() {
    const {
      access,
      accessDescription,
      askPrompt,
      askToJoin,
      canView,
      discussionGroupId,
      joinPrompt,
      memberCount,
      memberCountDisplay,
      message,
      showAskPrompt,
      showJoinPrompt,
      showMessage,
      title,
      toggleJoinGroup,
      viewMessage,
    } = this.props;

    const { isHovering } = this.state;
    return (
      <div className="group-item"
        onMouseEnter={(e) => this.setHovering(e, true)}
        onMouseLeave={(e) => this.setHovering(e, false)}
      >
        <DefaultView accessDescription={accessDescription} title={title} memberCountDisplay={memberCountDisplay} />
        {isHovering && <div className="hover-div">
          <HoverView
            askPrompt={askPrompt}
            askToJoin={askToJoin}
            canView={canView}
            discussionGroupId={discussionGroupId}
            joinPrompt={joinPrompt}
            showAskPrompt={showAskPrompt}
            showJoinPrompt={showJoinPrompt}
            toggleJoinGroup={toggleJoinGroup}
            viewMessage={viewMessage}
          />
        </div>}
        <style jsx>{`
          .group-item {
            position: relative;
          }

          .hover-div {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupListItem;
