import React from 'react';

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

const SocialMissionText = () => (
  <h4 className="title">You have <b>joined</b> this mission.</h4>
);

const ShareMission = ({ showShareMissionIcons, shareMissionIconsText }) => {
  if(showShareMissionIcons && shareMissionIconsText) {
    return(
      <ShareMissionContainer>
        <SocialIcons />
        <SocialMissionText />
      </ShareMissionContainer>
    );
  }

  if(showShareMissionIcons) {
    return(
      <ShareMissionContainer>
        <SocialIcons />
      </ShareMissionContainer>
    );
  }

  if(shareMissionIconsText) {
    return(
      <ShareMissionContainer>
        <SocialMissionText />
      </ShareMissionContainer>
    );
  }

  return(null);
};

export default ShareMission;
