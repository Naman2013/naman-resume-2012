import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  lynch,
  geyser,
  romance,
  black,
} from '../../../styles/variables/colors_tiles_v4';

export default css`
  .card-obs {
    letter-spacing: 1px;
    background-color: ${romance};
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    width: 90%;
    margin: 0 auto 30px;
  }

  .obs-left {
    text-align: left;
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
  }

  .card-obs-title {
    font-family: ${secondaryFont};
    font-size: 24px;
    color: ${astronaut};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 700;
  }

  .obs-left img {
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
    padding: 5px 0;
    margin-top: 10px;
  }

  .card-obs-desc {
    font-size: 15px;
    font-weight: 100;
    color: ${lynch};
    padding: 20px 0;
  }

  .card-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin-top: 20px;
    background: linear-gradient(to bottom, #edf0f2, rgba(255, 255, 255, 0));
  }

  .card-bottom a {
    text-decoration: none;
    color: ${astronaut};
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
    text-decoration: none;
    padding-right: 15px;
  }

  .media-card-img-container {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: ${black};
  }
  
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 15px;
    width: 25%;
  }
  
  .button.details {
    width: 50%;
  }
  
  .button.details img {
    margin: 0 5px;
  }
`;
