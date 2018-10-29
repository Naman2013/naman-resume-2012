import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${romance};
    color: ${astronaut};
    ${faintShadow}
  }

  .title {
    color: ${astronaut};
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 14px;
    border-bottom: 1px solid ${shadows};
    margin: 15px;
    display: block;
    width: 100%;
    padding: 15px;
  }

  @media ${screenMedium} {
    .root {
      flex-direction: row;
    }

    .title {
      padding: 0;
      border: 0;
      margin: 0;
      width: auto;
    }
  }

`;
