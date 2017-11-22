import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';

const MOCK_TITLE = "Paul discusses Hubble's Variable Nebula (NGC 2261).";
const YT_VIDEO_ID = 'zOH0XN4smgM';

const mapStateToProps = ({ audioPlayer }) => ({ ...audioPlayer });

@connect(mapStateToProps)
class AudioPlayerProvider extends Component {
  static propTypes = Object.assign(
    {
      children: PropTypes.node.isRequired,
    },
    AudioPlayer.propTypes,
  );

  static defaultProps = Object.assign({}, AudioPlayer.DefaultProps);

  render() {
    return <div className="root">{cloneElement(this.props.children, { ...this.props })}</div>;
  }
}

export default AudioPlayerProvider;
