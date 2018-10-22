import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, astronaut, romance, midnight_express, geyser, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .ask-question-tile {
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    margin: 10px;
    width: calc(100% - 20px);
    padding: 40px;
    background-color: ${romance};
    font-size: 18px;
    font-family: ${secondaryFont};
    color: #616E7D;
  }

  .ask-question-tile .dek {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
  }

  .ask-question-tile h2 {
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
    color: ${lightHeadedAstronaut};
    margin: 0;
  }

  .ask-question-tile p {
    padding: 20px 0 15px 0;
  }

  .ask-question-tile button {
    letter-spacing: 1px;
    width: 100%;
    max-width: 210px;
  }

  .icon-container {
    display: none;
  }

  .border {
    width: 140px;
    height: 140px;
    border: 1px solid ${hawkesBlue};
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
  }

  .icon {
    position: absolute;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media ${screenMedium} {

    .ask-question-tile {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 0;
    }

    .icon-container {
      display: block;
      flex: 1;      
    }

    .ask-question-tile h2 {
      border-bottom: none;
    }

    .ask-question-text {
      flex: 2;
    }
    .ask-question-text p { 
      display: none; 
    }
  }

  @media ${screenXLarge} {
    .ask-question-tile {
      width: 300px;
      height: 400px;
      display: block;
      position: relative;
      margin: 10px;
    }

    .icon-container {
      flex: none;
      position: absolute;
      top: 130px;
      left: 40px;
      border-top: 1px solid ${hawkesBlue};
      border-bottom: 1px solid ${hawkesBlue};
      padding: 20px 0;
      width: 210px;
    }
    .border {
      width: 110px;
      height: 110px;
    }
    .icon {
      width: 100px;
      height: 100px;
    }

    .ask-question-text {
      height: 100%;
    }

    .ask-question-tile h2 {
      padding: 15px 0 200px;
    }
  }
`;
