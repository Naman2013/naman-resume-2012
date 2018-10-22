import css from 'styled-jsx/css';
import { secondaryFont } from 'styles/variables/fonts';
import { astronaut } from 'styles/variables/colors_tiles_v4';

export default css`
  p {
    margin: 0;
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${astronaut};
  }
`;
