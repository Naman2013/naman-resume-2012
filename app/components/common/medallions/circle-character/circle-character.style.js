import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, seashell, geyser, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .circle {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${geyser};
    color: ${astronaut};
    border: 1px solid ${shadows};
  }

  .circle.active {
    background-color: ${astronaut};
    color: ${romance};
  }

  .character {
    font-weight: bold;
    font-size: 11px;
  }

`;
