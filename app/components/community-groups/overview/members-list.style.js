import css from 'styled-jsx/css';
import {
  astronaut,
  romance,
  glitter,
  seashell,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import { fullWidthBtn, profPic } from '../styles';
import { lightHeadedAstronaut } from '../../../styles/variables/colors_tiles_v4';

export const profilePicSmall = url =>
  Object.assign(profPic(url), {
    height: '20px',
    width: '20px',
    backgroundSize: 'cover',
  });

export const profilePicLeader = url =>
  Object.assign(profPic(url), {
    height: '40px',
    width: '40px',
    backgroundSize: 'cover',
  });

export default css`
  .members-list {
    margin: 15px 0;
    margin-left: 15px;
    background-color: transparent;
  }
  .members-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .img-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .avatar-img {
    margin: 5px;
  }

  .see-all {
    ${fullWidthBtn}
  }

  .sort-button {
    position: relative;
    color: ${glitter};
    background-color: ${astronaut};
    flex: 1 1 0;
    text-align: center;
    height: 100%;
    cursor: pointer;
  }

  .sort-button.active {
    color: ${romance};
  }
  .pic {
    margin: 0 5px;
  }

  .members-list-card {
    margin: 15px 5px;
    padding: 25px;
    background-color: ${romance};
    font-family: ${primaryFont};
    ${dropShadowContainer}
  }

  .user-title {
    font-size: 18px;
    font-family: ${secondaryFont};
  }

  .member-info {
    display: flex;
    flex-direction: row;
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 10px;
    justify-content: space-between;
    border-top: 1px solid ${astronaut};
    height: 35px;
    align-items: center;
  }

  .leader-info{
    display: flex;
    flex-direction: row;
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 10px;
    justify-content: space-between;
    border-top: 1px solid ${astronaut};
    height: 35px;
    align-items: center;
    color:${lightHeadedAstronaut}
  }

  .gravity-label {
    flex: 0 100%;
    display: block;
    border-right: 1px solid ${astronaut};
    text-transform: uppercase;
    line-spacing: 1px;
  }

  .gravity-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .button-container {
    margin: 0 auto;
  }

  .sort-button-container {
    display: flex;
    flex-direction: row;
    height: 50px;
    align-content: center;
    flex-wrap: wrap;
    font-size: 12px;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-weight: bold;
    background-color: ${astronaut};
    padding-top: 10px;
    overflow: hidden;
  }
  .caret {
    display: none;
  }
  .active .caret {
    display: block;
    position: absolute;
    bottom: -8px;
    height: 15px;
    width: 15px;
    left: 40%;
    background-color: ${romance};
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .leader-label {
    font-family: ${primaryFont};
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.6px;
    color: ${lightHeadedAstronaut};
    padding-bottom: 28px;
  }

  .leader-title {
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: ${lightHeadedAstronaut};
  }
`;
