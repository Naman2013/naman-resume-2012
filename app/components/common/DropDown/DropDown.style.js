import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  shadows,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

export default css`
  .root {
    border-radius: 26px;
  }

  :global(.slooh-select__control) {
    padding: 0 12px;
    z-index: 3002;
    background: transparent !important;
    margin: 0 auto;
    min-width: 200px;
    height: 50px;
    border-radius: 26px !important;
    border: 0 !important;
    box-shadow: none !important;
    font-family: ${primaryFont};
    ${faintShadow}
  }
  :global(.slooh-select__value-container) {
    height: 40px;
    padding: 2px 14px;
    border-radius: 26px !important;
    background: transparent;
    border: 1px dashed ${astronaut};
    color: ${astronaut} !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    font-weight: bold !important;
    cursor: pointer;
  }

  :global(.slooh-select__indicators) {
    position: absolute;
    right: 16px;
    top: 6px;
  }

  :global(.slooh-select__indicator, .slooh-select__indicator:hover) {
    color: ${lightHeadedAstronaut};
    cursor: pointer;
  }

  :global(.slooh-select__indicator-separator) {
    display: none;
  }

  :global(.slooh-select__menu) {
    top: -15px;
    padding-top: 56px;
    background-color: ${romance};
    border-top-left-radius: 26px;
    border-top-right-radius: 26px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0 0 6px 0 ${shadows};
    font-family: ${primaryFont};
  }

  :global(.slooh-select__menu-list) {
    border-radius: inherit;
    font-family: ${primaryFont};
  }

  :global(.slooh-select__option) {
    border-top: 1px solid ${shadows};
    font-family: ${primaryFont};
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

  :global(.slooh-select__menu-list .dropdown-opt) {
    position: relative;
    padding: 0 30px;
  }

  :global(.slooh-select__menu-list .dropdown-opt .dropdown-name) {
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid #d5d8dd;
  }

  :global(.slooh-select__menu-list .dropdown-opt:last-child .dropdown-name) {
    border-bottom: none;
  }

  :global(.dropdown-name) {
    display: inline-block;
    color: ${astronaut} !important;
    text-transform: uppercase;
    font-size: 11px !important;
    font-weight: bold !important;
  }

  :global(.dropdown-opt) :global(.focused-ind) {
    display: none;
  }

  :global(.dropdown-opt):hover :global(.focused-ind) {
    display: inline-block;
    position: absolute;
    right: 30px;
    top: 22px;
    background-color: ${astronaut};
    border-radius: 100%;
    height: 8px;
    width: 8px;
  }
`;
