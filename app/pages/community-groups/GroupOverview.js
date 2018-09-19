/***********************************
* V4 Community Group Overview Page
*
*
*
***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { DeviceContext } from 'providers/DeviceProvider';
import Header from 'components/community-groups/overview/header';
import FullInformationOverview from 'components/community-groups/overview/full-information-container';
import CenterColumn from 'components/common/CenterColumn';
import { modalStyleFullPage } from 'styles/mixins/utilities';
import BackBar from 'components/common/style/buttons/BackBar';

import {
  joinOrLeaveGroup,
} from 'modules/community-groups/actions';
import {
  astronaut,
  seashell,
} from 'styles/variables/colors_tiles_v4';
import {
  SCREEN_SMALL,
  SCREEN_MEDIUM,
  SCREEN_LARGE,
  screenMedium,
  screenLarge,
} from 'styles/variables/breakpoints'
import {
  fetchGroupOverviewPageMeta,
  fetchGroupOverview,
} from 'modules/community-group-overview/actions';

const mapStateToProps = ({
  communityGroupOverview,
}) => ({
  communityGroupOverview,
  pageMeta: communityGroupOverview.pageMeta,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGroupOverviewPageMeta,
    fetchGroupOverview,
    joinOrLeaveGroup,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroupOverview extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  state = {
    showPopup: false,
  }

  componentWillMount() {
    const {
      actions,
      routeParams: { groupId },
    } = this.props;

    actions.fetchGroupOverviewPageMeta({
      discussionGroupId: groupId,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.groupId !== nextProps.routeParams.groupId) {
      this.props.actions.fetchGroupOverviewPageMeta({
        discussionGroupId: nextProps.routeParams.groupId,
      });
    }
  }

  joinLeaveGroup = () => {
    const {
      routeParams: { groupId },
      actions,
    } = this.props;

    actions.joinOrLeaveGroup({
      discussionGroupId: groupId,
    })
  }

  showInformation = (e) => {
    this.setState({
      showPopup: true,
    });

  }

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const {
      communityGroupOverview,
      pageMeta,
      routeParams: { groupId },
      actions,
    } = this.props;
    const { showPopup } = this.state;

    return (
      <div className="root">
      <DeviceContext.Consumer>
          {context => (<CenterColumn widths={['768px', '940px', '940px']} theme={{ paddingTop: '25px' }}>
            <Header
              showInformation={this.showInformation}
              joinOrLeaveGroup={this.joinLeaveGroup}
              discussionGroupId={groupId}
              {...context}
              {...communityGroupOverview}
              {...pageMeta}
            />

            <FullInformationOverview
              joinOrLeaveGroup={this.joinLeaveGroup}
              context={context}
              discussionGroupId={groupId}
            />

          </CenterColumn>)}
        </DeviceContext.Consumer>
        <Modal
          ariaHideApp={false}
          isOpen={showPopup}
          style={modalStyleFullPage}
          contentLabel="Group Info"
          onRequestClose={this.closeModal}
        >
          <BackBar onClickEvent={this.closeModal} />

        </Modal>
        <style jsx>{`
          .root {
            color: ${astronaut};
            background-color: ${seashell};
          }

        `}</style>
      </div>
    )
  }
}

export default CommunityGroupOverview;
