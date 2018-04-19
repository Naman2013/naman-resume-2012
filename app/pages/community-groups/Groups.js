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
  darkBlueGray,
  white,
} from '../../styles/variables/colors';

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

  }

  render() {
    const {
      children,
      route: { path }
    } = this.props;
    const currentParentRoute = path.split('/')[1];
    return (
      <div>
        <GroupsHeader />
        {cloneElement(children, {
          currentParentRoute,
        })}
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default CommunityGroups;
