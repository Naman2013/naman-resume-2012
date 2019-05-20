import css from 'styled-jsx/css';
import { primaryFont } from 'app/styles/variables/fonts';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .small-screen-select {
    ${faintShadow}
    padding: 5px 10px;
    border-radius: 50px;
    position: relative;
  }

  .active-selection-box {
    display: flex;
    align-items: center;
    width: 95%;
    font-family: ${primaryFont};
    position: absolute;
    z-index: 10;
    pointer-events: none;
    background-color: white;
    top: 50%;
    transform: translateY(-50%);
  }

  .image-container {
    background-repeat: no-repeat;
    background-size: cover;
    pointer-events: none;
  }

  .active-selection-title {
    font-size: 11px;
    font-weight: 800;
    flex-grow: 2;
    text-transform: uppercase;
    padding: 0 10px;
    pointer-events: none;
  }

  .image-container {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }

  .chevron-box {
    padding-right: 20px;
    pointer-events: none;
  }

  .navigation-options {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
  
  :global(.telescop-select-wrapper > div > div:first-of-type, .telescop-select-wrapper > div > span) {
    opacity: 0;
  }

  :global(.telescop-select-wrapper .slooh-select__menu) {
    margin-top: 15px;
    background: transparent;
    box-shadow: none;   
    z-index: 3001 !important; 
  }

  :global(.telescop-select-wrapper .slooh-select__menu .slooh-select__menu-list) {
    border-radius: 50px;
    box-shadow: 0px 0px 5px 0px rgba(88, 88, 88, 0.5);
    max-height: initial;
    background: white;
  }
`;
