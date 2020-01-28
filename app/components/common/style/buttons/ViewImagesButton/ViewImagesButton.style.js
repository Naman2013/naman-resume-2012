import css from 'styled-jsx/css';
import {
  astronaut,
  romance,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

export default css`
  .modal-img-wrapper {
    background-color: #fff;
    padding: 50px;
    padding-top: 25px;
    margin: auto;
    display: inline-block;
    max-width: 100%;
  }

  .view-uploaded-image-title {
    margin-bottom: 25px;
    color: ${lightHeadedAstronaut};
    font-size: 10px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.2;
    letter-spacing: 2px;
    text-align: center;
  }

  .modal-img-wrapper img {
    max-width: 100%;
    max-height: calc(100vh - 100px - 100px);
  }

  .slick-arrow-btn {
    width: 50px;
    height: 50px;
    transform: translate(0, -50%);
    color: #ffffff;
    cursor: default !important;
    border: solid 2px #e2b979;
    border-radius: 50%;
    z-index: 9;
    background-color: transparent;
    border-color: white;
  }

  .slick-arrow-btn:before {
    background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg')
      0 0 no-repeat;
    content: '';
    position: absolute;
    width: 17px;
    height: 14px;
    top: 35%;
    left: 35%;
    z-index: 9;
  }
  .slick-arrow-btn:not(:disabled) {
    cursor: pointer !important;
  }

  .slick-arrow-btn.slick-prev {
    left: 20px;
  }

  .slick-arrow-btn.slick-next {
    right: 20px;
  }

  .slick-arrow-btn.slick-next:before {
    transform: rotate(180deg);
  }

  :global(.view-uploaded-image-modal.custom-modal-backdrop) {
    z-index: 10060;
  }

  :global(.view-uploaded-image-modal.modal) {
    z-index: 10070;
  }
  .text-center {
    max-width: 800px;
    margin: 0 auto;
  }
`;
