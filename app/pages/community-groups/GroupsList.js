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
import GroupsList from '../../components/community-groups/groups-list';
import {
  fetchGroupsList,
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

const mapStateToProps = ({ communityGroups }) => ({
  communityGroups,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchGroupsList,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class CommunityGroupList extends Component {
  static propTypes = {
    actions: shape({
      fetchGroupsList: func,
    }).isRequired,
    currentParentRoute: string,
  }

  static defaultProps = {
    actions: {
      fetchGroupsList: () => {},
    },
    currentParentRoute: 'all',
  }

  constructor(props) {
    super(props);
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


  render() {
    const {
      communityGroups,
    } = this.props;
    console.log('communityGroups', communityGroups);
    return (
      <div>
        <GroupsList groups={communityGroups.groups} />
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupList;
