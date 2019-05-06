import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  blue_tile_feat,
  white_tile_paper,
  midnight_express,
  blue_tile_canvas,
  golda,
  seashell,
  golden,
} from '../../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../styles/variables/breakpoints';
import { questShield } from '../../../styles/variables/iconURLs';

export default css`
  .root {
    position: relative;
    text-align: center;
    font-family: ${primaryFont};
    color: ${astronaut};
    background-color: ${seashell};
    padding-top: 70px;
  }

  .title {
    padding-top: 80px;
    padding-bottom: 60px;
    font-weight: 300;
    text-transform: capitalize;
    font-size: 22px;
    font-family: ${secondaryFont};
  }

  .pre-title {
    display: block;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 10px;
    margin-bottom: 20px;
    font-family: ${primaryFont};
  }

  .shield-container {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 100px;
    top: -30px;
  }

  .blue-shield {
    position: absolute;
    background: url(${questShield});
    background-size: cover;
    background-repeat: no-repeat;
    height: 78px;
    width: 78px;
    left: 50%;
    transform: translateX(-50%);
  }

  .icon-content {
    z-index: 999;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
  }

  .action-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${screenMedium} {
    .root {
      padding-top: 120px;
    }

    .title {
      font-size: 36px;
    }
  }

  @media ${screenLarge} {
    .title {
      font-size: 44px;
      padding-bottom: 50px;
    }

    .pre-title {
      margin-bottom: 50px;
    }
  }

  @media ${screenXLarge} {
    .root {
      padding-top: 160px;
    }

    .title {
      font-size: 42px;
    }
  }
`;
