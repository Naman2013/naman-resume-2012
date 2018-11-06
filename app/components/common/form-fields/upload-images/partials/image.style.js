import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    position: relative;
  }

  .displayed-img-container {
    display: flex;
    align-tiems: center;
    justify-content: center;
    height: 100px;
    margin: 5px;
    padding: 15px;
    border: 1px solid ${shadows};
  }

  .displayed-img {
    height: 75px;
  }

  .delete-tag {
    position: absolute;
    right: 1px;
    top: 0;
    margin: 10px;
    cursor: pointer;
  }
`;
