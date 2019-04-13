import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

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
