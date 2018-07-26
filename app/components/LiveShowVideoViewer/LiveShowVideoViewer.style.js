import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    font-family: ${primaryFont};
    position: relative;
  }
  .live-video-container {
    display:block;
    background: #1F1F1F;
    width: 100%;
    margin-top: 10px;
    position: relative;
    justify-content: center;
    align-items: center;
    ${faintShadow}
  }
  .tablist {
    z-index: 99;
    display: inline-flex;
    position: absolute;
  }

  :global(.active-tele-tab) {
    display: block;
  }

  :global(.inactive-tele-tab) {
    display: none;
  }
`;
