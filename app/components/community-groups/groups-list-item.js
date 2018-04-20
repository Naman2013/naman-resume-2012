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
import GroupsList from '../../components/community-groups/groups-list';
import {
} from '../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
} from '../../styles/variables/colors';

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

  constructor(props) {
    super(props);
  }

  render() {
    const {
      access,
      accessDescription,
      askPrompt,
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
      viewMessage,
    } = this.props;
    return (
      <div key={discussionGroupId} className="group-item">
        <h3 dangerouslySetInnerHTML={{ __html: accessDescription }} />
        <h2 dangerouslySetInnerHTML={{ __html: title }} />

        <h4 className="count" dangerouslySetInnerHTML={{ __html: memberCountDisplay }} />

        <style jsx>{`
          .group-item {
            display: flex;
            flex-direction: column;
            position: relative;
            color: ${white};
            background-color: ${darkBlueGray};
            margin: 30px;
            padding: 25px;
            width: 300px;
            height: 400px;
            text-align: center;
            align-items: center;
            justify-items: flex-start;
          }

          .count {
            margin-top: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupListItem;
