import css from 'styled-jsx/css';
import {
  seashell,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-height: 120px;
  }
  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
  .form {
    padding: 15px;

  }
  .fake-input {
    -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow:         inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    height: 60px;
    margin: auto;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 260px;
  }
  .reveal-form-input {
    -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow:         inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    height: 208px;
    margin: 0 auto;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 100%;
  }



  @media ${screenMedium} {
    .fake-input {
      width: 540px;
    }
    .reveal-form-input {
      height: 393px;
      width: 628px;
    }
  }

  @media ${screenLarge} {
    .fake-input {
      width: 540px;
    }
    .reveal-form-input {
      height: 393px;
      width: 628px;
    }
  }
`;
