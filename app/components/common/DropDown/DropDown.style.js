import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows, geyser } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    width: 250px;
  }

  :global(.slooh-select__control),
  :global(.slooh-select__control--is-focused){
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border: 0 !important;
    border-radius: 26px !important;
    background: transparent;
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
    margin-top: -50px !important;
    border-radius: 26px !important;
  }

  :global(.slooh-select__menu-list) {
    border-radius: 26px !important;
  }

  :global(.slooh-select__option) {
    border-top: 1px solid ${shadows};
    color: ${astronaut} !important;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
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
