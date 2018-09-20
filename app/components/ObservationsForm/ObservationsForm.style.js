import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

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

  .header {
    border-bottom: 1px solid ${shadows};
    padding-bottom: 25px;
    margin-bottom: 25px;
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
  .obs-form-required {
    display: block;
    padding-bottom: 15px;
    text-align: right;
    padding-top: 5px;
  }
  .obs-form-input {
    display: block;
    width: 100%;
    padding: 15px;
    background-color: ${shadows};
    -moz-box-shadow: 0 2px 4px 1px ${shadows};
    -webkit-box-shadow: 0 2px 4px 1px ${shadows};
    box-shadow: 0 2px 4px 1px ${shadows};
    border: 1px solid ${shadows};
    outline: none;
  }
  .obs-form-textarea {
    resize: none;
    display: block;
    width: 100%;
    padding: 15px;
    background-color: ${shadows};
    -moz-box-shadow: 0 2px 4px 1px ${shadows};
    -webkit-box-shadow: 0 2px 4px 1px ${shadows};
    box-shadow: 0 2px 4px 1px ${shadows};
    border: 1px solid ${shadows};
    outline: none;
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
