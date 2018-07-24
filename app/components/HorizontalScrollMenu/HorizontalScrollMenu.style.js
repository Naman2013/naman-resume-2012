import css from 'styled-jsx/css';
import { chillBlue } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  ul {
    ${resetMarginPadding}
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
    background: linear-gradient(to bottom, #0b121b 0%,#263344 74%);
    overflow: hidden;
    overflow-x: scroll;
  }

  ul::-webkit-scrollbar {
    width: 0px;
  }

  ul::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 6px;
  }

  a {
    ${resetMarginPadding}
    padding: 30px 0;
    padding-bottom: 20px;
    margin-right: 60px;
    display: inline-block;
    position: relative;
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
`;
