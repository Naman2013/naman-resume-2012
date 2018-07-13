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

  .container {
    width: 80%;
    margin: 0 auto;
  }

  .title {
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 18px;
    border-bottom: 1px solid #D9DEE4;
  }

  .button {
    padding: 0;
    padding: 0;
    color: ${astronaut};
    text-decoration: none;
    font-family: ${primaryFont};
  }
`;
