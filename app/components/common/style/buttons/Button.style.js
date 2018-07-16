import css from 'styled-jsx/css';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';


export const activeStyles = css`
  .active.button-container {
    background-color: ${astronaut};
  }
  .active .button-icon,
  .active .text {
    color: ${romance};
}`;

export default css`
  .text {
    vertical-align: middle;
    font-size: 11px;
    margin: 0 auto;
  }
  .button-container {
    display: flex;
    font-family: ${primaryFont};
    background-color: transparent;
    border: 1px dashed ${astronaut};
    border-radius: 100px;
    width: 110px;
    margin: 15px 0;
    font-size: 11px;
    font-weight: bold;
    padding: 5px 0;
    text-transform: uppercase;
    height: 40px;
    width: 140px;
  }

  .circular {
    width: 40px;
    height: 40px;
  }

  .active.button-container {
    background-color: ${astronaut};
  }
  .active .button-icon,
  .active .text {
    color: ${romance};
  }

`;
