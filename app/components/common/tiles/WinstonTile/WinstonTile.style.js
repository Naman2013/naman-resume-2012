import css from 'styled-jsx/css';
import {
  astronaut,
  romance,
  golden_yellow,
} from 'app/styles/variables/colors_tiles_v4';
import { faintShadow } from 'app/styles/variables/shadows';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';

export default css`

  .root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${faintShadow}
    font-family: ${primaryFont};
    width: 300px;
    height: 200px;
    color: ${romance};
    text-align: center;
    background-repeat: no-repeat;
    background-color: ${astronaut};
  }

  .title-text {
    font-family: ${secondaryFont};
    color: ${romance};
    font-size: 20px;
    padding-bottom: 15px;
  }

  .link-text {
    cursor: pointer;
    color: ${golden_yellow};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    padding-top: 15px;
  }

`;
