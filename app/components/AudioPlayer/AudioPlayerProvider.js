import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import { mutePlayer, unmutePlayer, updatePlayerVolume } from '../../modules/User';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    mutePlayer,
    unmutePlayer,
    updatePlayerVolume,
  }, dispatch)
);

const mapStateToProps = ({ audioPlayer }) => ({ ...audioPlayer });

@connect(mapStateToProps, mapDispatchToProps)
class AudioPlayerProvider extends Component {
  static propTypes = Object.assign(
    {
      children: PropTypes.node.isRequired,
      mutePlayer: PropTypes.func,
      unmutePlayer: PropTypes.func,
      updatePlayerVolume: PropTypes.func,
    },
    AudioPlayer.propTypes,
  );

  static defaultProps = Object.assign(AudioPlayer.defaultProps, {
    mutePlayer: noop,
    unmutePlayer: noop,
    updatePlayerVolume: noop,
  });

  render() {
    return <div className="root">{cloneElement(this.props.children, { ...this.props })}</div>;
  }
}

export default AudioPlayerProvider;
