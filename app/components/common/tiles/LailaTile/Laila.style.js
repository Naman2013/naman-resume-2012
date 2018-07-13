import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../../styles/variables/fonts';
import { white_tile, astronaut } from '../../../../styles/variables/colors_tiles_v4';

export default css`
  .root {
    width: 300px;
    box-shadow: 0px 0px 15px 1px rgba(65,86,113,.2);
    color: ${astronaut};
    list-style-type: none;
    background: url(${white_tile});
    background-size: 30px;
  }

  .title {
    font-family: ${secondaryFont};
  }

  .button {
    color: ${astronaut};
    text-decoration: none;
    font-family: ${primaryFont};
  }
`;
