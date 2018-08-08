import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { midnight_express, nightfall, romance, glitter } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge } from '../../../styles/variables/breakpoints';

export default css`

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: ${nightfall};
    box-shadow: inset 0 40px 40px -7px rgba(0,0,0,0.3);
    height: 68px;
    padding-top: 30px;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    margin: 0;
    transition: font-size 0.4s ease-in-out;
  }

  .item {
    list-style-type: none;
    padding: 0 11px;
    color: #9CB4D2;
    transition: padding 0.4s ease-in-out;
  }

  a.subnav-link,
  a.subnav-link:link,
  a.subnav-link:visited,
  a.subnav-link:active {
    display: block;
    text-decoration: none;
    color: #9CB4D2;
    transition: color .25s ease-in-out;
  }

  a.subnav-link:hover {
    color: ${romance}; 
    text-decoration: none;
  }

  a.subnav-active:after {
    display: block;
    width: 100%; 
    height: 40px; 
    content: ""; 
    background: url("https://vega.slooh.com/assets/v4/common/icon_navarrow.svg") no-repeat center center; 
  }

  a.subnav-active {
    color: ${romance} !important;
    text-decoration: none;
  }

  @media ${screenLarge} {
    .navigation {
      padding-top: 29px;
      font-size: 11px;
      letter-spacing: 2px;
    }
    .item {
      padding: 0 25px;
    }
  }

`;
