import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  hawkesBlue,
  astronaut,
  shadows,
  romance,
  midnight_express,
  geyser,
  lightHeadedAstronaut,
  faintGray,
} from '../../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../styles/variables/breakpoints';

export default css`
  .ask-question-tile {
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
    margin: 10px;
    width: calc(100% - 20px);
    padding: 40px;
    background-color: ${romance};
    font-size: 18px;
    font-family: ${secondaryFont};
    color: #616e7d;
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

  .vert-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    border-right: 1px solid ${shadows};
  }

  .icon-container-circle {
    background-color: ${romance};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-item {
    flex: 0 50%;
  }

  .circle-icon-line {
    border: 1px solid ${shadows};
    width: 115px;
    height: 115px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-line {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    border-right: 1px solid ${shadows};
  }

  .border {
    width: 140px;
    height: 140px;
    border: 1px solid ${hawkesBlue};
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
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

    .button-contain {
      display: flex;
      flex-direction: row;
      align-items: center;
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
  @media ${screenLarge} {
    .ask-question-tile {
      flex-direction: column;
    }

    .icon-container {
      position: relative;
      padding: 15% 0;
      height: 200px;
    }

    .icon-line-horz {
      display: block;
      text-align: center;
      border-bottom: 1px solid ${shadows};
      font-size: 10px;
      font-family: ${primaryFont};
      text-transform: uppercase;
      font-weight: bold;
    }

    .button-contain {
      margin-top: 15px;
    }
  }
`;
