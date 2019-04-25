import css from 'styled-jsx/css';
import {
  astronaut,
  moodyBleu,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

export default css`
  .root {
    padding: 0 25px;
  }

  .root.profile {
    padding: 0;
    width: 100%;
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
  }
  
  .root.profile .nav {
    display: flex;
    min-height: 65px;
  }

  .root.profile .item-container {
    height: auto;
    display: flex;
    align-items: center;
  }
  
  .root.profile .item-container .nav-item {
    letter-spacing: 1px;
  }

  .root.profile .item-container:first-child {
    padding-left: 0;
  }
  
  .item-container {
    display: inline-block;
    height: 100%;
    padding: 15px;
  }

  .item-container :global(a:active),
  .item-container :global(a:focus),
  .item-container :global(a:hover) {
    text-decoration: none;
  }

  .item-container.is-active {
    border-bottom: 2px solid ${astronaut};
  }

  .nav-item {
    font-weight: bold;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 11px;
    color: ${moodyBleu};
    cursor: pointer;
  }

  .is-active .nav-item {
    color: ${astronaut};
  }
`;
