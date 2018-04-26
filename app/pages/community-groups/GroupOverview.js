/***********************************
* V4 Community Group Overview Page
*
*
*
***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/community-groups/overview/header';
import ShortInformationOverview from '../../components/community-groups/overview/short-information-container';
import FullInformationOverview from '../../components/community-groups/overview/full-information-container';
import {
  joinOrLeaveGroup,
} from '../../modules/community-groups/actions';
import {
  gray,
  white,
} from '../../styles/variables/colors';
import {
  fetchGroupOverviewPageMeta,
  fetchGroupOverview,
} from '../../modules/community-group-overview/actions';

const mapStateToProps = ({
  communityGroupOverview,
}) => ({
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

  constructor(props) {
    super(props);
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

  render() {
    const {
      pageMeta,
      routeParams: { groupId },
      actions,
    } = this.props;
    return (
      <div className="group-overview">
        <Header
          joinOrLeaveGroup={this.joinLeaveGroup}
          discussionGroupId={groupId}
          {...pageMeta}
        />
        {pageMeta.showGroupOverview && <ShortInformationOverview joinOrLeaveGroup={this.joinLeaveGroup} />}
        {pageMeta.showGroupInformation && <FullInformationOverview />}
        <style jsx>{`
          .group-overview {
            background-color: ${gray};
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupOverview;
