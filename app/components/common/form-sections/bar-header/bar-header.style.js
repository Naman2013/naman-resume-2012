import css from 'styled-jsx/css';
import { secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { astronaut, shadows } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    border-bottom: 1px solid ${shadows};
  }
  .title-text {
    font-size: 10px;
    color: ${astronaut};
    font-weight: bold;
    font-family: ${secondaryFont};
    text-transform: uppercase;
    padding: 15px;
  }

  @media ${screenMedium} {
    .title-text {
      font-size: 10px;
    }
  }
`;
