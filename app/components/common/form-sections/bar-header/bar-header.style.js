import css from 'styled-jsx/css';
import { primaryFont } from 'styles/variables/fonts';
import {
  astronaut,
  shadows,
} from 'styles/variables/colors_tiles_v4';

export default css`
  .root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    border: 1px solid ${shadows};
  }
  .title-text {
    font-size: 10px;
    color: ${astronaut};
    font-weight: bold;
    font-family: ${primaryFont};
    text-transform: uppercase;
    padding-left: 25px;
  }

`;
