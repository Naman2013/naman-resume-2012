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
import Modal from 'react-modal';
import RequestGroupForm from '../../components/community-groups/request-group-form';
import GroupsList from '../../components/community-groups/groups-list';
import SortNav from '../../components/community-groups/sort-nav';
import { askToJoin } from '../../services/community-groups/ask-to-join';
import { requestGroup } from '../../services/community-groups/request-group';

import {
  fetchGroupsList,
  joinOrLeaveGroup,
} from '../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
} from '../../styles/variables/colors';
import { primaryFont } from '../../styles/variables/fonts';

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
    if (this.props.currentParentRoute != nextProps.currentParentRoute || this.props.route.path != nextProps.route.path) {
      this.props.actions.fetchGroupsList({
        groupSet: nextProps.currentParentRoute === 'my-groups' ? 'mine' : nextProps.currentParentRoute,
        sortBy: nextProps.route.path,
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
        } else {
          this.setState({
            showPrompt: true,
            promptText: 'There was an error.',
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



  submitRequestForm = ({
    requestFormText,
    requestFormPrivacy,
  }) => {
    const { at, token, cid } = this.props.user;
    this.closeModal();

    requestGroup({
      at,
      token,
      cid,
      access: requestFormPrivacy,
      definition: requestFormText,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          showPrompt: res.data.showResponse,
          promptText: res.data.response,
        });
      } else {
        this.setState({
          showPrompt: true,
          promptText: 'There was an error submitting your form.',
        });
      }
    });
  }

  requestGroup = () => {
    this.setState({
      showPrompt: true,
      promptText: <RequestGroupForm
        submitForm={this.submitRequestForm}
        closeForm={this.closeModal}
      />
    });
  }


  render() {
    const {
      communityGroups,
      currentParentRoute,
    } = this.props;

    const {
      showPrompt,
      promptText,
    } = this.state;

    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '650px',
        padding: '50px 25px',
        fontFamily: primaryFont,
      },
    };

    return (
      <div>
        {true ?
          <SortNav
            requestGroup={this.requestGroup}
            currentParentRoute={currentParentRoute}
          /> :
          null}
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
        <Modal
          ariaHideApp={false}
          isOpen={showPrompt}
          style={customModalStyles}
          contentLabel="Groups"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          {promptText}
        </Modal>
        <style jsx>{`
          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupList;
