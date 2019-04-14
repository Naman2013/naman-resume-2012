import css from 'styled-jsx/css';
import { romance, golda } from '../../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';

export default css.global`
  .slick-prev, .slick-next {
    width: 50px;
    height: 50px;
    margin: 0 15px;
    transform: translate(0, -50%);
    cursor: pointer;
    color: ${romance};
    border: solid 2px ${golda};
    border-radius: 50%;
    z-index: 9;
    background-color: transparent;
  }

  .slick-prev:before {
    content: "";
    position: absolute;
    width: 17px;
    height: 14px;
    top: 35%;
    left: 35%;
    z-index: 9;
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg') 0 0 no-repeat;
  }
  .slick-next:before {
    content: "";
    position: absolute;
    width: 17px;
    height: 14px;
    top: 35%;
    left: 35%;
    z-index: 9;
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg') 0 0 no-repeat;
    transform: rotate(180deg);
  }

  .dash-item-first .slick-prev, .dash-item-first .slick-next {
    border: solid 2px #FAD59A;
  }
  .dash-item-first .slick-prev:before {
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg') 0 0 no-repeat;
  }
  .dash-item-first .slick-next:before {
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg') 0 0 no-repeat;
  }

  .slick-slide > div, .slick-slide > div > div {
    outline: 0;
    outline: none;
  }

  @media ${screenMedium} {
    .sections-wrapper .slick-list {
      z-index: 100;
      pointer-events: none;
    }
  }

  @media ${screenLarge} {
    .slick-list {
      z-index: auto;
    }
  }

  @media screen and (min-width: 1200px) {
    .slick-slide .card-shows {
      width: 460px !important;
    }
  }
`;
