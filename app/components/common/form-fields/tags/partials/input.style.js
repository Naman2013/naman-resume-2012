import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, seashell, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .add-tag-input {
    display: block;
    width: 50%;
    margin: 0 auto;
    padding: 10px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: ${astronaut};
    background-color: ${seashell};
    background-clip: padding-box;
    border: 1px solid ${shadows};
    border-radius: .25rem;
  }


`;
