import { black, white, lightTurqoise, red } from '../../../styles/variables/colors';
import { backgroundImageCover, borderRadius } from '../../../styles/mixins/utilities';

export default `
.slooh-by-user-tag {
  display: flex;
  align-items: center;

  .profile-photo,
  .profile-name {
    float: left;
  }

  .profile-photo {
    ${backgroundImageCover}
    ${borderRadius('50%')}
    background-repeat: no-repeat;
    background-position: center;
    width: 45px;
    height: 45px;
  }

  .profile-name {
    padding: 0 0 0 10px;
    margin: 0;

      .username {
        font-size: 1.2em;
        font-weight: 300;

        &.dark {
          color: ${black};
        }
        &.light {
          color: ${white};
        }

        .user-details {
          font-size: 0.65em;

          &.dark {
            color: ${lightTurqoise};
          }
          &.light {
            color: ${black};
          }
        }
      }

      .account-level {
        font-size: 0.5em;
        padding-left: 10px;
        color: ${red};
        font-weight: 600;
        text-transform: uppercase;
        white-space: nowrap;
      }
  }
}
`;
