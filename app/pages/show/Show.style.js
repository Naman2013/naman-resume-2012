import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    padding-bottom: 25px;
  }

  .hide-on-mobile {
    display: none;
  }

  .big-box {
    background-color: ${romance};
  }

  .full-width {
    width: 100%;
  }

  .video-container {
    display:block;
    background: #1F1F1F;
    width: 100%;
    margin-top: 10px;
    position: relative;
    justify-content: center;
    align-items: center;
    ${faintShadow}
  }

  @media ${screenLarge} {
    .hide-on-mobile {
      display: block;
    }


  }

`;
