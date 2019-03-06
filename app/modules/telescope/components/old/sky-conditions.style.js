import css from 'styled-jsx/css';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from  'styles/variables/fonts';

export default css`
  .level {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 20px;
    margin-bottom: 20px;
  }

  .content-description {
    font-family: ${secondaryFont};
    font-size: 19px;
    color: ${astronaut};
  }
`;
