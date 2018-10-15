import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, lightHeadedAstronaut } from '../../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`

  .mvp-card {
    background-color: ${romance};
    width: 100%;
    height: 200px;
    padding: 25px 40px;
    margin: 25px auto;
    min-width: 28%;
    box-shadow: none;
    border-bottom: 1px solid ${hawkesBlue};
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }

  .mvp-card:last-of-type {
    border-bottom: none;
  }

  .mvp-card h5 {
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
  }

  .mvp-card a {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
  }

  .mvp-icon {
    background-color: ${midnight_express};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 10px;
    position: relative;
    overflow: hidden;
  }

  .mvp-icon-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
  }



  @media ${screenMedium} {

    .mvp-card {
      width: 100%;
      background-color: ${romance};
      max-height: 140px;
      padding: 10px 40px;
      margin: 25px auto;
      box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    }

    .mvp-icon {
      width: 30px;
      height: 30px;
      float: left;
      margin: 20px 15px 0 0;
    }
  }



   @media ${screenXLarge} {

     .mvp-card {
        background-color: ${romance};
        width: 100%;
        height: auto;
        max-height: unset;
        padding: 25px 40px;
        margin: 25px auto;
        min-width: unset;
        box-shadow: none;
        border-bottom: 1px solid ${hawkesBlue};
      }


      .mvp-icon {
        width: 40px;
        height: 40px;
        float: none;
        margin: 0;
      }
   }
`;
