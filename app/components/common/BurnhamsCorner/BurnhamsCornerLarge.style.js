import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, romance, lynch, geyser, iron } from '../../../styles/variables/colors_tiles_v4';
import { screenXLarge } from '../../../styles/variables/breakpoints';

export default css`
  .bc {
    display: flex;
    letter-spacing: 1px;
    background-color: ${romance};
    background-size: 22px;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    color: ${astronaut};
    font-family: ${secondaryFont};
    padding: 50px;
  }

  .bc-title {
    font-family: ${secondaryFont};
    font-size: 22px;
    color: ${astronaut};
    letter-spacing: 1px;
    font-weight: 400;
  }

  .bc-img-right {
    width: 45%;
  }

  .bc-left {
    width: 55%;
    padding-right: 40px;
  }

  .bc-img-right img {
    width: 100%;
    padding: 2px;
    border: solid 1px ${iron};
  }

  .bc-author {
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    border-top: solid 1px ${geyser};
    border-bottom: solid 1px ${geyser};
    text-transform: uppercase;
    padding: 10px 0;
    margin-top: 10px;
  }

  .bc-desc {
    font-size: 16px;
    font-weight: 100;
    color: ${lynch};
    padding: 20px 0;
    transition: font-size 0.4s ease-in-out;
  }

  .card-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .card-bottom a {
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    box-shadow: inset 0px 5px 20px -5px #e0e0e0;
  }

  li {
    flex-grow: 1;
    font-weight: 800;
    padding: 15px 0;
    padding-left: 30px;
    font-size: 11px;
    border-right: 1px solid ${geyser};
    letter-spacing: 1px;
    text-decoration: none;
  }

  li:last-child {
    border-right: none;
    color: ${lynch};
    flex-grow: 3;
    text-align: right;
    padding-right: 30px;
    text-decoration: none;
  }

  li:nth-last-child(2) {
    border-right: none;
  }

  @media ${screenXLarge} {
    .bc-desc {
      font-size: 18px;
    }
  }
`;
