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

import GroupsHeader from '../../components/community-groups/groups-header';
import {
  darkBlueGray,
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

  render() {
    const {
      pageMeta,
    } = this.props;
    return (
      <div>
        <GroupsHeader {...pageMeta} />
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupOverview;
