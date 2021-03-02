import css from 'styled-jsx/css';
import {
  astronaut,
  romance,
  glitter,
  seashell,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import { fullWidthBtn, profPic } from '../styles';

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
  @media(max-width:767px){
    .members-container {padding:1em;}
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

  a.sort-button {
    position: relative;
    color: ${glitter} !important;
    background-color: ${astronaut};
    flex: 1 1 0;
    text-align: center;
    height: 100%;
    cursor: pointer;
    
  }

  a.sort-button:hover{
    color: ${romance} !important;
  }

  
  a.sort-button.active {
    color: ${romance} !important;
  }

  .pic {
    margin: 0 5px;
  }
  .members-container div {
    display: flex;
    flex-wrap: wrap;
}

  .members-list-card {
    margin: 0 0 0.5em 0.5em;
    padding: 25px;
    min-width: 220px;
    max-width: 220px;
    oveflow: hidden;
    min-height: 200px;
    height: auto;
    background-color: ${romance};
    font-family: ${primaryFont};
    cursor:pointer;
    ${dropShadowContainer}
  }
  @media(max-width:767px){
    .members-list-card{width:100%; margin:0px 0px 10px;}
  }

  .user-title {
    font-size: 18px;
    font-family: ${secondaryFont};
    color: #1e1e1e;
    cursor: pointer;
  }
  .header {
    width: 100%;
    height:25px;
}
  .title{
    border-bottom: 1px solid #253446;
    width:100%;
  }

  .member-info {
    display: flex;
    flex-direction: row;
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 10px;
    justify-content: space-between;
    height: 35px;
    align-items: center;
  }

  .leader-info {
    display: flex;
    flex-direction: row;
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 10px;
    justify-content: space-between;
    border-top: 1px solid ${astronaut};
    height: 35px;
    align-items: center;
    color: ${lightHeadedAstronaut};
  }

  .gravity-label {
    flex: 1 1 50%;
    display: block;
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
    cursor: pointer;
  }
`;
