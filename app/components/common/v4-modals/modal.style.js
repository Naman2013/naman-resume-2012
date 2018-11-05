import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, seashell, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    height: 100%;
    width: 100%;
    background-color: ${romance};
    padding: 15px;
    color: ${astronaut};
  }

  .title {
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase:
    font-size: 10px;
    color: ${astronaut};
  }

  .actions {
    display: flex;
  }

  .prompt-text {
    font-size: 20px;
    font-weight: normal;
    font-family: ${secondaryFont};
    padding: 15px;
  }

  @media ${screenMedium} {
    .root {
      width: 500px;
    }
  }

`;
