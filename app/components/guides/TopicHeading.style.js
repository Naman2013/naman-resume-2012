import css from 'styled-jsx/css';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';

export default css`
  h2 {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 22px;
    border-bottom: 1px solid ${geyser};
    margin: 0 35px;
    margin-top: 40px;
    padding-bottom: 20px;
    text-transform: capitalize;
  }
`;
