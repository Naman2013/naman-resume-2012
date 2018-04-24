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
    console.log('joinPrompt', joinPrompt)
    return (
      <div>
      short
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
        `}</style>
      </div>
    )
  }
}

export default ShortInformationOverview;
