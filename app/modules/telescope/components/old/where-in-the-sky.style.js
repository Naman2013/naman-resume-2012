import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { astronaut } from 'app/styles/variables/colors_tiles_v4';

export default css`
  p {
    margin: 0;
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${astronaut};
  }
`;
