import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  screenMedium,
  screenLarge,
  screenTablet,
} from 'app/styles/variables/breakpoints';
import {
  romance,
  hawkesBlue,
  shadows,
  lightHeadedAstronaut,
} from 'app/styles/variables/colors_tiles_v4';

const borderColor = 'rgba(217,222,228, 0.35)';

export default css`
  .observation-title {
    font-family: ${secondaryFont};
    text-transform: none;
    margin-bottom: 15px;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .observation-image-wrapper {
    width: 100%;
    padding-top: 100%;
    position: relative;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .inCenter {
    margin-left: 2%;
    margin-right: 2%;
  }

  .photoRollCard {
    display: flex;
    flex-direction: column;
    background-color: ${romance};
    width: 100%;
    height: 100%;
    box-shadow: 0 0 6px 0 ${shadows};
    font-size: 11px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    color: ${lightHeadedAstronaut};
  }

  .square-container {
    position: relative;
    width: 100%;
  }

  .square-container::after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .root {
    margin-top: 20px;
    color: black;
    flex-basis: 100%;
    max-width: 100%;
  }

  .onhover-overlay {
    position: relative;
    display: none;
    color: white;
    width: 100%;
    height: 100%;
    padding: 50px 40px 40px 40px;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .photoRoll-title {
    font-family: ${secondaryFont};
    text-transform: none;
    border-bottom: 1px solid ${borderColor};
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .photoRoll-details {
    width: 100%;
  }

  .photoRoll-details-tile {
    display: inline-block;
    width: 50%;
    padding: 7px 0;
  }

  .photoRoll-details-date {
    box-sizing: border-box;
  }

  .photoRoll-details-images {
    padding-left: 15px;
    border-left: 1px solid ${borderColor};
  }

  .photoRoll-telescope {
    border-top: 1px solid ${borderColor};
    border-bottom: 1px solid ${borderColor};
    padding: 7px 0;
  }

  .photoRoll-instrument {
    border-bottom: 1px solid ${borderColor};
    padding: 7px 0;
  }

  .overlay-bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .circle {
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background-color: #6a6a6a;
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 50%;
    border: 2px solid ${romance};
  }

  .photoRollCard:hover .onhover-overlay {
    display: flex;
  }

  .overlay-bottom :global(.photoRoll-details-btn) {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 100px;
    padding: 10px 20px;
    background-color: transparent;
    border: 1px dashed ${romance};
    color: ${romance};
    text-align: left;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 700;
    font-family: ${primaryFont};
  }

  .overlay-bottom .overlay-bottom-action :global(.photoRoll-circle-btn) {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border: 1px dashed ${romance};
    border-radius: 50%;
    cursor: pointer;
    padding: 0;
  }

  .overlay-bottom
    .overlay-bottom-action
    :global(.photoRoll-circle-btn:first-child) {
    margin-right: 10px;
  }

  .overlay-bottom
    .overlay-bottom-action
    :global(.photoRoll-circle-btn .icon-download:before) {
    color: ${romance};
  }

  .overlay-bottom
    .overlay-bottom-action:global(.photoRoll-circle-btn:last-child) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .onhover-overlay .overlay-bottom-action :global(.photoRoll-circle-btn > svg) {
    margin-bottom: 5px;
  }

  .overlay-without-bg-div{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    // margin:8px;
    margin-top:-2px;
  }

  .button-style{
    border-radius: 4px;
    border: none;
    background-color: #A8854A;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 9px;
    line-height: 12px;
    min-width: 35px;
    color: #000;
    z-index: 9;
  }

  @media ${screenLarge} {
    .root {
      flex-basis: 32%;
      max-width: 32%;
    }
  }

  @media ${screenMedium} {
    .root {
      flex-basis: 32%;
      max-width: 32%;
    }
  }

  @media ${screenTablet} {
    .onhover-overlay {
      padding: 20px;
    }

    .onhover-overlay .overlay-bottom {
      margin-top: 10px;
    }

    .onhover-overlay .overlay-bottom :global(.photoRoll-details-btn) {
      padding: 0 10px;
      line-height: 30px;
      height: 30px;
    }

    .onhover-overlay .overlay-bottom-action :global(.photoRoll-circle-btn) {
      width: 30px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
    }
  }
`;
