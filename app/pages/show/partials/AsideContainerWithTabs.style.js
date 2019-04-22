import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, geyser, shadows, romance } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

export default css`
  .root {
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
