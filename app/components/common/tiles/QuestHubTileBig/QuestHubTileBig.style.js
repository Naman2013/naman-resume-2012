import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  astronaut,
  shadows,
  questTexture,
  blue_tile_canvas,
} from 'app/styles/variables/colors_tiles_v4';
import { questShield } from 'app/styles/variables/iconURLs';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .root {
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
    margin: 0 auto;
  }

  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    width: 93px;
    height: 93px;
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
    bottom: 0;
    left: 10px;
    width: 300px;
    height: 70px;
    display: flex;
    flex-direction: row;
    padding: 0;
    ${faintShadow}
  }

  .icon-container {
    display: block;
    position: relative;
    top: 74px;
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
    width: 90px;
    height: 90px;
  }

  .title {
    padding: 30px 0 20px 0;
    margin: 0;
    font-size: 14px;
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 18px;
    border-bottom: none;
    padding-top: 135px;
    padding-bottom: 0;
    text-transform: initial;
    color: ${astronaut};
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
    color: ${astronaut};
    letter-spacing: 2px;
  }

  .quest-info-item.left {
    border-right: 1px solid ${shadows};
  }
`;
