import css from 'styled-jsx/css';
import { chillBlue } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  ul {
    ${resetMarginPadding}
    padding: 0 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    list-style-type: none;
    background: linear-gradient(to bottom, #0b121b 0%,#263344 74%);
    overflow: hidden;
  }

  a {
    ${resetMarginPadding}
    display: inline-block;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: ${chillBlue};
    font-family: ${primaryFont};
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.4px;
    min-width: 150px;
  }
`;
