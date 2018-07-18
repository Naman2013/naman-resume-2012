import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { midnight_express, nightfall, romance, glitter } from '../../../styles/variables/colors_tiles_v4';

export default css`

  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: ${nightfall};
    box-shadow: inset 0 40px 40px -7px rgba(0,0,0,0.3);
    height: 68px;
    padding-top: 29px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 2px;
    margin: 0;
  }

  .item {
    list-style-type: none;
    padding: 0 25px;
  }


  .active,
  .active:link,
  .active:active,
  .active:visited {    
    display: block;
    text-decoration: none;
  }

  .link {
    color: #9CB4D2;
    transition: color .25s ease-in-out;
  }

  .link:hover {
    color: ${romance}; 
  }

  .active:hover {
    font-weight: 800;
    color: ${romance};
  }  

`;
