import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .nav-actions {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 25px auto;
  }
`;
