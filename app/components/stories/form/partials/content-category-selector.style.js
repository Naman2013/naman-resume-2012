import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, seashell, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .content-category-container {
    position: relative;
    height: 100px;
  }

  .content-hover-item {
    position: absolute;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid ${shadows};

    cursor: pointer;
    color: ${astronaut};
    background-color: ${romance}
  }

`;
