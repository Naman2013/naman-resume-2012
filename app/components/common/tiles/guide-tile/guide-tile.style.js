import css from 'styled-jsx/css';
import { screenMedium } from 'styles/variables/breakpoints';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { blue_tile_feat, golden } from 'styles/variables/colors_tiles_v4';

export default css`
  .guide-tile-root {
    position: relative;
    background: url(${blue_tile_feat});
    width: 100%;
    margin: 0 auto;
    height: 200px;
    text-align: center;
  }

  .guide-tile-frame {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
  }

  .bottom {
    transform: rotate(180deg);
    bottom: 0;
    left:0;
  }

  .top-left {}
  .top-right { transform: rotate(90deg) }



  .title {
    margin: 0;
    margin-bottom: 10px;
    padding-top: 80px;
    font-family: ${primaryFont};
    color: ${golden};
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 12px;
  }

  .subTitle {
    margin: 0;
    font-family: ${secondaryFont};
    color: white;
    font-weight: 300;
    font-size: 20px;
  }

  @media ${screenMedium} {
    .guide-tile-root {
      width: 300px;
      height: 300px;
    }

    .title {
      padding-top: 130px;
    }
  }
`;
