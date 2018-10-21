import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { romance, geyser, shadows, lightHeadedAstronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    padding: 25px;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    color: ${lightHeadedAstronaut};
    background-color: ${romance};
  }

  .title {
    margin: 0;
    padding: 0;
    font-family: ${secondaryFont};
    font-weight: normal;
    font-size: 20px;
    text-transform: capitalize;
  }

  .telescope {
    font-family: ${primaryFont};
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .dat {
    align-self: flex-start;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
  }

  .thyme-container {
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
    padding: 10px 0;
    margin: 15px 0;
  }

  .thyme {
    align-self: flex-end;
    font-size: 46px;
    line-height: 46px;
    font-weight: 100;
    transition: font-size 0.25s ease-in-out;
  }

  .utc {
    font-size: 10px;
    transform: rotate(90deg);
    letter-spacing: 2px;
    font-weight: 400;
    position: absolute;

  }

  .bottom {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media ${screenMedium} {
    .thyme {
      font-size: 56px;
      line-height: 56px;
      font-weight: 100;
    }
  }

`;
