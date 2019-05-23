import css from 'styled-jsx/css';
import { hawkesBlue, shadows, lightHeadedAstronaut } from 'app/styles/variables/colors_tiles_v4';

const borderBottom = `border-bottom: 1px solid ${hawkesBlue};`;
const centerChildren = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const toUpper = `
  text-transform: uppercase;
`;

export default css`
  .mobile-swiper-root {
    background-color: #fff;
    box-shadow: 0 0 6px 0 ${shadows};
  }

  .top {
    padding: 40px 40px 10px 40px;
    width: 100%;
    min-height: 200px;
    text-align: initial;
  }

  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(
      to bottom,
      #edf0f2,
      rgba(255, 255, 255, 0)
    );
  }

  .title {
    font-size: 24px;
    ${borderBottom}
    line-height: 0.83;
    padding: 12px 0;
  }

  .author {
    font-size: 10px;
    ${borderBottom}
    ${toUpper}
    padding: 4px 0;
  }

  .description {
    font-size: 19px;
    padding: 20px 0;
    color: #616e7d;
    max-height: 65px;
    min-height: 65px;
    overflow: hidden;
  }

  .swiper-container {
    padding: 0 20px;
    margin-bottom: 40px;
  }

  .buttons {
    display: flex;
    height: 100%;
    width: 100%;
    font-size: 11px;
  }

  .button {
    ${toUpper}
    width: 25%;
    padding: 20px 15px;
    ${centerChildren}
  }

  .button:not(:last-child) {
    border-right: 1px solid #dee0e2;
  }

  .details {
    display: flex;
    width: 50%;
    justify-content: space-between;
    color: ${lightHeadedAstronaut};
  }

  .icon {
    margin-right: 8px;
  }

  :global(.mobile-swiper-root .slick-dots li) {
    background: #dee0e2;
    border-radius: 50%;
    width: 6px;
    height: 6px;
  }

  :global(.mobile-swiper-root .slick-dots li.slick-active) {
    background: #41566f;
  }

  :global(.mobile-swiper-root .slick-arrow.slick-prev, .mobile-swiper-root
      .slick-arrow.slick-next) {
    width: 8px;
    height: 8px;
    border: none;
    border-radius: unset;
    border-color: #41566f;
    transform: rotate(-45deg) !important;
    border-style: solid;
  }

  :global(.mobile-swiper-root .slick-arrow.slick-disabled) {
    border-color: #96a1ad;
  }

  :global(.mobile-swiper-root .slick-arrow.slick-prev) {
    border-width: 1px 0px 0px 1px;
    left: -15px;
  }

  :global(.mobile-swiper-root .slick-arrow.slick-next) {
    border-width: 0px 1px 1px 0px;
    right: -15px;
  }

  :global(.mobile-swiper-root
      .slick-arrow.slick-prev::before, .mobile-swiper-root
      .slick-arrow.slick-next::before) {
    content: none;
  }
`;
