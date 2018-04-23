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
import {
  askToJoinGroup,
  fetchGroupsList,
  joinOrLeaveGroup,
  requestNewGroup,
} from '../../modules/community-groups/actions';
import { primaryFont } from '../../styles/variables/fonts';

const {
  func,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  communityGroups,
}) => ({
  communityGroups,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGroupsList,
    joinOrLeaveGroup,
    askToJoinGroup,
    requestNewGroup,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroupList extends Component {
  static propTypes = {
    actions: shape({
      askToJoinGroup: func,
      fetchGroupsList: func,
      joinOrLeaveGroup: func,
      requestNewGroup: func,
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
      actions,
    } = this.props;

    this.closeModal();

    actions.askToJoinGroup({
      discussionGroupId,
    })
      .then((res) => {
        if (!res.payload.apiError) {
          this.setState({
            showPrompt: res.payload.showResponse,
            promptText: res.payload.response,
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
    } = this.props;

    this.closeModal();

    actions.joinOrLeaveGroup({
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
    const { actions } = this.props;
    this.closeModal();

    actions.requestNewGroup({
      access: requestFormPrivacy,
      definition: requestFormText,
    }).then((res) => {
      if (!res.payload.apiError) {
        this.setState({
          showPrompt: res.payload.showResponse,
          promptText: res.payload.response,
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
        <div className="group-actions">
          {communityGroups.groupsCount > 20 ?
            <SortNav
              currentParentRoute={currentParentRoute}
            /> :
            null}
          <div onClick={this.requestGroup}>
            <span className="request">Request Group</span>
          </div>
        </div>
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

          .group-actions {
            display: flex;
            flex-direction: row;
            padding: 0 15px;
          }

          .request {
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupList;
