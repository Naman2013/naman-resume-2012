import css from 'styled-jsx/css';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;
    padding: 10px 20px;
    background-color: transparent;
    border: 1px dashed ${astronaut};
    text-align: left;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
    font-family: ${primaryFont};
  }

  .circular {
    width: 40px;
    height: 40px;
    padding: 0;
  }

  .text {
    display: inline-block;
    font-size: 11px;
    margin: 0 auto;
  }

  .pad-right {
    padding-right: 40px;
  }

  .active.button-container {
    background-color: ${astronaut};
  }

  .active .button-icon,
  .active .text {
    color: ${romance};
  }
`;
