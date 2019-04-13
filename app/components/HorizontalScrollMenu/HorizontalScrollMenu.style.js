import css from 'styled-jsx/css';
import { chillBlue } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  ul {
    ${resetMarginPadding}
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
    background: linear-gradient(to bottom, #0b121b 0%,#263344 74%);
    overflow-x: scroll;
  }

  ul::-webkit-scrollbar {
    width: 0px;
  }

  ul::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 6px;
    display: none;
  }

  li {
    position: relative;
  }

  a {
    ${resetMarginPadding}
    padding: 30px 0;
    padding-bottom: 20px;
    min-width: 120px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: ${chillBlue};
    font-family: ${primaryFont};
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.4px;
    white-space: nowrap;
  }

  .triangle {
    display: block;
    position: absolute;
    top: 52px;
    left: 50%;
    transform: translate(-50%);
  }
`;
