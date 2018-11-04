import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    border: 1px solid ${shadows};
    padding: 15px 25px;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${astronaut};
    margin: 5px;
    position: relative;
  }

  .delete-tag {
    position: absolute;
    right: 1px;
    top: 0;
    margin: 3px;
  }
`;
