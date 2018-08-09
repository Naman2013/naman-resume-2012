import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { astronaut, romance, lynch, geyser, iron } from '../../../styles/variables/colors_tiles_v4';
import { screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`

  .bc {
    position: relative;
    letter-spacing: 1px;
    background-color: ${romance};
    background-size: 22px;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
    margin: 3px auto;
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    width: 100%;
    height: 396px;
  }

  .bc-left {
    text-align: left;
    width: 55%;
    padding-left: 50px;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }

  .bc-title {
    font-family: ${secondaryFont};
    font-size: 22px;
    color: ${astronaut};
    letter-spacing: 1px;
    font-weight: 400;
    padding-top: 50px;
  }

  .bc-img-right {
    position: absolute;
    border: solid 1px ${iron};
    right: 50px;
    top: 50px;
    width: calc(40% - 50px);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }

  .bc-img-right img {
    border: 2px solid white;
    width: 100%;
  }

  .bc-author {
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: 400;
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
    .bc {
      width: 100%;
      height: 480px;
    }

    .bc-left {
      width: 50%;
      padding-left: 75px;
    }

    .bc-title {
      padding-top: 75px;
    }

    .bc-img-right {
      right: 75px;
      top: 75px;
      width: 300px;
      height: 300px;
    }

    .bc-desc {
      font-size: 18px;
    }
  }
`;
