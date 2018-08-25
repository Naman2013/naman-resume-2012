import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, lynch, geyser, iron, romance } from '../../../styles/variables/colors_tiles_v4';

export default css`
  .bc {
    letter-spacing: 1px;
    background-color: ${romance};
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    color: ${astronaut};
    font-family: ${secondaryFont};
    width: 90%;
    margin: 0 auto;
    padding: 50px;
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

  .action-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .bc-author {
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: 600;
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
