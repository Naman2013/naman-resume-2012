import css from 'styled-jsx/css';
import {
  profilePhotoStyle,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

import {
  astronaut,
  geyser,
  shadows,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';

export const profPic = photoUrl =>
  Object.assign(profilePhotoStyle(photoUrl), {
    height: '14px',
    width: '14px',
    backgroundSize: 'cover',
  });

export default css`
  .root {
    background-color: ${romance};
    border: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
  }

  .root:first-child {
    border-top: 0;
  }

  .root:last-child {
    border-bottom: 0;
  }

  .comment-item {
    padding: 25px;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
  }

  .user-info,
  .user-info-container {
    display: flex;
    flex-direction: row;
    font-size: 10px;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
    text-transform: uppercase;
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
    text-transform: none;
    white-space: pre-line;
    word-break: break-word;
  }

  .date {
    visibility: hidden;
    text-align: right;
  }

  .activity-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .activity-actions :global(.button-container) {
    margin-right: 10px;
  }

  .action-left {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    min-width: 100px;
    align-items: center;
  }

  .action-right {
    display: flex;
    margin-left: auto;
    align-items: center;
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

  .object-name-container {
    padding: 15px 0 12px;
    border-bottom: 1px solid ${geyser};
    font-size: 22px;
    font-family: ${secondaryFont};
    text-transform: none;
    color: ${astronaut};
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
