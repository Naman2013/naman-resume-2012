import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import {
  astronaut,
  romance,
  seashell,
  golden_yellow,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    height: 100%;
    width: 100%;
    background-color: ${romance};
    padding: 15px;
    color: ${astronaut};
  }

  .title {
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase:
    font-size: 10px;
    color: ${astronaut};
  }

  .fullpage-form {
    height: 100%;
    width: 100%;
    background-color: ${romance};
    color: ${astronaut};
  }

  .avatar {
    height: 15px;
    width: 15px;
    margin-right: 15px;
    border-radius: 100%;
  }

  .top {
    border-bottom: 1px solid ${shadows};
    padding-bottom: 5px;
  }

  .left-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
  }

  .info-container {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    border-bottom: 1px solid ${shadows};
    padding-bottom: 5px;
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .request-textarea {
    height: 200px;
    width: 300px;
  }

  .input-container {
    margin: 15px;
    display: block;
  }

  .actions {
    display: flex;
    min-height: 40px;
    margin-top: 30px;
  }

  .privacy-buttons {
    margin-top: 30px;
    min-height: 41px;
  }

  .button-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    line-height: 39px;
  }

  .button-container :global(.button-container){
    padding: 0 20px;
    margin: 0;
  }

  .button-container.question-form {
    min-height: 41px;
  }

  .field-input {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: ${astronaut};
    background-color: ${seashell};
    background-clip: padding-box;
    border: 1px solid ${shadows};
    border-radius: .25rem;
  }

  .prompt-text {
    font-size: 20px;
    font-weight: normal;
    font-family: ${secondaryFont};
    padding: 15px;
    word-break: break-word;
  }

  @media ${screenMedium} {
    .root {
      width: 500px;
    }
  }

`;
