import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, romance, shadows } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

export default css`

  .root {
    font-family: ${primaryFont};
    color: ${astronaut};
    margin: 25px;
    padding: 50px;
    -moz-box-shadow: 0 2px 4px 1px ${shadows};
    -webkit-box-shadow: 0 2px 4px 1px ${shadows};
    box-shadow: 0 2px 4px 1px ${shadows};
    background-color: ${romance};
  }

  .inspire {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
  }
  .write {
    display: block;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
  }
  .root-form {
    display: flex;
    flex-direction: column;
  }

  .obs-form-button {
  }
  .fa-close {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

`;
