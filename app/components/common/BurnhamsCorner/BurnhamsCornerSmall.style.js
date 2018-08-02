import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, lynch, geyser, iron, romance } from '../../../styles/variables/colors_tiles_v4';

export default css`
  .bc {
    letter-spacing: 1px;
    background-color: ${romance};
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    margin: 3px;
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    width: 75%;
    margin: 0 auto;
  }

  .bc-left {
    text-align: left;
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
  }

  .bc-title {
    font-family: ${secondaryFont};
    font-size: 20px;
    color: ${astronaut};
    letter-spacing: 1px;
    font-weight: 400;
  }

  .bc-left img {
    border: solid 1px ${iron};
    padding: 2px;
    width: 98%;
  }

  .bc-author {
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1.5px;
    border-top: solid 1px ${geyser};
    border-bottom: solid 1px ${geyser};
    text-transform: uppercase;
    padding: 5px 0;
    margin-top: 10px;
  }

  .bc-desc {
    font-size: 15px;
    font-weight: 100;
    color: ${lynch};
    padding: 20px 0;
  }

`;
