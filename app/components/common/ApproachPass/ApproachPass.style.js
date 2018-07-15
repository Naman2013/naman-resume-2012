import css from 'styled-jsx/css';
import { profilePhotoStyle } from 'styles/mixins/utilities';

import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { dropShadowContainer } from 'styles/mixins/utilities';

export const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '14px',
  width: '14px',
  backgroundSize: 'cover',
});

export default css`
  .comment-item {
    ${dropShadowContainer};
    margin: 25px;
    padding: 25px;
    font-family: ${primaryFont};
    color: ${astronaut};
  }

  .user-info, .user-info-container {
    display: flex;
    flex-direction: row;
    font-size: 10px;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
  }

  .user-info-container {
    width: 100%;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid ${geyser};
  }
  .display-name {
    margin-left: 10px;
  }

  .content {
    font-family: ${secondaryFont};
    font-size: 19px;
    color: ${astronaut};
    padding: 25px 0;
  }

  .date {
    text-align: right;
  }

  .action-left {
    display: flex;
    flex-direction: row;
  }

  .fa-close {
    position: absolute;
    top: 5px;
    right: 10px;
  }
`;
