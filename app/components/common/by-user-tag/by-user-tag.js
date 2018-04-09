import React from 'react';
import PropTypes from 'prop-types';

import { black, white, lightTurqoise, red } from '../../../styles/variables/colors';
import { backgroundImageCover, borderRadius } from '../../../styles/mixins/utilities';


/**
  THEMES
  By default 'dark' is the default theme
  provide any of the following theme strings to control the style for your needs

  dark ( good for sitting on top of light colored things )
  light ( good for sitting on top of dark colored things )
*/

function ByUserTag({
  theme,
  photo,
  name,
  accountType,
  location,
  memberSince,
}) {
  const profilePhotoStyle = {
    backgroundImage: `url(${photo})`,
  };

  return (
    <div className="root">
      <div className="profile-photo" style={profilePhotoStyle} />

      <div className="profile-name">
        <h4 className="username">
          {name} { accountType && <span className="account-level">{accountType}</span> }
          <br />
          {
            memberSince && <span className={`user-details ${theme}`}>{location} Member since {memberSince}</span>
          }
        </h4>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
        }

        .profile-photo,
        .profile-name {
          float: left;
        }

        .profile-photo {
          ${backgroundImageCover};
          ${borderRadius('50%')};
          background-repeat: no-repeat;
          background-position: center;
          width: 45px;
          height: 45px;
          min-width: 45px;
          min-height: 45px;
        }

        .profile-name {
          padding: 0 0 0 10px;
          margin: 0;
        }

        .username {
          font-size: 1.2em;
          font-weight: 300;
        }

        .username.dark {
          color: ${black};
        }

        .username.light {
          color: ${white};
        }

        .user-details {
          font-size: 0.65em;
        }

        .user-details.dark {
          color: ${lightTurqoise};
        }

        .user-details.light {
          color: ${black};
        }

        .account-level {
          font-size: 0.5em;
          padding-left: 10px;
          color: ${red};
          font-weight: 600;
          text-transform: uppercase;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

ByUserTag.defaultProps = {
  theme: 'dark',
};

ByUserTag.propTypes = {
  theme: PropTypes.string,
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  memberSince: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default ByUserTag;
