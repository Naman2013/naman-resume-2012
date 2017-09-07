import { black, white, lightTurqoise, red } from '../../../styles/variables/colors';
import { backgroundImageCover, borderRadius } from '../../../styles/mixins/utilities';

export default `
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
`;
