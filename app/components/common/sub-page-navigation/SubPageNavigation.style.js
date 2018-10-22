import css from 'styled-jsx/css';
import { primaryFont } from '../../../styles/variables/fonts';
import { nightfall, romance } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge, screenMedium } from '../../../styles/variables/breakpoints';

export default css`

  .subnav {
    box-sizing: border-box; 
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;   
    text-align: left;
    background-color: ${nightfall};
    box-shadow: inset 0 40px 40px -7px rgba(0,0,0,0.3);
    height: 68px;
    margin: 0;
    padding: 30px 0 0 0;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 2px;
    transition: font-size 0.4s ease-in-out;
    width: 100vw;
  }

  .subnav::-webkit-scrollbar {
    display: none;
  }


  .item {
    flex: 0 0 auto;
    list-style-type: none;
    padding: 0 30px;
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

  @media ${screenMedium} {
    .subnav {
      padding-top: 30px;
      font-size: 11px;
      letter-spacing: 2px;
      justify-content: space-evenly;
    }
    .item {
      padding: 0 15px;
    }
  }


  @media ${screenLarge} {
    .subnav {
      padding-top: 29px;
      font-size: 11px;
      letter-spacing: 2px;
      justify-content: space-evenly;
    }
    .item {
      padding: 0 25px;
    }
  }

`;
