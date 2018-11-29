import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .join-root-alt {
    background-image: url(https://vega.slooh.com/assets/v4/common/night_cliffs.png);
    background-size: cover;
    background-position: center;
    width: auto;
    background-repeat: no-repeat;
    margin-bottom: -50px;
  }

  .join-root-alt-header {
    font-family: ${secondaryFont};
    color: ${romance};
    font-weight: normal;
    padding: 40px 0 20px 40px;
  }

  .join-root-alt-header h1 {
    font-size: 28px;
  }

  .join-root-alt-header h2 {
    font-size: 18px;
  }

  .step-root {
    margin: 0 auto;
    width: 100%;
    padding: 25px 0 200px;
  }

  .inner-container {
    padding: 40px;
    width: 100%;
    background-color: ${romance};
    ${faintShadow}
  }

  .form {
    padding: 25px 0;
    box-shadow: none;
  }

  .section-heading {
    font-size: 14px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 25px 0;
    letter-spacing: 2px;
  }

  .form-section {
    border-bottom: 1px solid ${shadows};
    padding: 15px 0;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
  }

  .form-label {
    display: inline-block;
    font-family: Arial, sans-serif;
    font-size: 13px;
    font-weight: bold;
  }

  button.submit-button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;
    padding: 10px 20px;
    color: ${romance};
    background-color: ${astronaut};
    text-align: left;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
    font-family: ${primaryFont};

  }

  button.submit-button:focus {
    outline: none;
  }

  @media ${screenMedium} {
    .step-root {
      width: 600px;
    }

    .join-root-alt-header {
      padding: 40px 0 20px 0;
    }
  }



`;
