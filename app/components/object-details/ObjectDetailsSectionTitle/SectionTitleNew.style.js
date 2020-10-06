import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import {
  astronaut,
  romance,
  white_tile_texture,
} from '../../../styles/variables/colors_tiles_v4';
import { screenMedium, screenMobile, screenTablet, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`
  .title-bg {
    letter-spacing: 1px;
    background-color: ${romance};
    color: ${astronaut};
    font-family: ${secondaryFont};
    transition: height 0.4s ease-in-out, font-size 0.4s ease-in-out;
    width: 100%;
    min-height: 130px;
    padding-top: 60px;
    font-size: 16px;
    color: ${astronaut};
    text-align: center;
    margin-bottom: 40px;
  }

  h1 {
    font-family: ${primaryFont};
    font-size: 16px;
    font-weight: 800;
    // letter-spacing: 4px;
    // text-transform: uppercase;
    transition: font-size 0.4s ease-in-out;
  }

  h2 {
    // font-family: ${primaryFont};
    font-size: 14px;
    // font-weight: 800;
    // letter-spacing: 4px;
    // text-transform: uppercase;
    // transition: font-size 0.4s ease-in-out;
  }

  @media ${screenXLarge} {
    .title-bg {
      background: url(${white_tile_texture});
      background-size: 15px;
      min-height: 223px;
      padding-top: 75px;
      padding-bottom: 50px;
      box-shadow: 0px 15px 30px 2px rgba(237, 240, 242, 1);
      margin-bottom: 40px;
    }

    h1 {
      font-size: 30px;
      margin: 15px;
    }

    h2 {
      font-size: 24px;     
    }
  }

  @media ${screenMedium} {
    // .title-bg {
    //   background: url(${white_tile_texture});
    //   background-size: 15px;
    //   min-height: 223px;
    //   padding-top: 75px;
    //   padding-bottom: 50px;
    //   box-shadow: 0px 15px 30px 2px rgba(237, 240, 242, 1);
    //   margin-bottom: 40px;
    // }

    h1 {
      font-size: 30px;
      margin: 15px;
    }
    h2 {
      font-size: 24px;     
    }
  }

  @media ${screenTablet} {
    // .title-bg {
    //   background: url(${white_tile_texture});
    //   background-size: 15px;
    //   min-height: 223px;
    //   padding-top: 75px;
    //   padding-bottom: 50px;
    //   box-shadow: 0px 15px 30px 2px rgba(237, 240, 242, 1);
    //   margin-bottom: 40px;
    // }

    h1 {
      font-size: 24px;
      margin: 15px;
    }

    h2 {
      font-size: 20px;     
    }
  }

  @media ${screenMobile} {
    // .title-bg {
    //   background: url(${white_tile_texture});
    //   background-size: 15px;
    //   min-height: 223px;
    //   padding-top: 75px;
    //   padding-bottom: 50px;
    //   box-shadow: 0px 15px 30px 2px rgba(237, 240, 242, 1);
    //   margin-bottom: 40px;
    // }

    h1 {
      font-size: 18px;
      margin: 15px;
    }

    h2 {
      font-size: 16px;     
    }
  }
`;
