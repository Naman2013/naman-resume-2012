import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    border-radius: 26px;
  }

  :global(.slooh-select__control) {
    padding: 0 5px !important;
    background: transparent !important;
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border-radius: 26px !important;
    border: 0 !important;
    box-shadow: none !important;
    ${faintShadow}
  }

  :global(.slooh-select__value-container--has-value) {
    height: 40px;
    border-radius: 26px !important;
    background: transparent;
    border: 1px dashed ${astronaut};
    color: ${astronaut} !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    font-weight: bold !important;
  }

  :global(.slooh-select__indicators) {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  :global(.slooh-select__indicator-separator) {
    display: none;
  }

  :global(.slooh-select__menu) {
    background-color: ${romance};
    border-top: 0 !important;
    border-radius: 26px !important;
    box-shadow: none !important;
  }

  :global(.slooh-select__menu-list) {
    border-top: 0 !important;
    border-radius: 26px !important;
  }

  :global(.slooh-select__option) {
    border-top: 1px solid ${shadows};
  }

  :global(.slooh-select__option):first-child {
    border-top: 0;
  }

  :global(.slooh-select__option--is-focused) {
    color: ${astronaut} !important;
    background-color: transparent !important;
  }

  :global(.slooh-select__option--is-selected) {
    color: ${astronaut} !important;
    background-color: transparent !important;
  }

  :global(.dropdown-opt) {
    position: relative;
    padding: 10px;
  }

  :global(.dropdown-name) {
    display: inline-block;
    color: ${astronaut} !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    font-weight: bold !important;
  }

  :global(.dropdown-opt) :global(.focused-ind) {
    display: none;
  }

  :global(.dropdown-opt):hover :global(.focused-ind) {
    display: inline-block;
    position: absolute;
    right: 5px;
    top: 15px;
    background-color: ${astronaut};
    border-radius: 100%;
    height: 10px;
    width: 10px;
  }
`;
