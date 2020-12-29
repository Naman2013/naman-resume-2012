import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';

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

  .title-link,
  .title-link:hover {
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
  .slooh-gift-card{
    text-align:center;
    margin-bottom: 140px;
  }
  .slooh-gift-card-heading{
    font-size:20px;
    padding:5px;
  }
  .slooh-gift-card-sub-heading{
    font-size:16px;
    padding:5px;

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
    background: rgb(209, 72, 54);
    color: rgb(255, 255, 255);
    width: 190px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 2px;
    border: 1px solid transparent;
    font-size: 16px;
    font-weight: bold;
    font-family: Roboto;
  }

  .forgot-password-req h1 {
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    padding: 25px;
    letter-spacing: 2px;
    color: ${astronaut};
  }

  .forgot-password-req p {
    color: ${astronaut};
    font-size: 12px;
    font-family: ${secondaryFont};
    padding: 25px;
  }

  .close-button-container {
    display: flex;
    justify-content: flex-end;
  }
`;
