import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import {
  astronaut,
  shadows,
  lynch
} from 'styles/variables/colors_tiles_v4';

export default css`
  .root {
    font-family: ${secondaryFont};
  }

  .title-container {
    height: 75px;
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${astronaut};
  }

  .title-text {
    font-size: 24px;

  }

  .desc-text {
    display: block;
    font-size: 19px;
    padding: 15px;
    color: ${lynch};
  }

`;
