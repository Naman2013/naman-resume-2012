import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';
import { romance, hawkesBlue, shadows, lightHeadedAstronaut } from '../../../styles/variables/colors_tiles_v4';

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
    overflow: hidden;
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
    content: "";
    display: block;
    padding-top: 100%;
  }  

  .root {
    margin-top: 20px;
    color: black;
    flex-basis: 48%;
    max-width: 48%;
  }

  .onhover-overlay {
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
    padding-bottom: 15px;
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
    background-color: #6A6A6A;
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 50%;
    border: 2px solid ${romance};
  }


  @media ${screenMedium} {
    .photoRollCard:hover .onhover-overlay{
      display: flex;
    }
  }

  @media ${screenLarge} {
    .root {
      flex-basis: 32%;
      max-width: 32%;
    }
  }
`;
