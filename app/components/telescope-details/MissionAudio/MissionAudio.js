import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/headers/SectionHeader';

const SECTION_TITLE = 'Mission Audio';

const propTypes = {
  missionAudioURL: PropTypes.string.isRequired,
};

const MissionAudio = ({ missionAudioURL }) => (
  <div className="root">
    <SectionHeader title={SECTION_TITLE} />

    <div className="player-container">
      <form method="POST">
        <input id="enable-player" type="checkbox" />
        <label htmlFor="enable-player">Play Mission Audio</label>
      </form>

      <audio src={missionAudioURL} controls />
    </div>

    <style jsx>{`
      .player-container {
        background-color: rgba(137, 137, 137, .5);
        margin-bottom: 20px;
      }
    `}</style>
  </div>
);

MissionAudio.propTypes = propTypes;

export default MissionAudio;
