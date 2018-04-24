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
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
    } = this.props;
    return (
      <div>
      FUll
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default FullInformationOverview;
