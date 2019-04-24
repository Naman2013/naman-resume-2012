import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, romance, seashell, golden_yellow, shadows } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

export default css`

  .root {
    width: 300px;
    background-color: ${romance};
    padding: 25px;
    color: ${astronaut};
  }

  .title {
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase:
    font-size: 10px;
    color: ${astronaut};
  }

  .privacy-settings {
    display: flex;
    flex-direction: row;
  }

  .request-textarea {
    height: 200px;
    width: 300px;
  }

  .input-container {
    margin: 15px;
    display: block;
  }

  .privacy-buttons, .actions {
    display: flex;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
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
  }

  @media ${screenMedium} {
    .root {
      width: 500px;
    }
  }

`;
