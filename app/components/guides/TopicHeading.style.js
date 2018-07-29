import css from 'styled-jsx/css';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  h2 {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 22px;
    border-bottom: 1px solid ${geyser};
    margin: 0 35px;
    padding-top: 40px;
    padding-bottom: 20px;
    text-transform: capitalize;
  }

  @media ${screenMedium} {
    h2 {
      font-size: 32px;
      border-bottom: 4px solid ${astronaut};
      margin: 0;
    }
  }

  @media ${screenLarge} {
    h2 {
      font-size: 38px;
    }
  }
`;
