import css from 'styled-jsx/css';
import {
  romance,
  golda,
  lightHeadedAstronaut,
} from '../../../../styles/variables/colors_tiles_v4';

export default css.global`
  .slick-prev,
  .slick-next {
    width: 50px;
    height: 50px;
    transform: translate(0, -50%);
    cursor: pointer;
    color: ${romance};
    border: solid 2px ${lightHeadedAstronaut};
    border-radius: 50%;
    z-index: 9;
    background-color: transparent;
  }

  .slick-prev {
    margin-left: -87px;
  }

  .slick-next {
    margin-right: -87px;
  }

  .dash-obs .slick-slider .slick-prev {
    margin-left: 23px;
    transform: none;
    top: 250px;
  }

  .dash-obs .slick-slider .slick-next {
    margin-right: 23px;
    transform: none;
    top: 250px;
  }

  .dash-item-first
    .outer-well
    .dashboard-recomended-objects
    .root
    .root
    .slider-container
    .slick-slider
    .slick-next {
    border: solid 2px ${golda};
  }

  .dash-item-first
    .outer-well
    .dashboard-recomended-objects
    .root
    .root
    .slider-container
    .slick-slider
    .slick-next {
    border: solid 2px ${golda};
  }

  .slick-prev:before {
    content: '';
    position: absolute;
    width: 17px;
    height: 14px;
    top: 35%;
    left: 35%;
    z-index: 9;
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg')
      0 0 no-repeat;
  }
  .slick-next:before {
    content: '';
    position: absolute;
    width: 17px;
    height: 14px;
    top: 35%;
    left: 35%;
    z-index: 9;
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg')
      0 0 no-repeat;
    transform: rotate(180deg);
  }

  .dash-item-first .slick-prev:before {
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg')
      0 0 no-repeat;
  }
  .dash-item-first .slick-next:before {
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg')
      0 0 no-repeat;
  }

  // .dash-obs .slick-list {
  //   max-height: 547px;
  // }

  @media (min-width: 768px) and (max-width: 1024px) {
    .dash-obs .slick-slider .slick-prev {
      margin-left: 0;
      left: -10vh;
    }

    .dash-obs .slick-slider .slick-next {
      margin-right: 0;
      right: -10vh;
    }
  }
`;
