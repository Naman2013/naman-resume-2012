import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, astronaut, romance, midnight_express, geyser, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .ask-astronomer {
    background-color: #F2F3F4;
  }

  .loader {
    display: block;
    text-align: center;
    margin: 25px;
    padding: 25px;
  }

  .ask-mobile-header {
    position: relative;
    display: block;
    padding-top: 40px;
    background-color: ${romance};
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
  }

  .border {
    width: 200px;
    height: 200px;
    border: 1px solid ${hawkesBlue};
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
  }

  .icon {
    position: absolute;
    width: 180px;
    height: 180px;
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


  .btn-nav {
    position: absolute;
    bottom: 20px;
    color: #8D969F;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .btn-nav:first-of-type {
    left: 50px;
  }

  .btn-nav:last-of-type {
    right: 50px;
  }

  .btn-nav.active {
    color: ${astronaut};
    font-weight: 600;
  }

  .btn-nav.active:after {
    content: ""; 
    display: block;
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: -21px;
    background: url("https://vega.slooh.com/assets/v4/common/icon_navarrow_blue.svg") no-repeat center center; 
  }


  .center-line {
    border-right: 1px solid ${hawkesBlue};
    width: 50%;
    height: 60px;
  }

  .ask-question-tile {
    width: 100%;
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

  @media ${screenMedium} {

    .ask-mobile-header {
      display: none;
    }

    .ask-astronomer {
      display: flex;
      flex-direction: row;
      padding: 10px 25px;
    }
    .loader {
      display: block;
      text-align: center;
      margin: 25px;
      padding: 25px;
    }

    .left {
      flex: 3;
    }

    .right {
      flex: 1;
    }
  }

`;
