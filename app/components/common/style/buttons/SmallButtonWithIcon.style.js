import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  .text {
    vertical-align: middle;
    font-size: 13px;
    margin: 0 5px;
  }
  .button-container {
    font-family: ${primaryFont};
    display: block;
    border: 1px dashed ${astronaut};
    background-color: transparent;
    border-radius: 100px;
    width: 110px;
    margin: 15px 0;
    font-size: 11px;
    font-weight: bold;
    padding: 5px 0;
    text-transform: uppercase;
    width: 50px;
    height: 40px;
  }
`;
