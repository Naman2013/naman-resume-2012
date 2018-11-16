import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

export default css`
  .root {
    background-color: ${romance};
  }

  .form {
    padding: 25px 0;
    ${faintShadow}
  }

  .form-submit {
    margin: 0 auto;
  }

  .forgot {
    display: block;
    margin: 15px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .field-error {
    color: red;
    font-family: ${primaryFont};
  }

  .title-link, .title-link:hover {
    font-weight: bold;
    font-size: 11px;
    color: ${astronaut};
    font-family: ${primaryFont};
    text-transform: uppercase;
  }

  .register-container {
    border-top: 1px solid ${shadows};
    padding: 15px;
    margin: 15px;
  }

  .or-container {
    position: relative;
    margin-top: 10px;
  }

  .or-line {
    position: absolute;
    border-top: 1px solid ${shadows};
    top: 5px;
    left: 0;
    width: 100%;

  }

  .or-text {
    font-size: 10px;
    text-transform: uppercase;
    width: 50px;
    color: ${astronaut};
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    font-family: ${primaryFont};
    background-color: ${romance};
  }

  .google-container {
    padding-top: 15px;
    margin: auto;
    text-align: center;
  }

  .google-button {
    background-color: #4285F4;
    border-radius: 100px;
    padding: 10px 15px;
    color: ${romance};
    border: 0;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 12px;
    font-weight: bold;
  }

`;
