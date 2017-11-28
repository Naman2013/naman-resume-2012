import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import { updateRadioSettings } from '../../modules/User';

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
);

const mapStateToProps = ({ audioPlayer }) => ({ ...audioPlayer });

@connect(mapStateToProps, mapDispatchToProps)
class AudioPlayerProvider extends Component {
  static propTypes = Object.assign(
    {
      children: PropTypes.node.isRequired,
    },
    AudioPlayer.propTypes,
  );

  static defaultProps = Object.assign(AudioPlayer.defaultProps, {
    onRadioSettingUpdate: noop,
  });

  render() {
    return <div className="root">{cloneElement(this.props.children, { ...this.props })}</div>;
  }
}

export default AudioPlayerProvider;
