import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .ask-modal {
    font-family: ${primaryFont};
    text-transform: uppercase;
  }
  .question-title {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 12px;
    padding: 40px;
    padding-bottom: 10px;
    width: 100%;
    font-weight: 600;
    letter-spacing: 1.5px;
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  .form {
    padding: 15px;
  }
  .question-input {
    border-width: 1px;
    height: 200px;
    width: calc(100% - 30px);
    padding: 15px;
    vertical-align: top;
    margin: 10px;
  }
  .question-button {
    display: block;
    width: 100px;
    padding: 5px 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 10px;
    margin-top: 10px;
  }






  .question-container {
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    margin: 10px 0;
    padding: 40px;
    background-color: ${romance};
  }

  .question {
    margin: 30px 0;
    font-size: 18px;
    font-family: ${secondaryFont};
  }

  .date {
    padding: 10px 0;
    border-top: 1px solid ${hawkesBlue};
    border-bottom: 1px solid ${hawkesBlue};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .author {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 10px;
    color: ${lightHeadedAstronaut};
    height: 14px;
    margin-left: 5px;
    letter-spacing: 1px;
  }

  .author:before {
    content: url("https://vega.slooh.com/assets/v4/common/ask_avatar.svg");
    position: relative;
    left: -5px;
    top: 3px;
  }


  .ask-mobile-details-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  .reply-count {
    text-transform: uppercase;
    font-size: 10px;
    padding: 10px 0;
    border-bottom: 1px solid ${hawkesBlue};
    width: 100%;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
  }


  .ask-button-container {
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .close-answers {
    cursor: pointer;
    height: 25px;
  }

  .loader {
    display: block;
    text-align: center;
    font-size: 12px;
  }

`;
