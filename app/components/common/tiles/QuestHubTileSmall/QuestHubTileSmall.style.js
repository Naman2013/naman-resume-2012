import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import {
  astronaut,
  shadows,
  questTexture,
  blue_tile_canvas,
} from 'styles/variables/colors_tiles_v4';
import { questShield } from 'styles/variables/iconURLs';
import { faintShadow } from 'styles/variables/shadows';


export default css`
  .root {
    width: 300px;
    height: 215px;
    text-align: center;
    box-size: border-box;
    padding: 0;
    color: ${astronaut};
    margin: 0 auto;
    border: 1px solid ${shadows};
  }

  .main-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
  }

  .left-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${shadows};
    justify-content: space-between;
    flex: 50% 0;
  }

  .right-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    position: relative;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 78px;
    width: 78px;
  }

  .icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    margin-top: -8px;
  }

  .title {
    width: 100%;
    margin: 0;
    font-size: 20px;
    font-family: ${secondaryFont};
    font-weight: 300;
    border-bottom: 1px solid ${shadows};
    color: ${astronaut};
    padding: 25px;
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
    height: 50%;
    width: 100%;
  }

  .quest-info-item.top {
    border-bottom: 1px solid ${shadows};
  }
`;
