import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';

const SECTION_TITLE = 'Mission Audio';

const propTypes = {
  missionAudioURL: PropTypes.string.isRequired,
  audioEnabled: PropTypes.bool,
};

const defaultProps = {
  audioEnabled: true,
};

const MissionAudio = ({ missionAudioURL, audioEnabled }) => (
  <div className="root">
    <SectionHeader title={SECTION_TITLE} />

    <div className="player-container">
      <form className="player" method="POST">
        <input id="enable-player" type="checkbox" />
        <label htmlFor="enable-player">Play Mission Audio</label>
      </form>

      {
        audioEnabled &&
          <audio src={missionAudioURL} controls />
      }

      {
        !audioEnabled &&
          <h4 className="disabled-text">Audio is not enabled for this mission.</h4>
      }
    </div>

    <style jsx>{`
      .player {
        margin-bottom: 10px;
      }

      .disabled-text {
        margin: 0;
        padding: 0;
      }

      .player-container {
        background-color: rgba(137, 137, 137, .5);
        margin-bottom: 20px;
        text-align: center;
        padding: 20px 0;
        margin-bottom: 10px;
      }
    `}</style>
  </div>
);

MissionAudio.propTypes = propTypes;
MissionAudio.defaultProps = defaultProps;

export default MissionAudio;
