import React, { PropTypes } from 'react';

const ShareMissionContainer = ({ children }) => (
  <div className="col-xs-2 piggyback-accepted">
    {children}
  </div>
);

const SocialIcons = () => (
  <ul className="social-icons">
    <li className="action-container">
      <button className="action">
        <span className="fa fa-twitter-square"></span>
      </button>
    </li>
    <li className="action-container">
      <button className="action">
        <span className="fa fa-facebook-square"></span>
      </button>
    </li>
    <li className="action-container">
      <button className="action">
        <span className="fa fa-google-plus-square"></span>
      </button>
    </li>
    <li className="action-container">
      <button className="action">
        <span className="fa fa-instagram"></span>
      </button>
    </li>
  </ul>
);

const SocialMissionText = ({ text }) => (
  <h4 className="title">{text}</h4>
);

const ShareMission = ({
  showShareMissionIcons,
  shareMissionIconsText, }) => {
  // TODO: future feature to include social sharing
  // for now we only display the text
  // if (showShareMissionIcons && shareMissionIconsText) {
  //   return (
  //     <ShareMissionContainer>
  //       <SocialIcons />
  //       <SocialMissionText text={shareMissionIconsText} />
  //     </ShareMissionContainer>
  //   );
  // }
  //
  // if (showShareMissionIcons) {
  //   return (
  //     <ShareMissionContainer>
  //       <SocialIcons />
  //     </ShareMissionContainer>
  //   );
  // }

  if (shareMissionIconsText) {
    return (
      <ShareMissionContainer>
        <SocialMissionText text={shareMissionIconsText} />
      </ShareMissionContainer>
    );
  }

  return null;
};

ShareMission.propTypes = {
  showShareMissionIcons: PropTypes.bool.isRequired,
  shareMissionIconsText: PropTypes.string,
};

ShareMission.defaultProps = {
  shareMissionIconsText: '',
};

export default ShareMission;
