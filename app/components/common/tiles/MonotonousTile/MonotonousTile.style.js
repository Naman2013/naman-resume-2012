import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, lynch } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    font-family: ${primaryFont};
    ${faintShadow}
    padding: 25px;
    text-align: left;
    max-height: 135px;
    color: ${astronaut};
  }

  .title-label {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 11px;
    padding-bottom: 25px;
  }

  .text {
    font-family: ${secondaryFont};
    font-size: 22px;
  }
`;
