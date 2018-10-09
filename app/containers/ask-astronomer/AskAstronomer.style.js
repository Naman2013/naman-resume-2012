import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, astronaut, romance, midnight_express, geyser, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .full-bg {
     background-color: #F2F3F4;
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

  .show {
    display: block;
  }

  .hidden {
    display: none;
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

  .btn-nav.show {
    color: ${astronaut};
    font-weight: 600;
  }

  .btn-nav.show:after {
    content: ""; 
    display: block;
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: -21px;
    background: url("https://vega.slooh.com/assets/v4/common/icon_navarrow_blue.svg") no-repeat center center; 
  }

  .btn-nav.hidden {
    display: block !important;
  }

  .center-line {
    border-right: 1px solid ${hawkesBlue};
    width: 50%;
    height: 60px;
  }

  .ask-tablet-subnav {
    display: none;
  }

  @media ${screenMedium} {

    .ask-mobile-header {
      display: none;
    }

    .ask-tablet-subnav {
      position: relative;
      display: block;
      box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.1);
    }

    /* .ask-astronomer {
      display: flex;
      flex-direction: row;
      padding: 0;
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
    } */
  }

  @media ${screenXLarge} {

    .ask-mobile-header {
      display: none;
    }

    .ask-tablet-subnav {
      display: none;
    }

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

    .left {
      width: 66%;
    }

    .right {
      position: absolute;
      right: 0;
    }

    .show {
      display: block;
    }

    .hidden {
      display: block important!;
    }
  }
`;
