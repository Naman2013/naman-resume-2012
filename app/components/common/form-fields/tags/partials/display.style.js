import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-text {
    font-size: 10px;
    color: ${astronaut};
    font-weight: bold;
    font-family: ${primaryFont};
    text-transform: uppercase;
  }

  @media ${screenMedium} {
    .root {
      min-height: 100px;
    }
  }
`;
