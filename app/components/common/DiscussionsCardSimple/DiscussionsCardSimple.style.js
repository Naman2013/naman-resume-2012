import css from 'styled-jsx/css';
import { profilePhotoStyle } from 'styles/mixins/utilities';

import { astronaut, geyser, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export const profPic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '14px',
  width: '14px',
  backgroundSize: 'cover',
});

export default css`
  .root {
  }

  .comment-item {
    ${dropShadowContainer};
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
    visibility: hidden;
    text-align: right;
  }

  .activity-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .action-left {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    min-width: 100px;
  }


  .action-right {
    margin-left: auto;
  }

  .fa-close {
    position: absolute;
    top: 5px;
    right: 10px;
  }

  .explainantion-container {
    font-size: 10px;
    font-weight: bold;
    text-decoration: uppercase;
  }

  .explainantion-item {
    display: flex;
    align-items: center;
    height: 25px;
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
  }
  .explainantion-item:first-child {
    height: 25px;
    border-bottom: 0;
  }


  @media ${screenMedium} {
    .date {
      visibility: visible;
    }

    .explainantion-container {
      display: none;
    }

    .action-left {
      justify-content: space-between;
      min-width: 110px;
    }
  }

  @media ${screenLarge} {

  }
`;
