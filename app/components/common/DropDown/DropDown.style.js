import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
  }

  :global(.slooh-select__control) {
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border-radius: 26px !important;
    background: transparent;
    border: 0 !important;
    box-shadow: none !important;
    ${faintShadow}
  }

  :global(.slooh-select__value-container--has-value) {
    position: absolute;
    width: 238px;
    left: 5px;
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
    border-top: 0 !important;
    border-radius: 0 0 26px 26px !important;
    box-shadow: none !important;
    margin-top: -5px !important;
  }

  :global(.slooh-select__menu-list) {
    border-top: 0 !important;
    border-radius: 0 0 26px 26px !important;
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
  }
`;
