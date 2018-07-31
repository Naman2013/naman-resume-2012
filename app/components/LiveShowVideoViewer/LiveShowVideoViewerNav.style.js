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

  .tab-icon {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  :global(.dropdown-opt) {

  }

  :global(.opt-icon) {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background-color: ${astronaut};
    margin: 8px;
    vertical-align: middle;

  }

  :global(.opt-desc) {
    display: inline-block;
    margin: 8px;
    vertical-align: middle;


  }

  :global(.react-tabs__tab) {
    width: 110px;
    height: 110px;
    border-left: 1px solid ${geyser};
    border-right: 1px solid ${geyser};
  }

   :global(.react-tabs__tab):first-child {
    width: 138px;
    height: 110px;
    // margin-right: 100px;
  }

  :global(.react-select__control),
  :global(.react-select__control--is-focused){
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border-radius: 26px !important;
    ${faintShadow}
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

  :global(.react-tabs__option) {


  }
`;
