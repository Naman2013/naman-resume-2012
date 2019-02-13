import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, moodyBleu } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

export default css`
  .root {
    padding: 0 25px;
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

  .is-active .nav-item{
    color: ${astronaut};
  }
`;
