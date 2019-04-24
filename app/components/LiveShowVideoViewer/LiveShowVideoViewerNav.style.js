import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, geyser } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .root {
    font-family: ${primaryFont};
    position: relative;
  }

  .select-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px;
  }

  :global(.live-show .tablist) {
    padding: 0;
    display: flex;
    ${faintShadow}
  }

  .tab-description {
    text-align: center;
  }

  .live-show.show-tab {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .live-show-icon.tab-icon {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-repeat: no-repeat;
  }

  :global(.live-show-icon.opt-icon) {
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .show-tab {
    margin: 0 auto;
    margin-bottom: 5px;
    margin-top: 20px;
    background-color: ${astronaut};
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .tab-icon {
    width: 100%;
    height: 100%;
    border-radius: 100%;
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
    width: 120px;
    vertical-align: top;
    border-left: 1px solid ${geyser};
    font-size: 13px;
  }

  :global(.react-tabs__tab:last-child, .react-tabs__tab:first-child) {
    border-right: 1px solid ${geyser};
  }

  :global(.react-tabs__tab):first-child {
    margin-right: 100px;
  }

  :global(.react-select__control),
  :global(.react-select__control--is-focused) {
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border-radius: 26px !important;
    ${faintShadow}
  }

  :global(.active-tele-tab) {
    display: block;
    font-size: 15px;
  }

  :global(.inactive-tele-tab) {
    display: none;
    font-size: 13px;
  }

  :global(.react-tabs__tab--selected) {
    border-color: transparent;
    border-bottom: 4px solid ${astronaut};
    border-radius: 0;
    position: relative;
    bottom: 0;
    ${faintShadow}
  }

  :global(.react-tabs__tab--selected::after) {
    content: '';
    display: block;
    position: absolute;
    height: 8px;
    width: 10px;
    left: 50%;
    margin-left: -5px;
    bottom: 0px;
    background: url('https://vega.slooh.com/assets/v4/common/icon_navarrow_blue.svg')
      no-repeat center center;
  }

  .tab-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  :global(.live-show .tablist > li:first-child > div) {
    justify-content: center;
  }

  :global(.live-show .react-select__value-container) {
    overflow: visible;
  }
`;
