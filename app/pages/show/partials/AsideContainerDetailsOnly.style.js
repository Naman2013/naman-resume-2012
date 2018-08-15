import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, geyser, shadows, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    margin: 25px;
    margin-top: 0;
  }
  .header-title {
    font-family: ${secondaryFont};
    font-size: 30px;
    color: ${astronaut};
    padding: 0 25px 25px 25px;
    border-bottom: 1px solid ${shadows};
  }
`;
