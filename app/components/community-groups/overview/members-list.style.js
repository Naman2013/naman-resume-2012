import css from 'styled-jsx/css';
import { astronaut, romance, glitter } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import {
  fullWidthBtn,
  profPic,
} from '../styles';
import { dropShadowContainer } from 'styles/mixins/utilities';
export const profilePicSmall = (url) => Object.assign(profPic(url),
{ height: '20px', width: '20px', backgroundSize: 'cover' });

export default css`
  .members-list {
    margin: 15px 0;
    margin-left: 15px;
    background-color: ${romance};
  }
  .members-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${dropShadowContainer}
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
    cursor:pointer;
  }

  .sort-button.active {
    color: ${romance};
  }
  .pic {
    margin: 0 5px;
  }

  .members-list-card {
    margin: 15px 5px;
    padding: 15px;
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

  .gravity-label {
    flex: 0 100%;
    display: block;
    border-right: 1px solid ${astronaut};
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


`;
