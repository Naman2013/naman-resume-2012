import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MOCK_TITLE = 'Paul discusses Hubble\'s Variable Nebula (NGC 2261).';
const YT_VIDEO_ID = 'zOH0XN4smgM';

const mapStateToProps = ({  }) => ({});

@connect(mapStateToProps)
class AudioPlayerProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="root">
        {
          cloneElement(this.props.children, {})
        }
      </div>
    );
  }
}

export default AudioPlayerProvider;
