import css from 'styled-jsx/css';
import {
  astronaut,
  geyser,
  nightfall,
} from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';

export default css`
  .menu-item {
    position: relative;
    margin: 0;
    padding: 0;
    margin-left: 70px;
    width: 75%;
    color: ${astronaut};
  }

  .dot-container {
    position: absolute;
    left: -50px;
    top: 43px;
  }

  .item-container {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 35px);
    padding-bottom: 30px;
    padding-top: 40px;
    margin-left: -15px;
    padding-left: 20px;
    position: relative;
    top: -6px;
  }

  .iconContainer {
    width: 50px;
    height: 50px;
    background-color: ${nightfall};
    border-radius: 50%;
    margin-top: 20px;
    display: inline-block;
    margin-top: 0px;
    position: relative;
    top: -6px;
  }

  .icon {
    width: 34px;
    height: 34px;
    position: relative;
    top: 8px;
    left: 8px;
  }

  .menu-item :global(a) {
    display: block;
    justify-content: space-between;
    border-bottom: 1px solid ${geyser};
    font-family: ${secondaryFont};
    text-transform: capitalize;
    text-decoration: none;
    color: ${astronaut};
  }

  .menu-item :global(a .dot-container) {
    opacity: 0;
  }

  .menu-item :global(a.active .dot-container) {
    opacity: 1;
  }
`;
