import css from 'styled-jsx/css';
import {
  seashell,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
  .form-container {
    width: 100%;
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
  .form-input {
    -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
    -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
    background-color: ${seashell};
    border-radius: 4px;
    border: 0;
    box-shadow:         inset 0 0 7px 0 ${shadows};
    font-family: ${secondaryFont};
    font-size: 16px;
    height: 151px;
    margin: 10px;
    padding: 25px;
    resize: none;
    vertical-align: top;
    width: 520px;
  }
`;
