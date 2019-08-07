import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../../styles/variables/fonts';
import {
  astronaut,
  shadows,
  questTexture,
  blue_tile_canvas,
  lightHeadedAstronaut,
} from '../../../../styles/variables/colors_tiles_v4';
import { questShield } from '../../../../styles/variables/iconURLs';

export default css`
  .root {
    pointer-events: auto;
    width: 300px;
    height: 300px;
    text-align: center;
    box-size: border-box;
    padding: 0;
    box-shadow: 0px 0px 8px 1px rgba(65, 86, 113, 0.2);
    color: ${astronaut};
    list-style-type: none;
    background: url(${questTexture});
    background-size: cover;
    background-repeat: no-repeat;
    transition: width, height 0.15s ease-out;
    margin: 10px auto;
    position: relative;
    max-width: 100%;
  }

  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100px;
    width: 100px;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }

  .quest-info {
    position: absolute;
    top: 0;
    width: 300px;
    height: 56px;
    display: flex;
    flex-direction: row;
    padding: 0;
  }

  .icon-container {
    display: block;
    position: relative;
    top: 75px;
    width: 100%;
    height: 40px;
  }

  .icon {
    position: absolute;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    background: url(${blue_tile_canvas});
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    border-bottom: none;
    color: ${lightHeadedAstronaut};
    font-family: ${secondaryFont};
    font-size: 21px;
    font-weight: 300;
    letter-spacing: 0;
    padding: 135px 0 0 0;
    margin: 0;
    text-transform: none;
  }

  .level {
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    padding-top: 25px;
    text-transform: uppercase;
  }

  .quest-info-item {
    width: 50%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #667c96;
    letter-spacing: 2px;
  }

  .quest-info-item.left {
    border-right: 0.5px solid ${shadows};
  }
  .quest-info-item.right {
    border-left: 0.5px solid ${shadows};
  }

  .disable-link {
    pointer-events: none;
  }
`;
