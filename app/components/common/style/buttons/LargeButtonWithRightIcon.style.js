import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
  .text {
    vertical-align: middle;
    font-size: 11px;
    margin: 0 10px;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
    font-family: ${primaryFont};
    position: relative;
    border: 1px dashed ${astronaut};
    border-radius: 100px;
    width: auto;
    height: 40px;
    margin: 15px 0;
    font-size: 11px;
    font-weight: bold;
    padding: 10px 15px;
    text-transform: uppercase;
    background-color: transparent;
  }

  .circular {
    width: 40px;
    height: 40px;
  }
`;
