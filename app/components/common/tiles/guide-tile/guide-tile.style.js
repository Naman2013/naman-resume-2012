import css from 'styled-jsx/css';
import { screenMedium } from 'styles/variables/breakpoints';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { blue_tile_feat, golden } from 'styles/variables/colors_tiles_v4';

export default css`
  .guide-tile-root {
    position: relative;
    background: url(${blue_tile_feat});
    width: 100%;
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
    font-family: ${primaryFont};
    color: ${golden};
    text-transform: uppercase;
  }

  .subTitle {
    font-family: ${secondaryFont};
    color: white;
  }

  @media ${screenMedium} {}
`;
