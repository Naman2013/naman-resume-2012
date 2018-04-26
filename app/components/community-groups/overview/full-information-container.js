/***********************************
* V4 Community Group Overview Full Overview Layout
*
*
*
***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';
import MembersList from './members-list';
import FullInformation from './full-information';

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
class FullInformationOverview extends Component {

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
  };

  static defaultProps = {
    detailsList: {},
    description: '',
    descriptionHeading: '',
    detailsHeading: '',
    heading: '',
    joinPrompt: '',
    showJoinPrompt: false,
    membersCount: 0,
    membersList: [],
  };

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
      <div>
        <div className="full-info">
          <div className="flex-child">
            <FullInformation
              description={description}
              descriptionHeading={descriptionHeading}
              detailsHeading={detailsHeading}
              detailsList={detailsList}
              heading={heading}
              joinPrompt={joinPrompt}
              showJoinPrompt={showJoinPrompt}
              joinOrLeaveGroup={joinOrLeaveGroup}
            />
          </div>
          <div className="flex-child left-container">
            Activity will go here
          </div>
          <aside className="flex-child right-container">
            <MembersList
              membersList={membersList}
              membersCount={membersCount}
            />
          </aside>
        </div>
        <style jsx>{`
          .full-info {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 25px;
          }
          .flex-child:first-child {
            width: 100%;
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

export default FullInformationOverview;
