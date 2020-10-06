import css from 'styled-jsx/css';
import { screenMedium } from 'app/styles/variables/breakpoints';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { blue_tile_feat, golden } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .guide-tile-root {
    position: relative;
    background: url(${blue_tile_feat});
    width: 100%;
    height: 200px;
    text-align: center;
  }

  .guide-tile-root :global(a) {
    display: block;
    height: 100%;
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
    left: 0;
  }

  .top-left {
  }
  .top-right {
    transform: rotate(90deg);
  }

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
      height: 150px;
    }

    .title {
      padding-top: 50px;
    }
  }
`;
