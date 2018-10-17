import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .step-root {
    margin: 0 auto;
    width: 100%;
    color: ${astronaut};
  }

  .inner-container {
    padding: 25px;
    width: 100%;
    background-color: ${romance};
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
    font-family: Arial, sans-serif;
    font-size: 13px;
    font-weight: bold;

  }

  .form-error {
    display: inline-block;
    color: red;
    font-weight: bold;
  }


  .form-field {

  }

  .google-field {}

  .form-field-container {}

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


  @media ${screenMedium} {
      .step-root {
        width: 600px;
      }

      .form-section.split {
        flex-direction: row;
      }

      .form-field-half {
        width: 50%;
      }
    }
`;
