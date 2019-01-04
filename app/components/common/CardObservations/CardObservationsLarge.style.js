import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  lynch,
  geyser,
  white_tile,
  black,
} from '../../../styles/variables/colors_tiles_v4';
import { screenXLarge } from '../../../styles/variables/breakpoints';

export default css`
  .card-obs {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    letter-spacing: 1px;
    padding: 50px;
    background-color: white;
    background: url(${white_tile});
    background-size: 22px;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
    margin: 25px auto;
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    width: 100%;
  }

  .obs-left {
    text-align: left;
    width: 75%;
    padding-right: 50px;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }

  .card-obs-title {
    font-family: ${secondaryFont};
    font-size: 22px;
    color: ${astronaut};
    letter-spacing: 1px;
    font-weight: 400;
    padding-top: 50px;
  }

  .media-card-img-right {
    display: flex;
    justify-content: space-around;
    max-height: 100%;
    width: calc(40% - 50px);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    margin-top: 50px;
  }

  .media-card-img-container {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: ${black};
  }

  .media-card-img-right img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }

  .card-obs-author {
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

  .card-obs-desc {
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
    .card-obs {
      width: 100%;
    }

    .obs-left {
      width: 50%;
      padding-left: 75px;
    }

    .card-obs-title {
      padding-top: 75px;
    }

    .media-card-img-right {
      right: 75px;
      top: 75px;
      width: 300px;
      height: 300px;
    }

    .card-obs-desc {
      font-size: 18px;
    }
  }
`;
