import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  moodyBleu,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge, screenMedium } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .step-root {
    margin: 0 auto;
    width: 100%;
    color: ${astronaut};
    background: white;
  }

  .groups-header-information {
    border-top: 1px solid ${shadows};
    padding-top: 30px;
  }

  .inner-container {
    padding: 25px;
    width: 100%;
    ${faintShadow}
  }

  .section-heading {
    font-size: 14px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 25px 0;
    letter-spacing: 2px;
    border-bottom: 1px solid ${shadows};
    background-color: white;
  }

  .google-login-button {
    margin: 15px auto;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 1px solid ${shadows};
  }

  .form {
    margin: 15px 0;
    color: ${astronaut};
  }

  .form-section {
    border-bottom: 1px solid ${shadows};
    padding: 15px 0;
  }

  .form-section.split {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .form-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .form-error {
    display: inline-block;
    color: red;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 11px;
    padding-left: 10px;
  }

  .form-field-container label {
    margin: 5px 0 15px 0 !important;
  }

  .form-field-half {
    width: 100%;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
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

  .button-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
  }

  @media ${screenMedium} {
    .step-root {
      width: 600px;
    }

    .form-section.split {
      flex-direction: row;
    }

    .form-field-half {
      width: 50%;
      padding-right: 40px;
    }
  }

  @media ${screenLarge} {
    justify-content: flex-end;
  }
`;
