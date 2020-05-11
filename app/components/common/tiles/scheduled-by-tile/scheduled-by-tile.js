import React from 'react';
import PropTypes from 'prop-types';
import starShape from 'atoms/icons/star-shape.svg';
import defaultProfileIcon from 'atoms/icons/default-profile-icon.svg';
import style from './scheduled-by-tile.style';
import { browserHistory } from 'react-router';
import { Tooltip } from 'react-tippy';

const navigateToPublicProfile = (link) =>{
  browserHistory.push(link);
}

const ScheduledByTile = ({ scheduledBy, targetName, likeCount, showJoiningMission, joiningMissionTooltipText, joiningMissionIconURL, ownerAvatarURL, hasLinkFlag, linkUrl }) => (
  <div className="scheduled-by-tile-root">
    <h3 className="title">Mission scheduled by:</h3>
    <div className="avatar-container">
      <img onClick={hasLinkFlag ? ()=>{navigateToPublicProfile(linkUrl)} : null} 
        className="profile-photo"
        alt="scheduled mission member"
        src={ownerAvatarURL}
      />
      {showJoiningMission ? ( 
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon" src={joiningMissionIconURL} />
              </Tooltip>) : null}
    </div>
    
    <h4 className="profile-name" onClick={hasLinkFlag ? ()=>{this.navigateToPublicProfile(linkUrl)} : null} >{scheduledBy}</h4>
    <ul className="list-attributes">
      <li>{targetName}</li>
      <li>
        <img alt="" src={starShape} />
        {likeCount}
      </li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

ScheduledByTile.propTypes = {
  scheduledBy: PropTypes.string.isRequired,
  targetName: PropTypes.string.isRequired,
  likeCount: PropTypes.string.isRequired,
};

export { ScheduledByTile };
