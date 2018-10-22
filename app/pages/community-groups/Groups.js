/***********************************
* V4 Community Groups Page
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
  astronaut,
  seashell,
} from '../../styles/variables/colors_tiles_v4';
import {
  fetchGroupsPageMeta,
} from '../../modules/community-groups/actions';

const mapStateToProps = ({
  communityGroups,
}) => ({
  pageMeta: communityGroups.pageMeta,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGroupsPageMeta,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroups extends Component {
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
    } = this.props;

    actions.fetchGroupsPageMeta({});
  }

  render() {
    const {
      pageMeta,
      children,
      route: { path },
    } = this.props;
    const currentParentRoute = path.split('/')[1];
    return (
      <div className="root">
        <GroupsHeader {...pageMeta} />
        {cloneElement(children, {
          currentParentRoute,
        })}
        <style jsx>{`
          .root {
            background-color: ${seashell};
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroups;
