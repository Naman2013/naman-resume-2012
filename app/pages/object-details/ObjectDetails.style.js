import css from 'styled-jsx/css';
import { secondaryFont } from '../../styles/variables/fonts';
import { midnight_express, nightfall, romance } from '../../styles/variables/colors_tiles_v4';

export default css`
  .header {
    position: relative;
    height: 92px;
    width: 100%;
    background-color: ${nightfall};
    color: ${romance};
    letter-spacing: 1px;
    font-family: ${secondaryFont};    
    font-size: 18px;
    padding: 37px 0 0 37px;
  }

  .header:before {
    content: '';
    height: 100%;
    position: absolute;
    border-right: 1px solid ${midnight_express};
    top: 0;
    right: 92px;
  }

  .subtitle {
    font-size: 14px;
  }
  .follow-btn {
    position: absolute;
    padding: 10px 5px;
    border: 1px solid ${romance};
    font-size: 14px;
    width: 160px;
    text-align: center;
    left: 5%;
    bottom: 10%;
    cursor: pointer;
  }
  .icon {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 26px;
    top: 26px;
    background-color: ${romance};
    mask-repeat: no-repeat;
    mask-size: contain;
  }

  

`;
