import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

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
    padding-top: 30px;
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
