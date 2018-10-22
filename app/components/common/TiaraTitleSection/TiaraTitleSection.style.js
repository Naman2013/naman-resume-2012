import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  blue_tile_feat,
  white_tile_paper,
  midnight_express,
  golda,
  golden,
} from '../../../styles/variables/colors_tiles_v4';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../styles/variables/breakpoints';

export default css`
  .root {
    position: relative;
    text-align: center;
    font-family: ${primaryFont};
    color: ${astronaut};
    background: url(${blue_tile_feat});
    padding-top: 70px;
  }

  .center-line {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    width: 50%;
    border-right: 2px solid ${astronaut};
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
      padding-bottom: 120px;
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
