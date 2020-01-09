import css from 'styled-jsx/css';
import { screenMedium } from '../../styles/variables/breakpoints';
import {
  romance,
  yellow,
  faintGray,
  hawkesBlue,
} from '../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../styles/variables/fonts';

export default css`
  .about-slooh-page :global(.nav) {
    margin: 40px 0;
    border-top: 1px solid ${hawkesBlue};
    border-bottom: 1px solid ${hawkesBlue};
  }

  .about-section-container {
    margin-top: 40px;
    background-color: ${faintGray};
  }

  .about-hero {
    width: 100%;
    height: 240px;
    position: relative;
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${primaryFont};
    color: ${romance};
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
  }

  .hero-text div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-text div:nth-child(1) {
    font-size: 5px;
    font-weight: 500;
    letter-spacing: 2px;
    height: 4px;
  }

  .hero-text div:nth-child(2) {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 8px;
    height: 12px;
    margin-top: 9px;
    margin-left: 5px;
  }

  .hero-text div:nth-child(3) {
    font-size: 48px;
    line-height: 48px;
    letter-spacing: 1px;
    height: 35px;
    margin-top: 11px;
  }

  .hero-text div:nth-child(4) {
    font-size: 8px;
    font-weight: 300;
    line-height: 8px;
    letter-spacing: 1px;
    color: ${yellow};
    height: 6px;
    margin-top: 17px;
  }

  .store-banner {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  @media ${screenMedium} {
    .about-hero {
      height: 400px;
    }

    .hero-text div:nth-child(1) {
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 3px;
      height: 8px;
    }

    .hero-text div:nth-child(2) {
      font-size: 29px;
      font-weight: 600;
      letter-spacing: 10px;
      height: 22px;
      margin-top: 17px;
    }

    .hero-text div:nth-child(3) {
      font-size: 82px;
      line-height: 82px;
      letter-spacing: 1px;
      height: 62px;
      margin-top: 18px;
    }

    .hero-text div:nth-child(4) {
      font-size: 10px;
      font-weight: 300;
      line-height: 10px;
      letter-spacing: 2px;
      color: ${yellow};
      height: 10px;
      margin-top: 27px;
    }
  }
`;
