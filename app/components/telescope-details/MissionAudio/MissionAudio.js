import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModuleContainer } from 'app/modules/telescope/components/old/module-container/index';
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
      <ModuleContainer title={SECTION_TITLE}>
        <div className="root">
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

            {audioEnabled && displayPlayer && (
              <audio
                style={{ display: 'none' }}
                src={missionAudioURL}
                autoPlay
                controls
                controlsList="nodownload"
              />
            )}

            {!audioEnabled && displayPlayer && (
              <h4 className="disabled-text">
                Audio is not enabled for this mission.
              </h4>
            )}
          </div>

          <style jsx>{`
            .root {
              color: ${lightBlack};
              margin-left: auto;
              margin-right: auto;
            }

            .player-container {
              font-family: ${primaryFont};
              background-color: rgba(137, 137, 137, 0.5);
              margin-bottom: 0px;
              text-align: center;
              padding: 20px 0;
              margin-bottom: 0px;
            }

            .player {
              margin-bottom: 0px;
            }

            .disabled-text {
              margin: 0;
              padding: 0;
            }
          `}</style>
        </div>
      </ModuleContainer>
    );
  }
}

export default MissionAudio;
