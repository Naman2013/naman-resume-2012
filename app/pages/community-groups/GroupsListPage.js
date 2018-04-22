/***********************************
* V4 Community Groups List
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'rc-pagination';
import ModalGeneric from '../../components/common/modals/modal-generic';
import GroupsList from '../../components/community-groups/groups-list';
import { askToJoin } from '../../services/community-groups/ask-to-join';
import {
  fetchGroupsList,
  joinOrLeaveGroup,
} from '../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
} from '../../styles/variables/colors';

const {
  func,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  communityGroups,
  user,
}) => ({
  communityGroups,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGroupsList,
    joinOrLeaveGroup,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroupList extends Component {
  static propTypes = {
    actions: shape({
      fetchGroupsList: func,
      joinOrLeaveGroup: func,
    }).isRequired,
    currentParentRoute: string,
  }

  static defaultProps = {
    actions: {
      fetchGroupsList: () => {},
      joinOrLeaveGroup: () => {},
    },
    currentParentRoute: 'all',
  }

  state = {
    showPrompt: false,
    promptText: '',
  }


  componentWillMount() {
    const {
      actions,
      currentParentRoute,
      route: { path },
    } = this.props;
    actions.fetchGroupsList({
      groupSet: currentParentRoute === 'my-groups' ? 'mine' : currentParentRoute,
      sortBy: path,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentParentRoute != nextProps.currentParentRoute) {
      this.props.actions.fetchGroupsList({
        groupSet: nextProps.currentParentRoute === 'my-groups' ? 'mine' : nextProps.currentParentRoute,
        sortBy: nextProps.path,
      });
    }
  }

  closeModal = () => {
    this.setState({
      showPrompt: false,
      promptText: '',
    });
  }

  makeAskToJoinCall = ({ discussionGroupId }) => {
    const {
      user: { at, token, cid },
    } = this.props;

    this.closeModal();

    askToJoin({
      at,
      token,
      cid,
      discussionGroupId,
    })
      .then((res) => {
        if (!res.data.apiError) {
          this.setState({
            showPrompt: res.data.showResponse,
            promptText: res.data.response,
          });
        }
      });
  }

  makeToggleJoinGroupCall = ({ discussionGroupId }) => {
    const {
      actions,
      user: { at, token, cid },
    } = this.props;

    this.closeModal();

    actions.joinOrLeaveGroup({
      at,
      token,
      cid,
      discussionGroupId,
    });
  }

  handlePageChange = (paginatedSet, page) => {
    const {
      actions,
      currentParentRoute,
      route: { path },
    } = this.props;
    actions.fetchGroupsList({
      page,
      groupSet: currentParentRoute === 'my-groups' ? 'mine' : currentParentRoute,
      sortBy: path,
    });
  }


  render() {
    const {
      communityGroups,
    } = this.props;

    const {
      showPrompt,
      promptText,
    } = this.state;

    return (
      <div>
        <GroupsList
          groups={communityGroups.groups}
          askToJoin={this.makeAskToJoinCall}
          toggleJoinGroup={this.makeToggleJoinGroupCall}
        />
        {communityGroups.pages > 1 ? <Pagination
          onChange={this.handlePageChange}
          defaultPageSize={communityGroups.count}
          current={communityGroups.page}
          total={communityGroups.groupsCount}
        /> : null}
        <ModalGeneric
          open={showPrompt}
          closeModal={this.closeModal}
          description={promptText}
        />
      </div>
    )
  }
}

export default CommunityGroupList;
