import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import {
  hawkesBlue,
  seashell,
  astronaut,
  romance,
  midnight_express,
  geyser,
  lightHeadedAstronaut,
  faintGray,
} from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .full-bg {
     background-color: ${seashell};
  }

  .ask-astronomer {

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

  .mvp {
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    margin: 10px;
    width: calc(100% - 20px);
    background-color: ${romance};
  }

  .mvp .mvp-header {
    display: block;
    padding: 30px 40px;
    border-bottom: solid 4px ${astronaut};
  }

  .mvp .mvp-header h1 {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
  }

  .mvp .mvp-header h2 {
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
    color: ${lightHeadedAstronaut};
  }

  .ask-astronomer :global(.component-container) {
    box-shadow: none;
  }

  .ask-astronomer :global(.split-nav-item-container) {
    border-top: 0;
  }



  @media ${screenMedium} {


    .mvp {
      box-shadow: none;
      margin: 0;
      width: 100%;
      background-color: #F2F3F4;
    }

    .mvp .mvp-header {
      display: none;
    }
  }

  @media ${screenXLarge} {

    .ask-astronomer {
      display: flex;
      flex-direction: row;
      padding: 0;
      position: relative;
    }

    .loader {
      display: block;
      text-align: center;
      margin: 25px;
      padding: 25px;
    }

    .mvp {
      display: block !important;
      width: 300px;
      box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
      margin: 10px;
      background-color: ${romance};
    }
    .mvp .mvp-header {
      display: block;
    }
  }
`;
