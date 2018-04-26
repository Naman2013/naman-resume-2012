/***********************************
* V4 Community Group Short Overview Layout
*
*
*
***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShortInformation from './short-information';
import {
  darkBlueGray,
  white,
} from '../../../styles/variables/colors';

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
  }

  static defaultProps = {
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
      joinPrompt,
      showJoinPrompt,
      joinOrLeaveGroup,
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
