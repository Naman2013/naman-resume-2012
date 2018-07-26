import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, geyser } from 'styles/variables/colors_tiles_v4';
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

  .show-tab {
    margin: auto;
    background-color: ${astronaut};
    height: 50px;
    width: 50px;
    margin-top: 25%;
    border-radius: 50%;
  }

  :global(.react-tabs__tab) {
    width: 110px;
    height: 110px;
    border-left: 1px solid ${geyser};
    border-right: 1px solid ${geyser};
  }

  #react-tabs-0 {
    width: 138px;
    height: 110px;
    margin-right: 100px;
  }

  :global(.active-tele-tab) {
    display: block;
  }

  :global(.inactive-tele-tab) {
    display: none;
  }

  :global(.react-tabs__tab--selected) {
    border-color: transparent;
    border-bottom: 4px solid ${astronaut};
    ${faintShadow}
  }
`;
