import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import {
  astronaut,
  shadows,
  lynch
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
    font-family: ${secondaryFont};
    padding-bottom: 25px;
  }

  .title-text {
    font-size: 24px;
    font-family: ${astronaut};
  }

  .desc-text {
    display: block;
    font-size: 19px;
    padding: 15px 0;
    color: ${lynch};
  }

`;
