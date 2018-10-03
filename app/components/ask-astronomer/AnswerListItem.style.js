import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, astronaut, romance, midnight_express, geyser, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .answer {
    width: 100%;
  }

  .top-answer {
    background-color: #3C4A55;
    padding: 20px;
    margin: 0 -40px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    color: #fff;
    height: 50px;
    margin-bottom: 40px;
  }

  .action-item,
  .action-item a {
    color: ${astronaut};
    cursor: pointer;
  }

  .action-item :global(.heart-wrapper) {
    display: inline-block;
  }

  .action-item :global(.likeText) {
    font-size: 16px;
    display: inline;
  }
  .action-item,
  .display-name {
    margin: 0 5px;
  }

  .action-item {
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .display-name {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
    height: 14px;
    margin-left: 5px;
    letter-spacing: 1px;
  }

  .display-name:before {
    content: url("https://vega.slooh.com/assets/v4/common/ask_avatar.svg");
    position: relative;
    left: -5px;
    top: 3px;
  }

  .content {
    margin: 15px 0;
    font-family: ${secondaryFont};
    line-height: 28px;
  }

  .loader {
    display: block;
    text-align: center;
    font-size: 12px;
  }  

  .date {
    padding: 10px 0;
    border-top: 1px solid ${hawkesBlue};
    border-bottom: 1px solid ${hawkesBlue};
    text-transform: uppercase;
    font-size: 10px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
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



`;
