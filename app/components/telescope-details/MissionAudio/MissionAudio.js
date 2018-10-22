import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';
import { primaryFont } from '../../../styles/variables/fonts';
import { lightBlack } from '../../../styles/variables/colors';

const SECTION_TITLE = 'Mission Audio';

class MissionAudio extends Component {
  static propTypes = {
    missionAudioURL: PropTypes.string.isRequired,
    audioEnabled: PropTypes.bool,
  };

  static defaultProps = {
    audioEnabled: true,
  };

  state = {
    displayPlayer: false,
  };

  handleEnableViewerChange = () => {
    this.setState(state => ({
      displayPlayer: !state.displayPlayer,
    }));
  };

  render() {
    const { missionAudioURL, audioEnabled } = this.props;
    const { displayPlayer } = this.state;
    return (
      <div className="root">
        <SectionHeader title={SECTION_TITLE} />

        <div className="player-container">
          <form className="player" method="POST">
            <input
              id="enable-player"
              checked={displayPlayer}
              onChange={this.handleEnableViewerChange}
              type="checkbox"
            />
            <label htmlFor="enable-player">Play Mission Audio</label>
          </form>

          {
            audioEnabled && displayPlayer &&
              <audio
                src={missionAudioURL}
                controls
                controlsList="nodownload"
              />
          }

          {
            !audioEnabled && displayPlayer &&
              <h4 className="disabled-text">Audio is not enabled for this mission.</h4>
          }
        </div>

        <style jsx>{`
          .root {
            color: ${lightBlack};
          }

          .player-container {
            font-family: ${primaryFont};
            background-color: rgba(137, 137, 137, .5);
            margin-bottom: 20px;
            text-align: center;
            padding: 20px 0;
            margin-bottom: 10px;
          }

          .player {
            margin-bottom: 10px;
          }

          .disabled-text {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default MissionAudio;
