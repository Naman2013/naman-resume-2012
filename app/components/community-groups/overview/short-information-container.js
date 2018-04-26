/***********************************
* V4 Community Group Short Overview Layout
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShortInformation from './short-information';
import MembersList from './members-list';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;
const mapStateToProps = ({
  communityGroupOverview,
}) => ({
  ...communityGroupOverview,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ShortInformationOverview extends Component {
  static propTypes = {
    description: string,
    descriptionHeading: string,
    detailsHeading: string,
    detailsList: shape({}),
    heading: string,
    joinOrLeaveGroup: func.isRequired,
    joinPrompt: string,
    membersCount: number,
    membersList: arrayOf(shape({})),
    showJoinPrompt: bool,
  }

  static defaultProps = {
    description: '',
    descriptionHeading: '',
    detailsHeading: '',
    detailsList: {},
    heading: '',
    joinPrompt: '',
    membersCount: 0,
    membersList: [],
    showJoinPrompt: false,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      description,
      descriptionHeading,
      detailsHeading,
      detailsList,
      heading,
      joinOrLeaveGroup,
      joinPrompt,
      membersCount,
      membersList,
      showJoinPrompt,
    } = this.props;

    return (
      <div className="short-info">
        <div className="left-container"></div>
        <aside className="right-container">
          <ShortInformation
            description={description}
            descriptionHeading={descriptionHeading}
            detailsHeading={detailsHeading}
            detailsList={detailsList}
            heading={heading}
            joinPrompt={joinPrompt}
            showJoinPrompt={showJoinPrompt}
            joinOrLeaveGroup={joinOrLeaveGroup}
          />
          <MembersList
            membersList={membersList}
            membersCount={membersCount}
          />
        </aside>
        <style jsx>{`
          .short-info {
            display: flex;
            flex-direction: row;
            padding: 25px;
          }
          .left-container {
            flex: 3;
          }

          .right-container {
            flex: 1;
          }
        `}</style>
      </div>
    )
  }
}

export default ShortInformationOverview;
